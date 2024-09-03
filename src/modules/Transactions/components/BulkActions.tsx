import {
  Box,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  Typography
} from '@mui/material';
import { useRef, useState } from 'react';

import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import { Button } from 'src/shared/components/index';

const BulkActions = () => {
  const [onMenuOpen, menuOpen] = useState<boolean>(false);
  const moreRef = useRef<HTMLButtonElement | null>(null);

  const openMenu = (): void => {
    menuOpen(true);
  };

  const closeMenu = (): void => {
    menuOpen(false);
  };

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Typography variant="h5" color="text.secondary">
            Bulk actions:
          </Typography>
          <Button
            sx={{ ml: 1 }}
            startIcon={<DeleteTwoToneIcon />}
            variant="contained"
            className="errorbutton"
            btnClass="errorbutton"
            btnText="Delete"
          />

          <Button />
        </Box>
        <IconButton
          color="primary"
          onClick={openMenu}
          ref={moreRef}
          sx={{ ml: 2, p: 1 }}
        >
          <MoreVertTwoToneIcon />
        </IconButton>
      </Box>

      <Menu
        keepMounted
        anchorEl={moreRef.current}
        open={onMenuOpen}
        onClose={closeMenu}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
      >
        <List sx={{ p: 1 }} component="nav">
          <ListItemButton>
            <ListItemText primary="Bulk delete selected" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="Bulk edit selected" />
          </ListItemButton>
        </List>
      </Menu>
    </>
  );
};

export default BulkActions;
