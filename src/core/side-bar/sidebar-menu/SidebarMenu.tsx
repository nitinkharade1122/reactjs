import TableChartTwoToneIcon from '@mui/icons-material/TableChartTwoTone';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { SidebarMenus } from 'src/shared/components/index';
import * as ROUTES from 'src/shared/constants/routes';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../src/store/configure-store';

const SidebarMenu = () => {
  const userData = useSelector((state: RootState) => state.userData);
  const selectedTenantId = userData.tenantRoles.filter(
    (tenantRole) => tenantRole.tenantId === userData.selectedTenantId
  );
  const isPlatformAdmin = userData.tenantRoles.some((role) =>
    role.roles.includes('SUPER_ADMIN')
  );
  const isTenantAdmin = selectedTenantId.some((role) =>
    role.roles.includes('ADMIN')
  );
  const isUser = selectedTenantId.some((role) => role.roles.includes('USER'));

  return (
    <>
      <SidebarMenus
        menuname={''}
        option={[
          ...(isPlatformAdmin
            ? [
                {
                  pathname: ROUTES.TENANT,
                  subpathname: '',
                  icon: <TableChartTwoToneIcon />,
                  submenuname: 'Tenant Management',
                },
              ]
            : []),
          ...(isPlatformAdmin || isTenantAdmin
            ? [
                {
                  pathname: ROUTES.USER,
                  subpathname: '',
                  icon: <TableChartTwoToneIcon />,
                  submenuname: 'User Management',
                },
                {
                  pathname: ROUTES.ROLE,
                  subpathname: '',
                  icon: <TableChartTwoToneIcon />,
                  submenuname: 'Role Management',
                },
              ]
            : []),

          ...(isUser
            ? [
                {
                  pathname: ROUTES.USER_DASHBOARD,
                  subpathname: '',
                  icon: <TableChartTwoToneIcon />,
                  submenuname: 'User Dashboard',
                },
              ]
            : []),

          // Client module accessible to all users
          {
            pathname: ROUTES.CLIENT,
            subpathname: '',
            icon: <PeopleAltIcon />,
            submenuname: 'Client Management',
          },
        ]}
      />
    </>
  );
};

export default SidebarMenu;
