import { useEffect, useState } from "react";
import { useResetPasswordMutation } from "../../../services/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button, IconButton, InputAdornment, Paper, Stack, TextField, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import { Helmet } from "react-helmet-async";
import { useTranslation } from 'react-i18next';

const ColorButton = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: "#E09540",
  '&:hover': {
      backgroundColor: "#E09540",
  }
}));

const initialState = {
    old_password : "",
    new_password : "",
    confirm_password : "",
}

const ResetPassword = () => {
    const { t, i18n } = useTranslation();

    const [formValue, setFormValue] = useState(initialState);

    const navigate = useNavigate();

    const [
        resetPassword, 
        {
            data, 
            isSuccess, 
            isError, 
            error
        }
    ] = useResetPasswordMutation();

    const {old_password, new_password, confirm_password} = formValue;

    const handleChange = (e : any) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value});
    };

    const handleResetPassword = async (e: any) => { 
      e.preventDefault();
        if (old_password && new_password && confirm_password) {
          await resetPassword({old_password, new_password, confirm_password});
        }
    }

    useEffect(() => {
        if (isSuccess) {
          toast.success("Votre mot de passe modifier avec success");
          navigate("/getProfil");
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
          {t('titre.resetPassword')}
        </title>
      </Helmet>
      <Stack spacing={4} sx={{ width: "100%", ml: "80px", mt: "10px" }}>

        <Paper elevation={3} sx={{ borderRadius: "20px", display: "flex", width: "750px", padding: "40px", mx: "auto" }}>
          <form style={{ margin: "auto", padding: "15px", width: "650px", alignContent: "center" }} onSubmit={handleResetPassword} >
            <Stack spacing={4}>
              <Typography variant="h6" component="label">
                {t('label.oldPassword')}
              </Typography>
              
              <TextField type={showPassword ? 'text' : 'password'} id='old_password' name='old_password' value={old_password} onChange={handleChange} fullWidth size='small' variant="outlined" InputProps={{ startAdornment: ( <InputAdornment position="start"> <VpnKeyOutlinedIcon /> </InputAdornment> ), endAdornment: ( <InputAdornment position="start"> <IconButton onClick={handleTogglePasswordVisibility} edge="start"> {showPassword ? <Visibility /> : <VisibilityOff />} </IconButton> </InputAdornment> ), }} />
              
              <Typography variant="h6" component="label">
                {t('placeholder.password')}
              </Typography>
              
              <TextField type={showPassword ? 'text' : 'password'} id='new_password' name='new_password' value={new_password} onChange={handleChange} fullWidth size='small' variant="outlined" InputProps={{ startAdornment: ( <InputAdornment position="start"> <VpnKeyOutlinedIcon /> </InputAdornment> ), endAdornment: ( <InputAdornment position="start"> <IconButton onClick={handleTogglePasswordVisibility} edge="start"> {showPassword ? <Visibility /> : <VisibilityOff />} </IconButton> </InputAdornment> ), }} />
              
              <Typography variant="h6" component="label">
                {t('placeholder.confirmpassword')}
              </Typography>
              
              <TextField type={showPassword ? 'text' : 'password'} id='confirm_password' name='confirm_password' value={confirm_password} onChange={handleChange} fullWidth size='small' variant="outlined" InputProps={{ startAdornment: ( <InputAdornment position="start"> <VpnKeyOutlinedIcon /> </InputAdornment> ), endAdornment: ( <InputAdornment position="start"> <IconButton onClick={handleTogglePasswordVisibility} edge="start"> {showPassword ? <Visibility /> : <VisibilityOff />} </IconButton> </InputAdornment> ), }} />

              <div style={{ display: "flex", justifyContent: "flex-end" }} >
                <ColorButton type='submit' variant="contained" sx={{ borderRadius: "20px", textDecoration: "none", textTransform: "none", fontWeight: "500", fontSize: "1rem" }} >{t('button.modifier')}</ColorButton>
              </div>
            </Stack>
          </form>
        </Paper>
      </Stack>
    </>
  )
}

export default ResetPassword