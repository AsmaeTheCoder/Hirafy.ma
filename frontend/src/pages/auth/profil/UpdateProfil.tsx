import { useEffect, useState } from "react";
import { useGetProfilQuery, useUpdateProfilMutation } from "../../../services/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "@emotion/styled";
import { Avatar, Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useUploadFileMutation } from "../../../services/cdnApi";
import { Helmet } from "react-helmet-async";
import { useTranslation } from 'react-i18next';

const initialState = {
    fname: "",
    lname: "",
    telephone: "",
    adresse: "",
    ville: "",
    profil: "",
    email: "",
};

const ColorButton = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: "#E09540",
  '&:hover': {
      backgroundColor: "#E09540",
  }
}));

const UpdateProfil = () => {
  const { t, i18n } = useTranslation();

  const [formValue, setFormValue] = useState(initialState);

  const [uploadFile, {data: dataFile}] = useUploadFileMutation();

  const [updateProfil] = useUpdateProfilMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        uploadFile(e.target.files[0]);
      }
  };

    const {
      data,
      error,
      isFetching,
      isLoading
    } = useGetProfilQuery();

    const {fname, lname, telephone, adresse, ville,profil, email} = formValue;

    const navigate = useNavigate();

    useEffect(() => {
      if (data) {
              setFormValue({...data});
      }else {
          setFormValue({...initialState});
      }
  }, [data]);

    const handleSubmit = async (e: any) => {
      e.preventDefault();
      const profile = dataFile?.url ? dataFile?.url : profil;
      if (!fname && !lname && !telephone && ! adresse && !ville && !email) {
          toast.error("Please provide value into each field");
      }else {
          await updateProfil({...formValue, profil: profile});
          navigate("/getProfil");
          toast.success("Contact Updated Successfuly");
      }
    };

    const handleInputChange = (e : any) => {
        let { name, value } = e.target;
        setFormValue({ ...formValue, [name]:value});
    }; 

  return (
    <>
      <Helmet>
        <title>
          {t('titre.resetPassword')}
        </title>
      </Helmet>
      <Stack spacing={4} sx={{ width: "100%", ml: "80px" }}>

        <Paper elevation={3} sx={{ borderRadius: "20px", display: "flex", width: "750px", padding: "40px", mx: "auto" }}>
          <form style={{ margin: "auto", padding: "15px", width: "650px", alignContent: "center" }} onSubmit={handleSubmit} >
            <Stack spacing={3}>
              <Stack direction="row" spacing={3}>
                <Box component="img" sx={{ width: "70px", height: "70px", borderRadius: "35px"}} src={profil} alt={fname} />
                <TextField type='file' id='profil' name='profil' onChange={handleFileChange} fullWidth size='small' variant="outlined" InputLabelProps={{ shrink: true, }} />
              </Stack>
              
              <Typography variant="h6" component="label">
                {t('table.prenom')}
              </Typography>
              
              <TextField type='text' id='fname' name='fname' value={fname} onChange={handleInputChange} fullWidth size='small' variant="outlined" />
              
              <Typography variant="h6" component="label">
                {t('table.nom')}
              </Typography>
              
              <TextField type='text' id='lname' name='lname' value={lname} onChange={handleInputChange} fullWidth size='small' variant="outlined" />
              
              <Typography variant="h6" component="label">
                {t('table.telephone')}
              </Typography>
              
              <TextField type='tel' id='telephone' name='telephone' value={telephone} onChange={handleInputChange} fullWidth size='small' variant="outlined" />
              
              <Typography variant="h6" component="label">
                {t('table.AdresseEmail')}
              </Typography>
              
              <TextField type='email' id='email' name='email' value={email} onChange={handleInputChange} fullWidth size='small' variant="outlined" />
              
              <Typography variant="h6" component="label">
                {t('table.Adresse')}
              </Typography>
              
              <TextField type='text' id='adresse' name='adresse' value={adresse} onChange={handleInputChange} fullWidth size='small' variant="outlined" />
              
              <Typography variant="h6" component="label">
                {t('table.Ville')}
              </Typography>
              
              <TextField type='text' id='ville' name='ville' value={ville} onChange={handleInputChange} fullWidth size='small' variant="outlined" />
              
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

export default UpdateProfil