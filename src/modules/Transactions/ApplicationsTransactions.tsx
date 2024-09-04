import { Helmet } from 'react-helmet-async';
import RecentOrders from './components/RecentOrders';
import { PageTitleWrapper, PageHeader } from 'src/shared/components/index';
import { Typography, Grid2 as Grid, Container, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTransactionData } from './services/transaction.service';
import { AppDispatch, RootState } from 'src/store/configure-store';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';


const ApplicationsTransactions = () => {
  //constants
  const dispatch = useDispatch<AppDispatch>();
  const [cryptoOrders, setCryptoOrders] = useState([]);
  const { transactionData } = useSelector(
    (state: RootState) => state.transactionData
  );
  const { userData } = useSelector((state: RootState) => state.userData);

  //useEffect
  useEffect(() => {
    dispatch(getTransactionData());
  }, []);

  useEffect(() => {
    let cryptoOrders = transactionData;
    setCryptoOrders(cryptoOrders);
  }, [transactionData]);

  //methods
  const onBtnClick = () => {
    console.log('btnClick done !!!!!');
  };

  return (
    <>
      <Helmet>
        <title>Indexnine Transactions - Applications</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader
          heading="Transactions"
          subHeading={`${userData?.name} these are your recent transactions`}
          icon={<AddTwoToneIcon fontSize="small" />}
        >
          <>
            <Typography variant="h3" component="h3" gutterBottom>
              Transactions
            </Typography>
            <Typography variant="subtitle2">
              {userData?.name} these are your recent transactions
            </Typography>
          </>
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
            onClick={onBtnClick}
            >
            Create Transactions
          </Button>
        </PageHeader>
      </PageTitleWrapper>

      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid  size={{ xs:12 }}>
            <RecentOrders
              cryptoOrders={cryptoOrders}
              handleButtonClick={() => null}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ApplicationsTransactions;
