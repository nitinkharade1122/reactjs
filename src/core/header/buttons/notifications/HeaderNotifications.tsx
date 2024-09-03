import { useRef, useState } from 'react';
import {
  Badge,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  Popover,
  Tooltip
} from '@mui/material';
import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';
import { formatDistance, subDays } from 'date-fns';
import { Typography } from 'src/shared/components/index';

const HeaderNotifications = () => {
  const ref = useRef<HTMLButtonElement>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip arrow title="Notifications">
        <IconButton color="primary" ref={ref} onClick={handleOpen}>
          <Badge
            className="MuiBadge-badge"
            badgeContent={1}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
          >
            <NotificationsActiveTwoToneIcon />
          </Badge>
        </IconButton>
      </Tooltip>
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
        <Box
          sx={{ p: 2 }}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h5">Notifications</Typography>
        </Box>
        <Divider />
        <List sx={{ p: 0 }}>
          <ListItem className="m-width-Userbox" sx={{ p: 2 }}>
            <Box flex="1">
              <Box display="flex" justifyContent="space-between">
                <Typography className="textweight">
                  Messaging Platform
                </Typography>
                <Typography variant="caption" className="textNone">
                  {formatDistance(subDays(new Date(), 3), new Date(), {
                    addSuffix: true
                  })}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                new messages in your inbox
              </Typography>
            </Box>
          </ListItem>
        </List>
      </Popover>
    </>
  );
};

export default HeaderNotifications;
