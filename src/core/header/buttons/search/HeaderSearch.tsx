import FindInPageTwoToneIcon from '@mui/icons-material/FindInPageTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import {
  Box,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  Slide,
  Tooltip
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { ChangeEvent, forwardRef, ReactElement, Ref, useState } from 'react';

import ChevronRightTwoToneIcon from '@mui/icons-material/ChevronRightTwoTone';
import {
  Avatar,
  Button,
  SimpleDialog,
  TextField,
  Typography
} from 'src/shared/components/index';

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: ReactElement<any, string> },
  ref: Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const HeaderSearch = () => {
  const [openSearchResults, setOpenSearchResults] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value);

    if (event.target.value) {
      if (!openSearchResults) {
        setOpenSearchResults(true);
      }
    } else {
      setOpenSearchResults(false);
    }
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip arrow title="Search">
        <IconButton color="primary" onClick={handleClickOpen}>
          <SearchTwoToneIcon />
        </IconButton>
      </Tooltip>

      <SimpleDialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="md"
        fullWidth
        scroll="paper"
        model_title={
          <>
            <DialogTitle className="DialogTitle-Wrapper">
              <TextField
                value={searchValue}
                autoFocus={true}
                onChange={handleSearchChange}
                placeholder="Search terms here..."
                fullWidth
                label="Search"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchTwoToneIcon />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </DialogTitle>
          </>
        }
        model_content={
          <>
            {openSearchResults && (
              <DialogContent>
                <Box
                  sx={{ pt: 0, pb: 1 }}
                  display="flex"
                  justifyContent="space-between"
                >
                  <Typography variant="body2">
                    Search results for{' '}
                    <Typography className="textweight" variant="body1">
                      {searchValue}
                    </Typography>
                  </Typography>
                  <Link href="#" variant="body2" underline="hover">
                    Advanced search
                  </Link>
                </Box>
                <Divider sx={{ my: 1 }} />
                <List disablePadding>
                  <ListItem >
                      <ListItemAvatar sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Avatar className="SearchAvatar">
                          <FindInPageTwoToneIcon />
                        </Avatar>
                      </ListItemAvatar>
                    <Box flex="1">
                      <Box display="flex" justifyContent="space-between">
                        <Link
                          href="#"
                          underline="hover"
                          className="textweight"
                          variant="body2"
                        >
                          Dashboard for Healthcare Platform
                        </Link>
                      </Box>
                      <Typography variant="body2" className="SearchTypography">
                        This page contains all the necessary information for
                        managing all hospital staff.
                      </Typography>
                    </Box>
                    <ChevronRightTwoToneIcon />
                  </ListItem>
                  <Divider sx={{ my: 1 }} component="li" />
                  <ListItem >
                      <ListItemAvatar sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Avatar className="SearchAvatar">
                          <FindInPageTwoToneIcon />
                        </Avatar>
                      </ListItemAvatar>
                    <Box flex="1">
                      <Box display="flex" justifyContent="space-between">
                        <Link
                          href="#"
                          underline="hover"
                          className="textweight"
                          variant="body2"
                        >
                          Example Projects Application
                        </Link>
                      </Box>
                      <Typography variant="body2" className="SearchTypography">
                        This is yet another search result pointing to a app
                        page.
                      </Typography>
                    </Box>
                    <ChevronRightTwoToneIcon />
                  </ListItem>
                  <Divider sx={{ my: 1 }} component="li" />
                  <ListItem >
                      <ListItemAvatar sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Avatar className="SearchAvatar">
                          <FindInPageTwoToneIcon />
                        </Avatar>
                      </ListItemAvatar>
                    <Box flex="1">
                      <Box display="flex" justifyContent="space-between">
                        <Link
                          href="#"
                          underline="hover"
                          className="textweight"
                          variant="body2"
                        >
                          Search Results Page
                        </Link>
                      </Box>
                      <Typography variant="body2" className="SearchTypography">
                        Choose if you would like to show or not this typography
                        section here...
                      </Typography>
                    </Box>
                    <ChevronRightTwoToneIcon />
                  </ListItem>
                </List>
                <Divider sx={{ mt: 1, mb: 2 }} />
                <Box className="textalign">
                  <Button
                    btnText="View all search results"
                    color="primary"
                  ></Button>
                </Box>
              </DialogContent>
            )}
          </>
        }
        onClose={handleClose}
      >
        <Divider />
      </SimpleDialog>
    </>
  );
};

export default HeaderSearch;
