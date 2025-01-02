import TableChartTwoToneIcon from "@mui/icons-material/TableChartTwoTone";
import { SidebarMenus } from "src/shared/components/index";
import * as ROUTES from "src/shared/constants/routes";
import { useSelector } from 'react-redux';
import { RootState } from "../../../../src/store/configure-store";

const SidebarMenu = () => {
  const userData = useSelector((state: RootState) => state.userData);
  const isPlatformAdmin = userData.tenantRoles.some(role => role.roles.includes('SUPER_ADMIN'));
  const isTenantAdmin = userData.tenantRoles.some(role => role.roles.includes('ADMIN'));
  const isUser = userData.tenantRoles.some(role => role.roles.includes('USER'));

  return (
    <>
      <SidebarMenus
        menuname={""}
        option={[
          ...(isPlatformAdmin ? [
            {
              pathname: ROUTES.TENANT,
              subpathname: '',
              icon: <TableChartTwoToneIcon />,
              submenuname: "Tenant Management",
            },
          ] : []),
          ...(isPlatformAdmin || isTenantAdmin ? [
            {
              pathname: ROUTES.USER,
              subpathname: '',
              icon: <TableChartTwoToneIcon />,
              submenuname: "User Management",
            },
            {
              pathname: ROUTES.ROLE,
              subpathname: '',
              icon: <TableChartTwoToneIcon />,
              submenuname: "Role Management",
            },
          ] : []),

          ...(isUser ? [
            {
              pathname: ROUTES.USER_DASHBOARD,
              subpathname: '',
              icon: <TableChartTwoToneIcon />,
              submenuname: "User Dashboard",
            },
          ] : []),
        ]}
      />
    </>
  );
};

export default SidebarMenu;
