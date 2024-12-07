import styled from "@emotion/styled";
import { Box, Button, Card, CardActionArea, Grid, Modal, Stack, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAddGalleryMutation, useDeleteGalleryMutation, useDetailsGalleryQuery, useListeGalleriesQuery, useUpdateGalleryMutation } from "../../../services/galleryApi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { AddOutlined } from "@mui/icons-material";
import { useUploadFileMutation } from "../../../services/cdnApi";
import { useConfirm } from "material-ui-confirm";

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

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    borderRadius: "20px",
    boxShadow: 24,
    p: 4,
};

const initialState = {
    image_path: "",
};

const Gallery = () => {
    const { t, i18n } = useTranslation();

    // liste galleries
    const {data, error} = useListeGalleriesQuery();

    useEffect(() => {
        if(error) {
            toast.error("Something went wrong");
        }
    }, [error]);


    // Ajout
    const [open, setOpen] = useState(false);
    const [formValue, setFormValue] = useState(initialState);

    const handleOpen = () => setOpen(true);
  
    const handleClose = () => setOpen(false);

    const [uploadFile, {data: dataFile}] = useUploadFileMutation();

    const [addGallery] = useAddGalleryMutation();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          uploadFile(e.target.files[0]);
        }
    };

    const {image_path} = formValue;

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await addGallery({...formValue, image_path: dataFile?.url});
        toast.success("Image Added Successfuly");
    };

    // Modifier
    const [openEdit, setOpenEdit] = useState(false);
    const [idEdit, setIdEdit] = useState();

    const handleOpenEdit = (id: any) => {
        setOpenEdit(true);
        setIdEdit(id);
    };
  
    const handleCloseEdit = () => setOpenEdit(false);

    const [updateGallery] = useUpdateGalleryMutation();


    // Détails gallery
    const {data: dataShow} = useDetailsGalleryQuery(idEdit!);

    useEffect(() => {
        if (idEdit && dataShow) {
            setFormValue({...dataShow});
        }
    }, [idEdit, dataShow]);

    const handleEdit = async (e: any) => {
        e.preventDefault();
        const photo = dataFile?.url ? dataFile?.url : image_path;
        await updateGallery({...formValue, image_path: photo});
        toast.success("Image Updated Successfuly");
    };


    // Delete
    const confirm = useConfirm();
    const [deleteGallery] = useDeleteGalleryMutation(); 

    const handleDelete = (id: any) => {
        confirm({ title: 'Confirmation', description: "Vous êtes sûr de supprimer cet image?",confirmationText: 'Oui', cancellationText: 'Non', confirmationButtonProps: { style: { color: "#E09540" } }, cancellationButtonProps: { style: { color: "#E09540" } } })
          .then( async () => {
            await deleteGallery(id);
            toast.success("Image a été supprimé avec succès");
          })
          .catch(() => {});
    };

  return (
    <>
        <Helmet>
            <title>
                {t('titre.Gallery')}
            </title>
        </Helmet>

        <div style={{ marginTop: "20px", marginBottom: "40px" }}>
            <Stack direction="row" spacing={80} sx={{ mb: "25px" }}>
                <h1>{t('titre.Gallery')}</h1>
                <ColorButtonOutlined onClick={handleOpen} variant="outlined" sx={{ mt: "20px", textDecoration: "none", textTransform: "none", fontWeight: "500", fontSize: "1rem" }} startIcon={<AddOutlined />}>
                    {t('button.Ajouter')}
                </ColorButtonOutlined>
            </Stack>

            {/* Modal Ajouter */}
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
                <Box sx={style}>
                    <form style={{ margin: "auto", padding: "15px", alignContent: "center" }} onSubmit={handleSubmit}>
                        <Stack spacing={3}>
                            <Typography variant="h6" component="label">
                                {t('label.Image')}
                            </Typography>
                            
                            <TextField type='file' id='image_path' name='image_path' onChange={handleFileChange} variant="outlined" fullWidth size='small' InputLabelProps={{ shrink: true, }} />
                            
                            <div style={{ display: "flex", justifyContent: "flex-end" }} >
                                <ColorButton type='reset' variant="contained" sx={{ mx: "5px", borderRadius: "20px", textDecoration: "none", textTransform: "none", fontWeight: "500", fontSize: "1rem"}}>{t('button.Annuler')}</ColorButton>
                                <ColorButton type='submit' variant="contained" sx={{ borderRadius: "20px", textDecoration: "none", textTransform: "none", fontWeight: "500", fontSize: "1rem" }} >{t('button.Ajouter')}</ColorButton>
                            </div>
                        </Stack>
                    </form>
                </Box>
            </Modal>

            <Grid container spacing={2} columns={{lg: 12, md: 12, sm: 4, xs: 1}}>
                {data && data?.map((item:any, index: any)  => {
                    return (
                        <Grid item lg={3} md={4} sm={2} xs={1}>
                            <Card sx={{borderRadius: "20px", border: "1px solid black", '&:hover': { backgroundColor: "#FFEEBC" } }} key={index}>
                                <CardActionArea component={Button} onClick={() => handleOpenEdit(item?.id)} sx={{p: "10px", '&:hover': { backgroundColor: "#FFEEBC" } }}>
                                    <Box sx={{height: 0, width: "100%", position: "relative", pb: "70%"}}>
                                        <Box component="img" sx={{ width: "100%", height: "100%", borderRadius: "20px", position: "absolute", top: 0, left: 0 }} src={item?.image_path} alt="green iguana" />
                                    </Box>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    )
                })
                }
            </Grid>

              {/* Modal Modifier et supprimer et Détails */}
              <Modal open={openEdit} onClose={handleCloseEdit} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
                <Box sx={style}>
                    <form style={{ margin: "auto", padding: "15px", alignContent: "center" }} onSubmit={handleEdit}>
                        <Stack spacing={3}>
                            <Typography variant="h6" component="label">
                                {t('label.Image')}
                            </Typography>
                            
                            <Stack spacing={2} sx={{ mt: "10px"}}>
                                <Box component="img" sx={{ width: "315px", height: "150px", borderRadius: "20px", mx: "auto"}} src={dataFile?.url ? dataFile?.url : dataShow?.image_path} alt={image_path} />
                                <TextField type='file' id='image_path' name='image_path' onChange={handleFileChange} variant="outlined" fullWidth size='small' InputLabelProps={{ shrink: true, }} />
                            </Stack>
                            
                            <div style={{ display: "flex", justifyContent: "flex-end" }} >
                                <ColorButton type='reset' variant="contained" sx={{ mx: "5px", borderRadius: "20px", textDecoration: "none", textTransform: "none", fontWeight: "500", fontSize: "1rem"}} onClick={() => handleDelete(dataShow?.id)} >{t('button.Supprimer')}</ColorButton>
                                <ColorButton type='submit' variant="contained" sx={{ borderRadius: "20px", textDecoration: "none", textTransform: "none", fontWeight: "500", fontSize: "1rem" }} >{t('button.modifier')}</ColorButton>
                            </div>
                        </Stack>
                    </form>
                </Box>
            </Modal>
        </div>
    </>
  )
}

export default Gallery