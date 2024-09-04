import { useTranslation } from 'react-i18next';
import {
  Box,
  ListItemText,
  List,
  Menu,
  MenuItem,
  ListItemButton,
  Tooltip
} from '@mui/material';
import { useRef, useState } from 'react';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
const LangSelect = () => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(
    localStorage.getItem('language') || 'English'
  );

  const ref = useRef<HTMLLIElement>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const changeLanguage = (lang: string, languagename: string) => {
    setLang(languagename);
    i18n.changeLanguage(lang.toLowerCase());
    localStorage.setItem('language', lang);
    setOpen(false);
  };
  return (
    <>
      <Box className="listWrapper">
        <List>
          <ListItemButton
          component="li" 
            classes={{ root: 'MuiListItem-indicators' }}
        
            ref={ref}
            defaultValue="a"
            onClick={handleOpen}
          >
            <Tooltip arrow title="Select Language">
              <ListItemText
                primaryTypographyProps={{ noWrap: true }}
                primary={
                  <Box display="flex" alignItems="center">
                    {lang}
                    <Box display="flex" alignItems="center" pl={0.3}>
                      <ExpandMoreTwoToneIcon fontSize="small" />
                    </Box>
                  </Box>
                }
              />
            </Tooltip>
          </ListItemButton>
        </List>
      </Box>
      <Box sx={{ mr: 1 }}>
        <Menu anchorEl={ref.current} onClose={handleClose} open={isOpen}>
          <MenuItem
            sx={{ px: 3 }}
            onClick={() => changeLanguage('English', 'English')}
          >
            English
          </MenuItem>
          <MenuItem
            sx={{ px: 3 }}
            onClick={() => changeLanguage('French', 'French')}
          >
            French
          </MenuItem>
          {/* <MenuItem sx={{ px: 3 }}>Spanish</MenuItem>
          <MenuItem sx={{ px: 3 }}>Chinease</MenuItem> */}
        </Menu>
      </Box>
    </>
  );
};

export default LangSelect;
