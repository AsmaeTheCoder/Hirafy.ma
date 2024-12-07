import { useEffect, useState } from 'react'
import { useAddReclamationMutation } from '../../services/reclamationApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from '@emotion/styled';
import { Button, FormControl, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const ColorButton = styled(Button)(({ theme }) => ({
    color: "white",
    backgroundColor: "#E09540",
    '&:hover': {
        backgroundColor: "#E09540",
    }
  }))

const initialState = {
    id: "",
    sujet: "",
    description: "",
    statut: "",
};

interface Statut {
    [key: string]: string;
}

const AddReclamation = () => {
    const { t, i18n } = useTranslation();

    const statuts: Statut[] = t('statut', { returnObjects: true });

    const [formValue, setFormValue] = useState(initialState);

    const navigate = useNavigate();

    const [
        addReclamation,
        {
            data,
            isSuccess,
            isError,
            error
        }
    ] = useAddReclamationMutation();

    const {sujet, description, statut} = formValue;

    const handleAddReclmation = async (e: any) => {
        e.preventDefault();
        if (!sujet && !description && !statut) {
            toast.error("Please provide value into each field");
        }else {
            await addReclamation(formValue);
            navigate("/getProfil");
            toast.success("Reclamation Added Successfuly");
        }
    };

    const handleInputChange = (e : any) => {
        let { name, value } = e.target;
        setFormValue({ ...formValue, [name]:value});
    };  

    useEffect(() => {
        if (isSuccess) {
          toast.success("l'utilisateur s'est enregistré avec succès");
          navigate("/getProfil");
        }
      }, [isSuccess]);

    useEffect(() => {
        if (isError) {
          toast.error((error as any).data);
        }
    }, [isError]);

  return (
    <>
        <Helmet>
            <title>
                {t('titre.Reclamez')}
            </title>
        </Helmet>
        <Stack spacing={4} sx={{ width: "100%", ml: "80px", mt: "10px" }}>
            <Paper elevation={3} sx={{ borderRadius: "20px", width: "750px", padding: "40px", mx: "auto" }}>
                <Typography variant='h5' sx={{fontWeight: "700", fontSize: "1.8rem", ml: "30px"}}>{t('titre.RedigerReclamation')}</Typography>
                <form style={{ margin: "auto", padding: "15px", width: "650px", alignContent: "center", marginTop: "20px" }} onSubmit={handleAddReclmation} >
                    <Stack spacing={3}>
                        <Typography variant="h6" component="label">
                            {t('table.Sujet')}
                        </Typography>
                        
                        <TextField type='text' id='sujet' name='sujet' onChange={handleInputChange} fullWidth size='small' variant="outlined" />

                        <Typography variant="h6" component="label">
                            {t('table.Description')}
                        </Typography>
                       
                        <TextField type='text' id='description' name='description' onChange={handleInputChange} fullWidth size='small' variant="outlined" />

                        <Typography variant="h6" component="label">
                            {t('table.Statut')}
                        </Typography>
                        
                        <FormControl fullWidth size='small'>
                            <InputLabel id="statut">{t('ChoisirOption')}</InputLabel>
                            <Select label="statut" name='statut' onChange={handleInputChange}>
                                {statuts.map((statut: Statut, index: number) => (
                                <MenuItem key={index} value={t(`statut.${index}.${Object.keys(statut)[0]}`)}>{t(`statut.${index}.${Object.keys(statut)[0]}`)}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <div style={{ display: "flex", justifyContent: "flex-end" }} >
                            <ColorButton type='submit' variant="contained" sx={{ borderRadius: "20px", textDecoration: "none", textTransform: "none", fontWeight: "500", fontSize: "1rem" }} >{t('button.Ajouter')}</ColorButton>
                        </div>
                    </Stack>
                </form>
            </Paper>
        </Stack>
    </>
  )
}

export default AddReclamation