import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { GridColDef } from '@mui/x-data-grid';
import {
  Button,
  Card,
  SimpleDialog,
  Tables,
  TextField,
} from 'src/shared/components';
import {
  createClientAPI,
  deleteClientAPI,
  getAllClientsAPI,
  updateClientAPI,
} from './clientService';
import {
  ClientCreateDto,
  ClientDto,
  ClientUpdateDto,
} from 'src/shared/constants/clientTypes';
import { format } from 'date-fns';

const Client: React.FC = () => {
  // State variables
  const [clients, setClients] = useState<ClientDto[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredClients, setFilteredClients] = useState<ClientDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Modal states
  const [openAddEditModal, setOpenAddEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [currentClient, setCurrentClient] = useState<ClientDto | null>(null);

  // Form fields state for create action
  const [createFormFields, setCreateFormFields] = useState<ClientCreateDto>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    dateOfBirth: '',
    userId: 0,
  });

  // Form fields state for update action
  const [updateFormFields, setUpdateFormFields] = useState<ClientUpdateDto>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    dateOfBirth: '',
  });

  // Fetch clients on component mount
  useEffect(() => {
    fetchClients();
  }, []);

  // Filter clients when searchTerm changes
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredClients(clients);
    } else {
      const lowerCaseSearch = searchTerm.toLowerCase();
      const filtered = clients.filter(
        (client) =>
          client.firstName.toLowerCase().includes(lowerCaseSearch) ||
          client.lastName.toLowerCase().includes(lowerCaseSearch) ||
          client.email.toLowerCase().includes(lowerCaseSearch) ||
          (client.phoneNumber && client.phoneNumber.includes(searchTerm))
      );
      setFilteredClients(filtered);
    }
  }, [searchTerm, clients]);

  // Fetch all clients
  const fetchClients = async () => {
    setIsLoading(true);
    try {
      const data = await getAllClientsAPI();
      setClients(data);
      setFilteredClients(data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle form field changes for create
  const handleCreateFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCreateFormFields((prev) => ({
      ...prev,
      [name]: name === 'userId' ? parseInt(value, 10) || 0 : value,
    }));
  };

  // Handle form field changes for update
  const handleUpdateFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Open add modal
  const handleAddClick = () => {
    setCurrentClient(null);
    setCreateFormFields({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      address: '',
      dateOfBirth: '',
      userId: 0,
    });
    setOpenAddEditModal(true);
  };

  // Open edit modal with client data
  const handleEditClick = (client: ClientDto) => {
    setCurrentClient(client);
    setUpdateFormFields({
      firstName: client.firstName,
      lastName: client.lastName,
      email: client.email,
      phoneNumber: client.phoneNumber || '',
      address: client.address || '',
      dateOfBirth: client.dateOfBirth || '',
    });
    setOpenAddEditModal(true);
  };

  // Open delete confirmation modal
  const handleDeleteClick = (client: ClientDto) => {
    setCurrentClient(client);
    setOpenDeleteModal(true);
  };

  // Close all modals
  const handleCloseModals = () => {
    setOpenAddEditModal(false);
    setOpenDeleteModal(false);
    setCurrentClient(null);
  };

  // Save client (create or update)
  const handleSaveClient = async () => {
    try {
      if (currentClient) {
        // Update existing client
        await updateClientAPI(currentClient.id, updateFormFields);
      } else {
        // Create new client
        await createClientAPI(createFormFields);
      }

      // Refresh client list and close modal
      fetchClients();
      handleCloseModals();
    } catch (error) {
      console.error('Error saving client:', error);
    }
  };

  // Delete client
  const handleConfirmDelete = async () => {
    if (currentClient) {
      try {
        await deleteClientAPI(currentClient.id);
        fetchClients();
        handleCloseModals();
      } catch (error) {
        console.error('Error deleting client:', error);
      }
    }
  };

  // Table columns definition
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 220,
    },
    {
      field: 'firstName',
      headerName: 'First Name',
      flex: 1,
      minWidth: 120,
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      flex: 1,
      minWidth: 120,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone',
      flex: 1,
      minWidth: 120,
      valueGetter: (params) => params.row.phoneNumber || '-',
    },
    {
      field: 'dateOfBirth',
      headerName: 'Date of Birth',
      flex: 1,
      minWidth: 120,
      valueGetter: (params) =>
        params.row.dateOfBirth
          ? format(new Date(params.row.dateOfBirth), 'MM/dd/yyyy')
          : '-',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 120,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit" arrow>
            <IconButton
              color="primary"
              size="small"
              onClick={() => handleEditClick(params.row)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" arrow>
            <IconButton
              color="error"
              size="small"
              onClick={() => handleDeleteClick(params.row)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  // Add/Edit client modal content
  const addEditModalContent = (
    <Box sx={{ p: 2, width: '100%', maxWidth: 500 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={
              currentClient
                ? updateFormFields.firstName
                : createFormFields.firstName
            }
            onChange={
              currentClient ? handleUpdateFieldChange : handleCreateFieldChange
            }
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={
              currentClient
                ? updateFormFields.lastName
                : createFormFields.lastName
            }
            onChange={
              currentClient ? handleUpdateFieldChange : handleCreateFieldChange
            }
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={
              currentClient ? updateFormFields.email : createFormFields.email
            }
            onChange={
              currentClient ? handleUpdateFieldChange : handleCreateFieldChange
            }
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Phone Number"
            name="phoneNumber"
            value={
              currentClient
                ? updateFormFields.phoneNumber
                : createFormFields.phoneNumber
            }
            onChange={
              currentClient ? handleUpdateFieldChange : handleCreateFieldChange
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={
              currentClient
                ? updateFormFields.dateOfBirth
                : createFormFields.dateOfBirth
            }
            onChange={
              currentClient ? handleUpdateFieldChange : handleCreateFieldChange
            }
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={
              currentClient
                ? updateFormFields.address
                : createFormFields.address
            }
            onChange={
              currentClient ? handleUpdateFieldChange : handleCreateFieldChange
            }
            multiline
            rows={3}
          />
        </Grid>
        {!currentClient && (
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="User ID"
              name="userId"
              type="number"
              value={createFormFields.userId.toString()}
              onChange={handleCreateFieldChange}
              required
            />
          </Grid>
        )}
        <Grid
          item
          xs={12}
          sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}
        >
          <Button
            color="inherit"
            btnText="Cancel"
            onClick={handleCloseModals}
          />
          <Button color="primary" btnText="Save" onClick={handleSaveClient} />
        </Grid>
      </Grid>
    </Box>
  );

  // Delete confirmation modal content
  const deleteModalContent = (
    <Box sx={{ p: 2 }}>
      <p>
        Are you sure you want to delete client {currentClient?.firstName}{' '}
        {currentClient?.lastName}?
      </p>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
        <Button color="inherit" btnText="Cancel" onClick={handleCloseModals} />
        <Button color="error" btnText="Delete" onClick={handleConfirmDelete} />
      </Box>
    </Box>
  );

  return (
    <>
      {/* Header section */}
      <Box sx={{ mb: 3 }}>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item>
            <h1>Client Management</h1>
          </Grid>
          <Grid item>
            <Button
              color="primary"
              btnText="Add New Client"
              onClick={handleAddClick}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Body section */}
      <Card>
        <Box flex={1} p={3}>
          <Container maxWidth={false}>
            <Grid container justifyContent="flex-end">
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <TextField
                  fullWidth
                  label="Search Clients"
                  type="search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Divider />

        {/* Client table */}
        <Tables
          rows={filteredClients}
          columns={columns}
          checkboxSelection={false}
        />
      </Card>

      {/* Add/Edit Client Modal */}
      <SimpleDialog
        open={openAddEditModal}
        onClose={handleCloseModals}
        model_title={<>{currentClient ? 'Edit Client' : 'Add New Client'}</>}
        model_content={addEditModalContent}
      />

      {/* Delete Confirmation Modal */}
      <SimpleDialog
        open={openDeleteModal}
        onClose={handleCloseModals}
        model_title={<>Confirm Delete</>}
        model_content={deleteModalContent}
      />
    </>
  );
};

export default Client;
