import { useEffect, useRef, useState } from 'react';
import { Avatar, Box, Button, Popover } from '@mui/material';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import { useAuth } from 'src/providers/AuthguardContext';
import { Typography } from 'src/shared/components/index';
import { getLoggedInUserData } from 'src/modules/Transactions/services/transaction.service';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from 'src/store/configure-store';

const HeaderUserbox = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userData } = useSelector((state: RootState) => state.userData);

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
    logout();
  };

  return (
    <>
      <Button color="secondary" ref={ref} onClick={handleOpen}>
        <Avatar variant="rounded" alt={userData?.name} src={userData?.avatar} />
        <Box className="hidden md:flex flex-col ml-2">
          <Typography className="UserBoxLabel" variant="body1">
            {userData?.name}
          </Typography>
          <Typography className="UserBoxDescription" variant="body2">
            {userData?.jobtitle}
          </Typography>
        </Box>
        <ExpandMoreTwoToneIcon className="hidden sm:inline-block ml-1" />
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
              {userData?.jobtitle}
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
