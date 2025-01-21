import { useEffect, useRef, useState } from 'react';
import { Avatar, Box, Button, Popover } from '@mui/material';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import { useAuth } from 'src/providers/AuthguardContext';
import { Typography } from 'src/shared/components/index';
import { getLoggedInUserData } from 'src/modules/Transactions/services/transaction.service';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, persistor, RootState } from 'src/store/configure-store';
import { LOGIN } from '../../../shared/constants/routes';
import { useNavigate } from 'react-router';
import { clearUserDetails } from '../../../store/reducer/userReducer';

interface TenantRole {
  tenantId: number;
  roles?: string[];
}

interface UserData {
  name?: string;
  avatar?: string;
  tenantRoles?: TenantRole[];
}

const HeaderUserbox = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.userData) as UserData;
  const selectedTenantId = useSelector((state: RootState) => state.userData.selectedTenantId);

  useEffect(() => {
    dispatch(getLoggedInUserData());
  }, []);

  const ref = useRef<HTMLButtonElement>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const { logout } = useAuth();

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const userLogout = () => {
    dispatch(clearUserDetails());
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    persistor.purge();
    navigate(LOGIN);
  };
  /**
   * Helper function to convert SNAKE_CASE to Title Case
   * @param name - The string to convert to title case.
   * @returns The title case version of the input string.
   */
  let convertToTitleCase = (name: string | undefined): string => {
    if (!name) return "";
    return name
      .toLowerCase()
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /**
   * Get the current role for the selected tenant
   * @returns The current role for the selected tenant.
   */
  const getCurrentRole = () => {
    const tenantRole = userData.tenantRoles.find(role => role.tenantId === selectedTenantId);
    return tenantRole ? tenantRole.roles[0] : 'No Role'; // Return the role for the current tenant
  };
  /**
   * Extract and format the role
   * @returns The formatted role string.
   */
  const formattedRole = convertToTitleCase(getCurrentRole());



  return (
    <>
      <Button color="secondary" ref={ref} onClick={handleOpen}>
        <Avatar variant="rounded" alt={userData?.name} src={userData?.avatar} />
        <Box className="UserBoxText">
          <Typography className="UserBoxLabel" variant="body1">
            {userData?.name}
          </Typography>
          <Typography className="UserBoxDescription" variant="body2">
            {formattedRole}
          </Typography>
        </Box>
        <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
      </Button>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <Box className="m-width-Userbox MenuUserBox">
          <Avatar variant="rounded" alt={userData?.name} src={userData?.avatar} />
          <Box className="UserBoxText">
            <Typography className="UserBoxLabel" variant="body1">
              {userData?.name}
            </Typography>
            <Typography className="UserBoxDescription" variant="body2">
              {formattedRole}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ m: 1 }}>
          <Button color="primary" fullWidth onClick={userLogout}>
            <LockOpenTwoToneIcon sx={{ mr: 1 }} />
            Sign out
          </Button>
        </Box>
      </Popover>
    </>
  );
};

export default HeaderUserbox;
