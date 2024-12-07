import { useState } from 'react'
import {  useAddSupporteurAdminMutation } from '../../../services/userApi';
import { toast } from 'react-toastify';
import styled from '@emotion/styled';
import { Avatar, Button, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { useUploadFileMutation } from '../../../services/cdnApi';
import { Helmet } from 'react-helmet-async';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const ColorButton = styled(Button)(({ theme }) => ({
    color: "white",
    backgroundColor: "#E09540",
    '&:hover': {
        backgroundColor: "#E09540",
    }
}));

const initialState = {
    id: "",
    fname: "",
    lname: "",
    telephone: "",
    adresse: "",
    ville: "",
    profil: "",
    email: "",
    password: "",
    role: "",
};

const AddAdmin = () => {
    const [formValue, setFormValue] = useState(initialState);

    const [uploadFile, {data}] = useUploadFileMutation();

    const [addSupporteurAdmin] = useAddSupporteurAdminMutation();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          uploadFile(e.target.files[0]);
        }
    };

    const {fname, lname, telephone, adresse, ville,profil, email,password,role} = formValue;

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!fname && !lname && !telephone && ! adresse && !ville && !email && !password && !role) {
            toast.error("Please provide value into each field");
        }else {
            await addSupporteurAdmin({...formValue, profil: data?.url, role: "admin"});
            toast.success("Admin a été ajouter avec succes");
        }
    };

    const handleInputChange = (e : any) => {
        let { name, value } = e.target;
        setFormValue({ ...formValue, [name]:value});
    };  

    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

  return (
    <>
        <Helmet>
            <title>
                Ajouter administrateur
            </title>
        </Helmet>
        <div>
            <Typography variant='h5' sx={{fontWeight: "700", fontSize: "1.8rem"}} >Ajouter administrateur</Typography>
            <form style={{ margin: "auto", padding: "15px", maxWidth: "400px", alignContent: "center", marginTop: "20px" }} onSubmit={handleSubmit} >
                <Stack spacing={3}>
                    <Typography variant="h6" component="label">
                        Profil
                    </Typography>
                    
                    <Stack direction="row" spacing={3}>
                        <Avatar src={data?.url} />
                        <TextField type='file' id='profil' name='profil' onChange={handleFileChange} fullWidth size='small' variant="outlined" InputLabelProps={{ shrink: true, }} />
                    </Stack>
                    
                    <Typography variant="h6" component="label">
                        Prénom
                    </Typography>
                    
                    <TextField type='text' id='fname' name='fname' onChange={handleInputChange} fullWidth size='small' variant="outlined" />
                    
                    <Typography variant="h6" component="label">
                        Nom
                    </Typography>
                    
                    <TextField type='text' id='lname' name='lname' onChange={handleInputChange} fullWidth size='small' variant="outlined" />
                    
                    <Typography variant="h6" component="label">
                        Téléphone
                    </Typography>
                    
                    <TextField type='tel' id='telephone' name='telephone' onChange={handleInputChange} fullWidth size='small' variant="outlined" />
                    
                    <Typography variant="h6" component="label">
                        Adresse
                    </Typography>
                    
                    <TextField type='text' id='adresse' name='adresse' onChange={handleInputChange} fullWidth size='small' variant="outlined" />
                    
                    <Typography variant="h6" component="label">
                        Ville
                    </Typography>
                   
                    <TextField type='text' id='ville' name='ville' onChange={handleInputChange} fullWidth size='small' variant="outlined" />
                   
                    <Typography variant="h6" component="label">
                        Email
                    </Typography>
                    
                    <TextField type='email' id='email' name='email' onChange={handleInputChange} fullWidth size='small' variant="outlined" />
                    
                    <Typography variant="h6" component="label">
                        Mot de passe
                    </Typography>
                    
                    <TextField type={showPassword ? 'text' : 'password'} id='password' name='password' onChange={handleInputChange} fullWidth size='small' variant="outlined" InputProps={{ endAdornment: ( <InputAdornment position="start"> <IconButton onClick={handleTogglePasswordVisibility} edge="start"> {showPassword ? <Visibility /> : <VisibilityOff />} </IconButton> </InputAdornment> ), }} />
                   
                    <div style={{ display: "flex", justifyContent: "flex-end" }} >
                        <ColorButton type='reset' variant="contained" sx={{ mx: "5px", borderRadius: "20px", textDecoration: "none", textTransform: "none", fontWeight: "500", fontSize: "1rem"}}>Annuler</ColorButton>
                        <ColorButton type='submit' variant="contained" sx={{ borderRadius: "20px", textDecoration: "none", textTransform: "none", fontWeight: "500", fontSize: "1rem" }} >Ajouter</ColorButton>
                    </div>
                </Stack>
            </form>
        </div>
    </>
  )
}

export default AddAdmin