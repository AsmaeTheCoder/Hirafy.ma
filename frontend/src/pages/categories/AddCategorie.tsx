import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAddCategorieMutation } from '../../services/categorieApi';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { useUploadFileMutation } from '../../services/cdnApi';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const initialState = {
    id: "",
    libelle: "",
    image: "",
};

const ColorButton = styled(Button)(({ theme }) => ({
    color: "white",
    backgroundColor: "#E09540",
    '&:hover': {
        backgroundColor: "#E09540",
    }
}));

const AddCategorie = () => {
    const { t, i18n } = useTranslation();

    const [formValue, setFormValue] = useState(initialState);

    const [uploadFile, {data}] = useUploadFileMutation();

    const [addCategorie] = useAddCategorieMutation();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          uploadFile(e.target.files[0]);
        }
    };

    const {libelle, image} = formValue;

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!libelle && !image) {
            toast.error("Please provide value into each field");
        }else {
            await addCategorie({...formValue, image: data?.url});
            toast.success("Contact Added Successfuly");
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
                {t('titre.titeAddCategorie')}
            </title>
        </Helmet>
        <div>

            <Typography variant='h5' sx={{fontWeight: "700", fontSize: "1.8rem"}}>{t('titre.Categorie')}</Typography>
            <form style={{ margin: "auto", padding: "15px", maxWidth: "400px", alignContent: "center", marginTop: "20px" }} onSubmit={handleSubmit} >
                <Stack spacing={3}>
                    <Typography variant="h6" component="label">
                        {t('label.Libelle')}
                    </Typography>

                    <TextField type='text' id='libelle' name='libelle' onChange={handleInputChange} fullWidth size='small' variant="outlined" />
                    
                    <Typography variant="h6" component="label">
                        {t('label.Image')}
                    </Typography>
                    
                    <Stack direction="row" spacing={2} sx={{ mt: "10px"}}>
                        {data?.url && <Box component="img" sx={{ width: "80px", height: "80px", borderRadius: "40px"}} src={data?.url} />}                    
                        <TextField type='file' id='image' name='image' onChange={handleFileChange} variant="outlined" fullWidth size='small' InputLabelProps={{ shrink: true, }} />
                    </Stack>
                    
                    <div style={{ display: "flex", justifyContent: "flex-end" }} >
                        <ColorButton type='reset' variant="contained" sx={{ mx: "5px", borderRadius: "20px", textDecoration: "none", textTransform: "none", fontWeight: "500", fontSize: "1rem"}}>{t('button.Annuler')}</ColorButton>
                        <ColorButton type='submit' variant="contained" sx={{ borderRadius: "20px", textDecoration: "none", textTransform: "none", fontWeight: "500", fontSize: "1rem" }} >{t('button.Ajouter')}</ColorButton>
                    </div>
                </Stack>
            </form>
        </div>
    </>
  )
}

export default AddCategorie;