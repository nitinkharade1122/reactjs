import { combineReducers } from '@reduxjs/toolkit';
import transactionReducer from 'src/modules/Transactions/services/transaction.service';
import userReducer from './userReducer';
import cryptoReducer from '../../../src/modules/Dashboard/services/dashboards.service';

const combinedReducer = combineReducers({
  transactionData: transactionReducer,
  userData: userReducer,
  dashboardData: cryptoReducer,
});
const rootReducer = (state: any, action: any) => {
  if (action.type === 'user/logout') {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export default rootReducer;
