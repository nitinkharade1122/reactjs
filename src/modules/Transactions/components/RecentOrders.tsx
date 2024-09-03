import { CryptoOrder } from 'src/modules/Transactions/models';
import RecentOrdersTable from './RecentOrdersTable';
import RecentOrdersCard from './RecentOrderCard';
import { FC, MouseEvent, useState } from 'react';
import { Box } from '@mui/material';
import GridViewSharpIcon from '@mui/icons-material/GridViewSharp';
import TableRowsTwoToneIcon from '@mui/icons-material/TableRowsTwoTone';
import { Card, ButtonToggle } from 'src/shared/components/index';

interface RecentOrdersProps {
  className?: string;
  cryptoOrders: CryptoOrder[];
  handleButtonClick(): void;
}

const RecentOrders: FC<RecentOrdersProps> = ({
  cryptoOrders,
  handleButtonClick
}) => {
  const [tabs, setTab] = useState<string | null>('Recent_Orders_Table');

  const handleViewOrientation = (
    _event: MouseEvent<HTMLElement>,
    newValue: string | null
  ) => {
    if (newValue !== null) {
      setTab(newValue);
    }
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="end"
        sx={{
          pb: 2
        }}
      >
        <ButtonToggle
          buttons={[
            {
              content: <GridViewSharpIcon />,
              value: 'Recent_Orders_Card'
            },
            {
              content: <TableRowsTwoToneIcon />,
              value: 'Recent_Orders_Table'
            }
          ]}
          value={tabs}
          // exclusive
          onChange={handleViewOrientation}
        />
      </Box>
      {tabs === 'Recent_Orders_Card' && (
        <RecentOrdersCard
          cryptoOrders={cryptoOrders}
          handleButtonClick={handleButtonClick}
        />
      )}
      {tabs === 'Recent_Orders_Table' && (
        <Card>
          {' '}
          <RecentOrdersTable
            cryptoOrders={cryptoOrders}
            handleButtonClick={handleButtonClick}
          />
        </Card>
      )}
    </>
  );
};

export default RecentOrders;
