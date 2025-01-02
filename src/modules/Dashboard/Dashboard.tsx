import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardHeader from './DashboardHeader'
import { Box } from '@mui/system'
import { formFieldsByRoute, initialValuesByRoute, editUserFormFields } from 'src/shared/constants/formFields'
import { SimpleDialog } from 'src/shared/components/modals/SimpleDialog';
import CustomForm from 'src/shared/components/custom-form/CustomForm';
import { USER, TENANT, ROLE } from 'src/shared/constants/routes';
import * as ROUTES from "../../shared/constants/routes";
import { Button, Card, Tables } from 'src/shared/components';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { addTenantAPI, addUserAPI, deleteTenantAPI, deleteUserAPI, editTenantAPI, editUserAPI, getRoleAPI, getTenantAPI, getUserAPI } from './apis/userTenantRoleAPI';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/configure-store';

interface Role {
  id: string;
  role: string;
}
interface Tenant {
  [x: string]: any;
  id: string;
  tenant: string;
}

const Dashboard = ({ title }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [rows, setRows] = useState([]);
  const [fieldToEdit, setFieldToEdit] = useState(null);
  const [tenantName, setTenantName] = useState('');
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [editTenantDialogOpen, setEditTenantDialogOpen] = useState(false);
  const [editUserDialogOpen, setEditUserDialogOpen] = useState(false);
  const [userTenants, setUserTenants] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userName, setUserName] = useState('');
  const [tenants, setTenants] = useState([]);
  const [roles, setRoles] = useState([]);
  const [formFields, setFormFields] = useState(formFieldsByRoute);
  const location = useLocation();
  const currentPath = location.pathname;

  const showAddButton = currentPath !== ROUTES.ROLE;
  const userData = useSelector((state: RootState) => state.userData)

  /**
   * Handles the form submission for adding a new user or tenant.
   * @param values - The form values to be submitted.
   */
  const handleSubmit = async (values: any) => {
    if (currentPath === USER) {
      const roleName = formFieldsByRoute[USER].find(field => field.id === 'role')?.options.find(option => option.value === values.role)?.label;
      values.role = roleName;
      await addUserAPI(values);
      await fetchUsers(1, 10);
    } else if (currentPath === TENANT) {
      await addTenantAPI(values);
      await fetchTenants();
    }
    setOpenDialog(false);
  };

  /**
   * Handles the click event for adding a new user or tenant.
   */
  const handleAddClick = async () => {
    setOpenDialog(true);
  };

  /**
   * Handles the close event for the dialog.
   */
  const handleClose = () => {
    setOpenDialog(false);
  };

  /**
   * Opens the confirmation delete dialog.
   * @param Id - The ID of the item to be deleted.
   */
  const openConfirmDeleteDialog = (Id: number) => {
    if (currentPath === TENANT) {
      setDeleteId(Id);
      setConfirmDeleteDialog(true);
    } else if (currentPath === USER) {
      setDeleteId(Id);
      setConfirmDeleteDialog(true);
    }
  };

  /**
   * Handles the confirmation of the delete action.
   */
  const handleConfirmDelete = () => {
    if (deleteId) {
      if (currentPath === TENANT) {
        handleDeleteField(deleteId);
      } else if (currentPath === USER) {
        handleDeleteField(deleteId);
      }
    }
    setConfirmDeleteDialog(false);
    setDeleteId(null);
  };

  /**
   * Handles the cancellation of the delete action.
   */
  const handleCancelDelete = () => {
    setConfirmDeleteDialog(false);
    setDeleteId(null);
  };

  /**
   * Handles the click event for editing a tenant.
   * @param tenant - The tenant to be edited.
   */
  const handleTenantEditClick = (tenant) => {
    setEditTenantDialogOpen(true);
    setFieldToEdit(tenant.id);
    setTenantName(tenant.tenant);
  };

  /**
   * Handles the click event for editing a user.
   * @param user - The user to be edited.
   */
  const handleUserEditClick = async (user) => {
    try {
      setSelectedUser(user.fullUserData);
      setUserName(user.fullUserData.name);
      setUserTenants([]);

      // Fetch tenant names based on tenant IDs
      const tenantData = user.fullUserData.tenantRoles.map((tenantRole) => {
        const tenant = tenants.find((t) => t.id === tenantRole.tenantId);
        return {
          tenantId: tenant.id,
          tenantName: tenant.tenant,
          roles: tenantRole.roles || [] // Get roles associated with the tenant
        };
      });

      setUserTenants([...tenantData]);

      // Move updateTenantOpt ionsForEdit here
      await updateTenantOptionsForEditUser(tenantData);
      setEditUserDialogOpen(true);
    } catch (error) {
      console.error('Error preparing user edit:', error);
    }
  };

  /**
   * Handles the form submission for editing a tenant.
   * @param values - The form values to be submitted.
   */
  const handleTenantSaveEdit = async (values: any) => {
    if (fieldToEdit) {
      try {
        await editTenantAPI(fieldToEdit, values.tenantName);
        await fetchTenants();
        setEditTenantDialogOpen(false);
        setFieldToEdit(null);
        setTenantName('');
      } catch (error) {
        console.error('Error updating tenant:', error);
      }
    }
  };

  /**
   * Handles the form submission for editing a user.
   * @param values - The form values to be submitted.
   */
  const handleUserSaveEdit = async (values: any) => {

    if (selectedUser) {

      const role = roles.find(r => r.id === values.role);
      const roleName = role ? role.role : '';

      const tenantRoles = [{
        tenantId: values.tenant,
        roles: [roleName]
      }];
      try {
        await editUserAPI(selectedUser.id, values.name, tenantRoles.map(role => ({
          tenantId: parseInt(role.tenantId),
          roles: role.roles.map(roleName => roleName.toString())
        })));
        fetchUsers(1, 10);
        setSelectedUser(null);
        setUserName('');
        setUserTenants([]);
        setEditUserDialogOpen(false);
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };

  /**
   * Handles the cancellation of the edit action.
   */
  const handleCancelEdit = () => {
    setEditTenantDialogOpen(false);
    setEditUserDialogOpen(false);
    setFieldToEdit(null);
    setTenantName('');
    setOpenDialog(false);
    setSelectedUser(null);
    setUserName('');
  };

  /**
   * Fetches the tenants from the API.
   */
  const fetchTenants = async () => {
    try {
      const response: Tenant[] = await getTenantAPI();
      setRows(response);
      setTenants(response);
    } catch (error) {
      console.error('Error fetching tenants:', error);
    }
  };

  /**
   * Fetches the roles from the API.
   */
  const fetchRoles = async () => {

    try {
      const response: Role[] = await getRoleAPI();
      // Transform role names: Replace underscores with spaces
      const transformedResponse = response.map((role) => ({
        ...role,
        role: role.role.replace(/_/g, " "), // Replace underscores with spaces
      }));
      setRows(transformedResponse);
      setRoles(transformedResponse);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  /**
   * Fetches the users from the API.
   * @param page - The page number.
   * @param limit - The number of items per page.
   */
  const fetchUsers = async (page: number, limit: number) => {
    try {
      const response = await getUserAPI(page, limit);
      setRows(response);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  /**
   * Handles the deletion of a field.
   * @param Id - The ID of the item to be deleted.
   */
  const handleDeleteField = async (Id: number) => {
    try {
      if (currentPath === USER) {
        await deleteUserAPI(Id);
        fetchUsers(1, 10);
      } else if (currentPath === TENANT) {
        await deleteTenantAPI(Id);
        fetchTenants();
      }
    } catch (error) {
      console.error('Error deleting tenant:', error);
    }
  };


  /**
   * Fetches the options for the form fields and updates the form fields of add user form.
   */
  const fetchOptions = async () => {
    try {
      const roles = await getRoleAPI();
      const tenants = await getTenantAPI();

      // Create a copy of formFieldsByRoute
      const updatedFormFields = { ...formFieldsByRoute };

      // Update role options
      const roleField = updatedFormFields[USER].find((field) => field.id === 'role');
      if (roleField) {
        const isTenantAdmin = userData.tenantRoles.some(role => role.roles.includes('ADMIN'));

        roleField.options = roles
          .filter(role => !(isTenantAdmin && role.role === 'SUPER_ADMIN')) // Exclude SUPER_ADMIN if Admin
          .map((item) => ({
            label: item.role === 'SUPER_ADMIN' ? 'SUPER_ADMIN' : item.role, // Replace SUPER_ADMIN with SUPER ADMIN
            value: item.id,
          }));
      }

      // Update tenant options
      const tenantField = updatedFormFields[USER].find((field) => field.id === 'tenant');
      if (tenantField) {
        tenantField.options = tenants.map((item) => ({
          label: item.tenant,
          value: item.id,
        }));
      }
      return updatedFormFields;
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };

  /**
   * Updates the tenant options for the edit user form.
   * @param updatedUserTenants - The updated user tenants.
   */
  const updateTenantOptionsForEditUser = async (updatedUserTenants: any) => {
    try {

      const tenantOptions = updatedUserTenants.map(tenant => ({
        label: tenant.tenantName, // Use tenant name here
        value: tenant.tenantId,
      }));

      // Update the options for tenant and role fields
      const updatedFormFields = [...editUserFormFields];
      const tenantField = updatedFormFields.find(field => field.id === 'tenant');
      const roleField = updatedFormFields.find(field => field.id === 'role');

      if (tenantField) {
        tenantField.options = tenantOptions; // Set tenant options
        tenantField.isDisabled = true; // Disable tenant dropdown
      }

      if (roleField) {
        roleField.options = roles.map(role => ({
          label: role.role,
          value: role.id,
        }));
      }

      setFormFields({ updatedFormFields });
    } catch (error) {
      console.error('Error updating tenant options for edit:', error);
    }
  };

  /**
   * Effect hook to load options and fetch data based on the current path.
   */
  useEffect(() => {
    setRows([]);
    const loadOptions = async () => {
      const updatedFormFields = await fetchOptions(); // Get updated form fields
      setFormFields(updatedFormFields); // Set the updated form fields
      if (currentPath === USER) {
        fetchUsers(1, 10);
        fetchTenants();
        fetchRoles();
      } else if (currentPath === TENANT) {
        fetchTenants();
      } else if (currentPath === ROLE) {
        fetchRoles();
      }
    };
    loadOptions();

  }, [currentPath]);


  /**
   * Dialog content for adding a new user or tenant.
   */
  const dialogContent = (
    <Box sx={{ minWidth: 400, p: 2 }}>
      <CustomForm
        formFields={formFields[currentPath]}
        initialValues={initialValuesByRoute[currentPath]}
        submitBtnText="Save"
        cancelBtnText="Cancel"
        submitBtnHandler={handleSubmit}
        cancelBtnHandler={handleClose}
      />
    </Box>
  );

  /**
   * Dialog content for editing a tenant.
   */
  const dialogContentForEditTenant = (
    <Box sx={{ minWidth: 400, p: 2 }}>
      <CustomForm
        formFields={formFields[currentPath]}
        initialValues={{
          tenantName: tenantName || initialValuesByRoute[currentPath]?.tenantName,
        }}
        submitBtnText="Save"
        cancelBtnText="Cancel"
        submitBtnHandler={handleTenantSaveEdit}
        cancelBtnHandler={handleCancelEdit}
      />
    </Box>
  );

  /**
   * Dialog content for editing a user.
   */
  const dialogContentForEditUser = (
    <Box sx={{ minWidth: 400, p: 2 }}>

      <CustomForm
        formFields={editUserFormFields}
        initialValues={{
          name: userName,
          tenant: userTenants.length > 0 ? userTenants[0].tenantId : '',
          role: userTenants.length > 0 ? userTenants[0].roles[0] : '',
        }}
        submitBtnText="Save"
        cancelBtnText="Cancel"
        submitBtnHandler={handleUserSaveEdit}
        cancelBtnHandler={handleCancelEdit}
      />
    </Box>
  );

  /**
   * Returns the columns for the table based on the current path.
   */
  const getColumns = () => {
    if (currentPath === USER) {
      return [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'user', headerName: 'User', width: 150 },
        { field: 'role', headerName: 'Role', width: 150 },
        {
          field: 'actions', headerName: 'Actions', width: 150, renderCell: (params: any) => (
            <>
              <Button
                aria-label="delete"
                sx={{ color: "red" }}
                btnClass="delete-btn"
                onClick={() => openConfirmDeleteDialog(params.row.id)}
                icon={<DeleteIcon />}
              >
              </Button>
              <Button
                aria-label="edit"
                sx={{ color: "blue" }}
                btnClass="edit-btn"
                onClick={() => handleUserEditClick(params.row)}
                icon={<EditIcon />}
              >
              </Button>

            </>

          )
        },
      ];
    } else if (currentPath === TENANT) {
      return [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'tenant', headerName: 'Tenant', width: 150 },
        {
          field: 'actions', headerName: 'Actions', width: 150, renderCell: (params: any) => (
            <>
              <Button
                aria-label="delete"
                sx={{ color: "red" }}
                btnClass="delete-btn"
                onClick={() => openConfirmDeleteDialog(params.row.id)}
                icon={<DeleteIcon />}
              >
              </Button>
              <Button
                aria-label="edit"
                sx={{ color: "blue" }}
                btnClass="edit-btn"
                onClick={() => handleTenantEditClick(params.row)}
                icon={<EditIcon />}
              >
              </Button>

            </>

          )
        },
      ];
    } else if (currentPath === ROLE) {
      return [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'role', headerName: 'Role', width: 150 },
      ];
    }
    return [];
  };

  return (
    <>
      <Box >
        <DashboardHeader title={title} onAddClick={handleAddClick} showAddButton={showAddButton} />
        <Card sx={{ m: 3 }}>
          <Box flex={1}>
            <Tables rows={rows} columns={getColumns()} checkboxSelection={false} />
          </Box>
        </Card>
      </Box>

      <SimpleDialog
        open={openDialog}
        onClose={handleClose}
        model_title={<>{`Add New ${title.split(' ')[0]}`}</>}
        model_content={<>{dialogContent}</>}
      />
      <SimpleDialog
        open={confirmDeleteDialog}
        onClose={handleCancelDelete}
        model_title={<>Confirm Delete</>}
        model_content={
          <>
            <p>Are you sure you want to delete this?</p>
            <Button onClick={handleConfirmDelete} color="primary" btnText='Yes'></Button>
            <Button onClick={handleCancelDelete} color="secondary" btnText='No'></Button>
          </>
        }
      />
      <SimpleDialog
        open={editTenantDialogOpen}
        onClose={handleCancelEdit}
        model_title={<>Edit Field</>}
        model_content={dialogContentForEditTenant}
      />
      <SimpleDialog
        open={editUserDialogOpen && !!userTenants}
        onClose={handleCancelEdit}
        model_title={<>{`Edit User`}</>}
        model_content={dialogContentForEditUser}
      />
    </>
  )
}

export default Dashboard



