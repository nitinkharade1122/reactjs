import { combineReducers } from '@reduxjs/toolkit';
import transactionReducer from 'src/modules/Transactions/services/transaction.service';
import userReducer from './userReducer';
import cryptoReducer from '../../../src/modules/Dashboard/services/dashboards.service';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

// Create a persist configuration for the userData reducer
const userPersistConfig = {
  key: 'userData',
  storage,
};

// Create a persisted reducer for userData
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

const combinedReducer = combineReducers({
  transactionData: transactionReducer,
  userData: persistedUserReducer,
  dashboardData: cryptoReducer,
});
const rootReducer = (state: any, action: any) => {
  if (action.type === 'user/logout') {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export default rootReducer;
