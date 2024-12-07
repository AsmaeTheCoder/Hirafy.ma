import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { Avatar, Dialog, DialogActions, Divider, ListItemIcon } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import styled from '@emotion/styled';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { Logout, Settings } from '@mui/icons-material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SouthOutlinedIcon from '@mui/icons-material/SouthOutlined';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/authSlice1';
import { Translate } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useLogOutMutation } from '../../services/authApi';

interface Locale {
  title: string;
}

interface Locales {
  [key: string]: Locale;
}

const locales: Locales = {
  fr: { title: 'Français' },
  ar: { title: 'Arabe' }
};

const ColorButton = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: "#E09540",
  '&:hover': {
      backgroundColor: "#E09540",
  }
}));

const ColorButtonOutlined = styled(Button)(({ theme }) => ({
  color: "#E09540",
  border: "1px solid #E09540",
  borderRadius: "20px",
  '&:hover': {
      color: "#E09540",
      border: "1px solid #E09540",
      borderRadius: "20px",
      backgroundColor: "#FFEEBC",
  }
}));

const Header = () => {
  const { t, i18n } = useTranslation(); 

  const [anchorElDialog, setAnchorElDialog] = useState(null);
  const openDialog = Boolean(anchorElDialog);
  const handleClickDialog = (event: any) => {
    setAnchorElDialog(event.currentTarget);
  };
  const handleCloseDialog = () => {
    setAnchorElDialog(null);
  };

    const navigate = useNavigate();

    const user = useAppSelector((state: RootState) => state.auth.user);

    const dispatch = useDispatch();

    const [logOut] = useLogOutMutation();

    const handleLogout = async () => {
      dispatch(setUser(null));
      await logOut().unwrap();
      toast.success("User Logout Successfully");
      navigate("/login");
    };

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleClickAccount = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleCloseAccount = () => {
      setAnchorEl(null);
    };
  

  return (
    <div>

      <Typography component="div" sx={{ display: "flex" }}>
        <Typography component="div" sx={{ flexGrow: 1, fontSize: '24px', ml: "30px"}}>
          Hirafy.ma
        </Typography>

        <IconButton onClick={(e) => handleClickDialog(e)} sx={{ mr: '20px' }} ><Translate sx={{ color: "#E09540" }} /></IconButton>

        <Menu id="basic-menu" anchorEl={anchorElDialog} open={openDialog} onClose={handleCloseDialog} MenuListProps={{ 'aria-labelledby': 'basic-button', }} >
          <ul style={{ listStyleType: "none", display: "flex", justifyContent: "space-around" }}>
            {
              Object.keys(locales).map((locale) => (
                <li key={locale}>
                  <ColorButton variant="contained" style={{ fontWeight: i18n.resolvedLanguage === locale ? 'bold' : 'normal', borderRadius: "20px", width: "100px", margin: "10px", textDecoration: "none", textTransform: "none", fontSize: "1rem" }} type='submit' size='large' onClick={() => i18n.changeLanguage(locale)}>
                    {locales[locale].title}
                  </ColorButton>
                </li>
              ))
            }
          </ul>
        </Menu>

        <Button color="inherit" onClick={() => { navigate("/") }} sx={{ textDecoration: "none", textTransform: "none", mr: '20px', fontWeight: "700", fontSize: "1.5rem" }} >{t('titre.Accueil')}</Button>
        
        { 
          user ?
            <div>
              

              <Tooltip title={`${user?.lname} ${user?.fname}`}>
                <IconButton
                  onClick={handleClickAccount}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }} alt={`${user?.lname} ${user?.fname}`} src={user?.profil} />

                </IconButton>
              </Tooltip>

              <Menu anchorEl={anchorEl} id="account-menu" open={open} onClose={handleClose} onClick={handleClose}           PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}

        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => navigate('/getProfil')} sx={{ justifyContent: "center" }}>
          <Avatar alt={`${user?.lname} ${user?.fname}`} src={user?.profil}  /> 
        </MenuItem>       
        <MenuItem onClick={() => navigate('/getProfil')} sx={{ justifyContent: "center", color: "black" }}>
        {`${user?.lname} ${user?.fname}`}
        </MenuItem> 
        <MenuItem onClick={() => navigate('/getProfil')} sx={{ color: "black" }} >
          <ListItemIcon>
            <SettingsOutlinedIcon fontSize="small" sx={{ color: "black" }} />
          </ListItemIcon>
          {t('titre.Paramètre')}
        </MenuItem>
              
        <Divider sx={{ backgroundColor: "black" }} />

        <MenuItem onClick={() => handleLogout()} sx={{ color: "black" }} >
          <ListItemIcon>
            <Logout fontSize="small" sx={{ color: "black" }} />
          </ListItemIcon>
          {t('titre.Déconnexion')}
        </MenuItem>
      </Menu>
            </div>
          :
            <div>
              <ColorButtonOutlined variant="outlined" onClick={() => { navigate("/login") }} sx={{ mr: "20px", textDecoration: "none", textTransform: "none", fontWeight: "500", fontSize: "1rem" }} >
                Se connecter
              </ColorButtonOutlined>
              <ColorButtonOutlined variant="outlined" sx={{ mr: '50px', textDecoration: "none", textTransform: "none", fontWeight: "500", fontSize: "1rem" }} aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick} endIcon={<SouthOutlinedIcon />} >
                S'inscrire
              </ColorButtonOutlined>

              <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{ 'aria-labelledby': 'basic-button', }} >
                <MenuItem><Button onClick={() => { navigate("/registerClient") }} variant='text' sx={{ color: "#E09540", '&:hover':{ color: "#E09540", backgroundColor: "#FFEEBC" }, textDecoration: "none", textTransform: "none", fontWeight: "500", fontSize: "1rem" }}>En tant que Client</Button></MenuItem>
                <MenuItem><Button onClick={() => { navigate("/registerArtisan") }} variant='text' sx={{ color: "#E09540", '&:hover':{ color: "#E09540", backgroundColor: "#FFEEBC" }, textDecoration: "none", textTransform: "none", fontWeight: "500", fontSize: "1rem" }}>En tant qu'Artisan</Button></MenuItem>
              </Menu>

            </div>
        }
        
      </Typography>
      <Divider sx={{ backgroundColor: "black", mb: "0px" }} />
    </div>
  )
}

export default Header