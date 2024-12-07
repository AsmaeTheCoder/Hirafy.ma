import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useGenerateTokenMutation, useLoginUserMutation, useVerifyUSerMutation } from '../../services/authApi';
import { toast } from 'react-toastify';
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography } from '@mui/material';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styled from '@emotion/styled';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

const initialState = {
    email : "",
    password : "",
};

const ColorButton = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: "#E09540",
  '&:hover': {
      backgroundColor: "#E09540",
  }
}));

const Login = () => {
  const { t, i18n } = useTranslation();

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [open, setOpen] = useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };



    const [formValue, setFormValue] = useState(initialState);
    const [ awaiting, setAwaiting ] = useState<boolean>(false);

    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate();

    const [
        loginUser, 
        {
          data: loginData,
          isSuccess: isLoginSuccess, 
          isError: isLoginError,
          error: loginError
        },
      ] = useLoginUserMutation();

      const [verifyUSer, data] = useVerifyUSerMutation();

      const {email, password} = formValue;

      const [generateToken] = useGenerateTokenMutation();

      const handleChange = (e : any) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value});
      };

      const handleLogin = async (e: any) => {
        e.preventDefault();
        if (email && password) {
          await loginUser({ email, password });
        } else {
          toast.error("Veuillez remplir tous les champs de saisie.");
        }
      };

    useEffect(() => {
      if ( !awaiting ){
        let token = searchParams.get('verify');
        if ( token ) {
          setAwaiting(true);
          verifyUSer(token).then((data) => {
            searchParams.delete('verify');
            setSearchParams(searchParams);
            alert(data);
          }).catch((err:any) => {
            alert(err);
            searchParams.delete('verify');
            setSearchParams(searchParams);
          }).finally(() => setAwaiting(false));
        }
      }
    });

    const handleGenerateToken = async () => {
      if (email){
        await generateToken({email});
        setOpen(true);
      }
    };

    useEffect(() => {
      if (isLoginSuccess) {
        toast.success("L'utilisateur s'est connecté avec succès");
        navigate("/");
      }
    }, [isLoginSuccess]);

    useEffect(() => {
      if (isLoginError) {
        toast.error((loginError as any).data);
      }
    }, [isLoginError]);

  return (
    <>
      <Helmet>
        <title>
          {t('titre.login')}
        </title>
      </Helmet>
      <section style={{ width: "100%", marginBottom: "40px" }}>

        <Typography variant="h5" sx={{ display: "flex", justifyContent: "center", mt: "30px", mb: "40px", fontWeight: "600", fontSize: "1.4rem"}}>
            {t('titre.titreLogin')}
        </Typography>
          <form style={{ margin: "auto", padding: "15px", width: "650px", alignContent: "center" }} >
            <Stack spacing={3}>
              <TextField type='email' value={email} id='email' name='email' placeholder={t('table.AdresseEmail')} onChange={handleChange} fullWidth size='medium' variant="outlined" InputProps={{ startAdornment: ( <InputAdornment position="start"> <MailOutlineOutlinedIcon /> </InputAdornment> ), }} />

              <TextField type={showPassword ? 'text' : 'password'} onChange={handleChange} name='password' placeholder={t('placeholder.password')} variant="outlined" fullWidth size='medium' InputProps={{ startAdornment: ( <InputAdornment position="start"> <VpnKeyOutlinedIcon /> </InputAdornment> ), endAdornment: ( <InputAdornment position="start"> <IconButton onClick={handleTogglePasswordVisibility} edge="start"> {showPassword ? <Visibility /> : <VisibilityOff />} </IconButton> </InputAdornment> ), }} />

              <div>
                <Button variant='text' onClick={() => handleGenerateToken()} style={{ textDecoration: "none", color: "#E09540", textTransform: "none", fontWeight: "500", fontSize: "1.3rem" }} >
                  {t('button.passwordOublie')}
                </Button>
              </div>

              <ColorButton onClick={(e) => handleLogin(e)} variant="contained" sx={{ textDecoration: "none", textTransform: "none", borderRadius: "20px", fontWeight: "500", fontSize: "1.2rem" }} type="submit" fullWidth size='large' >
                {t('titre.login')}
              </ColorButton>

              <h2>
                {t('titre.Vousnavezpasdecompte')} <Button variant='text' style={{ textDecoration: "none", color: "#E09540", textTransform: "none", fontWeight: "500", fontSize: "1.3rem" }} aria-controls={openMenu ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={openMenu ? 'true' : undefined} onClick={handleClick} >{t('button.Sinscrire')}</Button>
              </h2>
            </Stack>
          </form>

          <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" >
            <DialogTitle id="alert-dialog-title" sx={{ display: "flex", justifyContent: "center" }}>
              <h1>Hirafy.ma</h1>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description" sx={{ mt: "-20px" }}>
                <h2>{t('titre.Vérifiezvotreadressee-mail')}</h2>
                {t('text.Veuillezconsulterladresseemail')} <span style={{ fontSize: "large", color: "black" }}>{email}</span> {t('text.poursavoircomment')}
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ mr: "20px", mb: "20px" }}>
              <ColorButton onClick={handleClose} variant="contained" sx={{ borderRadius: "20px" }} >Fermer</ColorButton>
            </DialogActions>
          </Dialog>

        <Menu anchorEl={anchorEl} open={openMenu} onClose={handleCloseMenu} MenuListProps={{ 'aria-labelledby': 'basic-button', }} >
          <MenuItem onClick={() => navigate("/registerClient")}>{t('menu.Entantqueclient')}</MenuItem>
          <MenuItem onClick={() => navigate("/registerArtisan")}>{t('menu.Entantquartisan')}</MenuItem>
        </Menu>
      </section>
    </>
  )
}

export default Login