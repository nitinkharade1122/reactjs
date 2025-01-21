import { setSelectedTenantId, UserType } from 'src/store/reducer/userReducer';
import { TENANT, USER, USER_DASHBOARD } from 'src/shared/constants/routes';
import axiosInstance from 'src/core/interceptors/axios-instance';

export const handleAuthNavigation = (
  decodedToken: UserType,
  navigate: Function,
  dispatch: Function
) => {
  const isSuperAdmin = decodedToken.tenantRoles.find((role) =>
    role.roles.includes('SUPER_ADMIN')
  );

  const isAdmin = decodedToken.tenantRoles.find((role) =>
    role.roles.includes('ADMIN')
  );

  if (isSuperAdmin) {
    // Set the current tenant ID for super admin and navigate to TENANT
    axiosInstance.defaults.headers['currentTenantId'] = isSuperAdmin?.tenantId;
    dispatch(setSelectedTenantId(isSuperAdmin?.tenantId));
    navigate(TENANT);
  } else {
    // For regular users, set the current tenant ID and navigate to USER_DASHBOARD
    axiosInstance.defaults.headers['currentTenantId'] =
      decodedToken?.tenantRoles[0]?.tenantId;
    if (isAdmin) {
      navigate(USER);
    } else {
      navigate(USER_DASHBOARD);
    }
  }
};
