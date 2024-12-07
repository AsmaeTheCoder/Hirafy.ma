import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useChangerPasswordMutation, useVerifyTokenMutation } from '../../../services/authApi';
import { toast } from 'react-toastify';
import { Button, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const ColorButton = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: "#E09540",
  '&:hover': {
      backgroundColor: "#E09540",
  }
}));

const initialState = {
  password : "",
  confirm_password : "",
}

const ForgetPassword = () => {
  const { t, i18n } = useTranslation();

  const [formValue, setFormValue] = useState(initialState);
  const [ awaiting, setAwaiting ] = useState<boolean>(false);
  const [token, setToken] = useState<string>();

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const [verifyToken] = useVerifyTokenMutation();

  const [
    changerPassword,
    {
      data,
      isSuccess,
      isError,
      error
    }
  ] = useChangerPasswordMutation();

  const {password, confirm_password} = formValue;

  const handleChange = (e : any) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value});
  };

  useEffect(() => {
    if ( !awaiting ){
      let token = searchParams.get('verify');
      if ( token ) {
        setToken( token );
        setAwaiting(true);
        verifyToken(token).then((data) => {
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

  const handlechangerPassword = async (e: any) => {    
    e.preventDefault();
    if (password && confirm_password) {
      await changerPassword({password, confirm_password, token});
    }
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success("Votre mot de passe modifier avec success");
      navigate("/");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error((error as any).data);
    }
  }, [isError]);

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Helmet>
        <title>
          {t('titre.forgetPassord')}
        </title>
      </Helmet>
      <section style={{ width: "100%", marginBottom: "40px" }}>

        <Typography variant="h5" sx={{ display: "flex", justifyContent: "center", mt: "30px", mb: "40px", fontWeight: "600", fontSize: "1.4rem"}}>
          {t('titre.forgetPassord')}
        </Typography>
        <form style={{ margin: "auto", padding: "15px", width: "650px", alignContent: "center" }} >
          <Stack spacing={3}>
            <TextField type={showPassword ? 'text' : 'password'} id="password" onChange={handleChange} name='password' placeholder={t('placeholder.password')} variant="outlined" fullWidth size='medium' InputProps={{ startAdornment: ( <InputAdornment position="start"> <VpnKeyOutlinedIcon /> </InputAdornment> ), endAdornment: ( <InputAdornment position="start"> <IconButton onClick={handleTogglePasswordVisibility} edge="start"> {showPassword ? <Visibility /> : <VisibilityOff />} </IconButton> </InputAdornment> ), }} />
            
            <TextField type={showPassword ? 'text' : 'password'} id="confirm_password" onChange={handleChange} name='confirm_password' placeholder={t('placeholder.confirmpassword')} variant="outlined" fullWidth size='medium' InputProps={{ startAdornment: ( <InputAdornment position="start"> <VpnKeyOutlinedIcon /> </InputAdornment> ), endAdornment: ( <InputAdornment position="start"> <IconButton onClick={handleTogglePasswordVisibility} edge="start"> {showPassword ? <Visibility /> : <VisibilityOff />} </IconButton> </InputAdornment> ), }} />
            
            <ColorButton onClick={(e) => handlechangerPassword(e)} variant="contained" sx={{ borderRadius: "20px", textDecoration: "none", textTransform: "none", fontWeight: "500", fontSize: "1.1rem" }} type="submit" fullWidth size='large' >
              {t('button.changer')}
            </ColorButton>
          </Stack>
        </form>
      </section>
    </>
  )
}

export default ForgetPassword