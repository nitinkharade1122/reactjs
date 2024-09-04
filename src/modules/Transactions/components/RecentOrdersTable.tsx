import { Box, Divider, Grid2 as Grid, IconButton, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';
import { FC } from 'react';

import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import Container from '@mui/material/Container';
import { GridColDef } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import { CryptoOrder } from 'src/modules/Transactions/models';
import {
  Card,
  Label,
  Tables,
  TextField,
  Typography
} from 'src/shared/components/index';
import {
  ERROR,
  statusLable,
  SUCCESS,
  WARNING
} from 'src/shared/constants/constants';
interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders: CryptoOrder[];
  handleButtonClick: (e: string) => void;
}

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({
  cryptoOrders,
  handleButtonClick
}) => {
  const { t } = useTranslation('english');
  const getLabelStatus = (status) => {
    switch (status) {
      case statusLable.COMPLETED:
        return <Label color={SUCCESS}>{t('completed')}</Label>;
      case statusLable.PENDING:
        return <Label color={WARNING}>{t('pending')}</Label>;
      case statusLable.FAILED:
        return <Label color={ERROR}>{t('failed')}</Label>;
      default:
        return <Label color={'info'}>{'-'}</Label>;
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'orderDetails',
      sortable: false,
      headerName: 'Order Details',
      width: 190,
      renderCell: (params) => (
        <div className="columnstyle">
          <Typography
            variant="body1"
            fontWeight="bold"
            color="text.primary"
            gutterBottom
            noWrap
          >
            {params.row.orderDetails}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {params.row.orderDate}
          </Typography>
        </div>
      )
    },
    { field: 'orderID', sortable: false, headerName: 'Order ID', width: 190 },
    { field: 'sourceDesc', sortable: false, headerName: 'Source', width: 190 },
    {
      field: 'amount',
      headerName: 'Amount',
      sortable: false,

      type: 'number',
      width: 190
    },
    {
      field: 'status',
      headerName: 'Status',
      renderCell: (params) => getLabelStatus(params?.value),
      width: 190
    },
    {
      field: 'Actions',
      sortable: false,

      renderCell: () => {
        return (
          <>
            <Tooltip title="Edit Order" arrow>
              <IconButton
                aria-label="editorder"
                className="RecentOrderEditButton"
                color="inherit"
                size="small"
                onClick={() => handleButtonClick('clicked!')}
              >
                <EditTwoToneIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip
              className="RecentOrderDeleteButton"
              title="Delete Order"
              arrow
            >
              <IconButton color="inherit" size="small">
                <DeleteTwoToneIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </>
        );
      },

      width: 190
    }
  ];

  return (
    <>
      <Card>
        <Box flex={1} p={3}>
          <Container maxWidth="lg">
            <Grid container direction="row-reverse" spacing={2}>
              <Grid size={{lg: 4 }} >
                <TextField
                  id="outlined-search"
                  label="Search field"
                  type="search"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Divider />

        <Tables rows={cryptoOrders} columns={columns} />
      </Card>
    </>
  );
};

RecentOrdersTable.propTypes = {
  cryptoOrders: PropTypes.array.isRequired
};

// RecentOrdersTable.defaultProps = {
//   cryptoOrders: []
// };

export default RecentOrdersTable;
