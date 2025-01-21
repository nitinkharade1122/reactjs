import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TenantRoleType {
  tenantId: number;
  roles: string[];
}

export interface UserType {
  name: string;
  email: string;
  userId: number;
  tenantRoles: TenantRoleType[];
  selectedTenantId: number | null;
}

const initialState: UserType = {
  name: '',
  email: '',
  userId: 0,
  tenantRoles: [],
  selectedTenantId: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails(state, action: PayloadAction<UserType>) {
      return { ...state, ...action.payload };
    },
    clearUserDetails(state) {
      return initialState;
    },
    setSelectedTenantId(state, action: PayloadAction<number | null>) {
      state.selectedTenantId = action.payload;
    },
  },
});

export const { setUserDetails, clearUserDetails, setSelectedTenantId } =
  userSlice.actions;
export default userSlice.reducer;
