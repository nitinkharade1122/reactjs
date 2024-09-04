import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Box,
  CardHeader,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  TablePagination,
  Tooltip
} from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import { ChangeEvent, FC, useState } from 'react';
import {
  CryptoOrder,
  CryptoOrderStatus
} from 'src/modules/Transactions/models';
import {
  Card,
  CheckBox,
  Label,
  Select,
  TextField,
  Typography
} from 'src/shared/components/index';
import BulkActions from './BulkActions';

interface RecentOrdersCardProps {
  className?: string;
  cryptoOrders: CryptoOrder[];
  handleButtonClick: (value: string) => void;
}

interface Filters {
  status?: CryptoOrderStatus;
}

const getStatusLabel = (cryptoOrderStatus: CryptoOrderStatus): JSX.Element => {
  const map = {
    failed: {
      text: 'Failed',
      color: 'error'
    },
    completed: {
      text: 'Completed',
      color: 'success'
    },
    pending: {
      text: 'Pending',
      color: 'warning'
    }
  };

  const { text, color }: string | any = map[cryptoOrderStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  cryptoOrders: CryptoOrder[],
  filters: Filters
): CryptoOrder[] => {
  return cryptoOrders?.filter((cryptoOrder) => {
    let matches = true;

    if (filters.status && cryptoOrder.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  cryptoOrders: CryptoOrder[],
  page: number,
  limit: number
): CryptoOrder[] => {
  return cryptoOrders?.slice(page * limit, page * limit + limit);
};

const RecentOrdersCard: FC<RecentOrdersCardProps> = ({
  cryptoOrders,
  handleButtonClick
}) => {
  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedCryptoOrders.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'completed',
      name: 'Completed'
    },
    {
      id: 'pending',
      name: 'Pending'
    },
    {
      id: 'failed',
      name: 'Failed'
    }
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handleSelectAllCryptoOrders = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedCryptoOrders(
      event.target.checked
        ? cryptoOrders?.map((cryptoOrder) => cryptoOrder.id)
        : []
    );
  };

  const handleSelectOneCryptoOrder = (
    event: ChangeEvent<HTMLInputElement>,
    cryptoOrderId: string
  ): void => {
    if (!selectedCryptoOrders.includes(cryptoOrderId)) {
      setSelectedCryptoOrders((prevSelected) => [
        ...prevSelected,
        cryptoOrderId
      ]);
    } else {
      setSelectedCryptoOrders((prevSelected) =>
        prevSelected.filter((id) => id !== cryptoOrderId)
      );
    }
  };

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredCryptoOrders = applyFilters(cryptoOrders, filters);
  const paginatedCryptoOrders = applyPagination(
    filteredCryptoOrders,
    page,
    limit
  );
  const selectedSomeCryptoOrders =
    selectedCryptoOrders.length > 0 &&
    selectedCryptoOrders.length < cryptoOrders?.length;
  const selectedAllCryptoOrders =
    selectedCryptoOrders.length === cryptoOrders?.length;

  return (
    <>
      <Card>
        <Container maxWidth="lg">
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Grid item xs="auto">
              <CheckBox
                color="primary"
                checked={selectedAllCryptoOrders}
                indeterminate={selectedSomeCryptoOrders}
                onChange={handleSelectAllCryptoOrders}
              />
            </Grid>
            <Grid item xs>
              {selectedBulkActions && (
                <Box flex={1} p={2}>
                  <BulkActions />
                </Box>
              )}
              {!selectedBulkActions && (
                <Box flex={1} sx={{ pb: '10px', pt: '10px' }}>
                  <Container maxWidth="lg">
                    <Grid container direction="row" spacing={2}>
                      <Grid item xs={12} md={10} sm={10} lg={11}>
                        <TextField
                          id="outlined-search"
                          label="Search field"
                          type="search"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} md={2} sm={2} lg={1}>
                        <FormControl variant="outlined">
                          <Select
                            className="w-30 "
                            value={filters.status || 'all'}
                            options={statusOptions}
                            onChange={(e) => handleStatusChange(e)}
                            label="Status"
                            itemText="id"
                            itemValue="name"
                            autoWidth
                          >
                            {statusOptions.map((statusOption) => (
                              <MenuItem
                                key={statusOption.id}
                                value={statusOption.id}
                              >
                                {statusOption.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Container>
                </Box>
              )}
            </Grid>
          </Grid>
        </Container>
      </Card>

      <Box p={1}>
        <Grid container>
          {paginatedCryptoOrders?.map((cryptoOrder) => {
            const isCryptoOrderSelected = selectedCryptoOrders.includes(
              cryptoOrder?.id
            );
            return (
              <Grid item xs={12} sm={6} md={4} lg={4} key={cryptoOrder?.id}>
                <Card
                  sx={{
                    p: 1,
                    m: 1
                  }}
                >
                  <CardHeader
                    action={
                      <Box pt={1} display="flex" alignItems="center">
                        <Box>
                          <Typography align="right">
                            {' '}
                            {getStatusLabel(cryptoOrder?.status)}
                          </Typography>
                        </Box>
                        <Box pr={2}>
                          <IconButton aria-label="settings">
                            <MoreVertIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    }
                    title={cryptoOrder?.orderDetails}
                    subheader={cryptoOrder?.orderDate}
                  />
                  <CardContent>
                    <Grid
                      container
                      direction="row"
                      spacing={4}
                      alignItems="center"
                    >
                      <Grid item lg={4} md={6} sm={6} xs={6}>
                        <Typography
                          gutterBottom
                          variant="caption"
                          className="RecentOrderTypography"
                        >
                          Order ID
                        </Typography>
                        <Typography variant="h6">
                          {cryptoOrder?.orderID}
                        </Typography>
                      </Grid>
                      <Grid item lg={4} md={6} sm={6} xs={6}>
                        <Typography
                          gutterBottom
                          variant="caption"
                          className="RecentOrderTypography"
                        >
                          {cryptoOrder?.sourceName}
                        </Typography>
                        <Typography variant="h6">
                          {cryptoOrder?.sourceDesc}
                        </Typography>
                      </Grid>
                      <Grid item lg={4} md={6} sm={6} xs={6}>
                        <Typography
                          gutterBottom
                          variant="caption"
                          className="RecentOrderTypography"
                        >
                          Amount
                        </Typography>
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {cryptoOrder?.amountCrypto}
                          {cryptoOrder?.cryptoCurrency}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          noWrap
                        >
                          {numeral(cryptoOrder?.amount).format(
                            `${cryptoOrder?.currency}0,0.00`
                          )}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions disableSpacing>
                    <Container maxWidth="lg">
                      <Grid container direction="row" alignItems="center">
                        <Grid item xs={8}>
                          <CheckBox
                            color="primary"
                            checked={isCryptoOrderSelected}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                              handleSelectOneCryptoOrder(event, cryptoOrder?.id)
                            }
                            value={isCryptoOrderSelected}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Tooltip title="Edit Order" arrow>
                            <IconButton
                              className="RecentOrderEditButton"
                              color="inherit"
                              size="small"
                              onClick={() => handleButtonClick('clicked!')}
                            >
                              <EditTwoToneIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Order" arrow>
                            <IconButton
                              className="RecentOrderDeleteButton"
                              color="inherit"
                              size="small"
                            >
                              <DeleteTwoToneIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Grid>
                      </Grid>
                    </Container>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      <Card>
        <Box p={2}>
          <TablePagination
            component="div"
            count={filteredCryptoOrders.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25, 30]}
          />
        </Box>
      </Card>
    </>
  );
};

RecentOrdersCard.propTypes = {
  cryptoOrders: PropTypes.array.isRequired
};


export default RecentOrdersCard;
