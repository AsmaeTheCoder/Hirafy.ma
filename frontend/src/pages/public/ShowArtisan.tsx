import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useShowArtisanQuery } from '../../services/artisanApi';
import { toast } from 'react-toastify';
import { Avatar, Button, Divider, Paper, Rating, Typography, Box, Modal, Grid, CardActionArea, Card, Stack, IconButton, Chip, Tooltip, Collapse } from '@mui/material';
import styled from '@emotion/styled';
import { useAddReviewMutation, useDeleteReviewMutation, useDetailsReviewsQuery, useListeReviewsByArtisanMutation, useUpdateReviewMutation } from '../../services/reviewApi';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { useConfirm } from 'material-ui-confirm';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const ColorButton = styled(Button)(() => ({
    color: "white",
    backgroundColor: "#E09540",
    '&:hover': {
        backgroundColor: "#E09540",
    }
}));

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: "20px",
    boxShadow: 24,
    p: 4,
};

const initialState = {
    id: "",
    artisan_id: "",
    Contenu: "",
    etoile: 0,
};

const ShowArtisan = () => {
    const { t, i18n } = useTranslation();

    const user = useAppSelector((state: RootState) => state.auth.user);
    console.log(user?.id);
    

    // Détails Artisan
    const {id} = useParams();    

    const {data, error, isFetching, isLoading} = useShowArtisanQuery(id, {
        skip: !id
    });

    console.log(data?.profil);
    
 
    useEffect(() => {
        if(error) {
            toast.error("Something went wrong");
        }
    }, [error]);


    // List Reviews
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState<string>("10");

    const pages = ["5", "10", "15", "20", "25", "30"];

    const [listeReviewsByArtisan, {data: reviews}] = useListeReviewsByArtisanMutation();

    useEffect(() => {
        const fetchReviewsByArtisanData = async () => {
            await listeReviewsByArtisan({ id, page, perPage });
        }

        fetchReviewsByArtisanData();
    }, [page, perPage]);

    const handlePage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPerPage(e.target.value);
    };


    // Ajout Review
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const [formValue, setFormValue] = useState(initialState);

    const [addReview] = useAddReviewMutation();

    const {Contenu, etoile} = formValue;



    const handleInputChange = (e : any) => {
        let { name, value } = e.target;
        setFormValue({ ...formValue, [name]:value});
    }; 


    // Modifier review
    const [idEdit, setIdEDit] = useState();
    const handleOpenEdit = (id: any) => {
        setIdEDit(id);
        setOpen(true);
    }

    const handleCloseEdit = () => setOpen(false);

    const [editMode, setEditMode] = useState(false);

    const [updateReview] = useUpdateReviewMutation();

    const {data: dataShow, error: errorShow, isFetching: isFetchingShow, isLoading: isLoadingShow} = useDetailsReviewsQuery(idEdit!);

    useEffect(() => {
        if (idEdit) {
            setEditMode(true);
            if(dataShow) {
                setFormValue({...dataShow});
            }
        }else {
            setEditMode(false);
            setFormValue({...initialState});
        }
    }, [idEdit, dataShow]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!Contenu && !etoile && !id) {
            toast.error("Please provide value into each field");
        }else {
            if (!editMode) {
                await addReview({...formValue, artisan_id: id as string});
                toast.success("Contact Added Successfuly");
            } else {
                await updateReview({...formValue, artisan_id: id as string});
                setEditMode(false);
                toast.success("Contact Updated Successfuly");
            }
        }
    };


    // Supprimer review
    const confirm = useConfirm();
    const [deleteReview] = useDeleteReviewMutation();

    const handleDelete = (id: any) => {
        confirm({ title: 'Confirmation', description: "Vous êtes sûr de supprimer cet avis?",confirmationText: 'Oui', cancellationText: 'Non', confirmationButtonProps: { style: { color: "#E09540" } }, cancellationButtonProps: { style: { color: "#E09540" } } })
          .then( async () => {
            await deleteReview(id);
            toast.success("Avis a été supprimé avec succès");
          })
          .catch(() => {});
    };



  return (
    <>
        <Helmet>
            <title>
                {t('titre.DetailsArtisan')}   
            </title>
        </Helmet>
        <Stack spacing={4} sx={{ width: "100%" }}>

            <Paper elevation={3} sx={{ borderRadius: "20px", display: "flex", width: "990px", height: "140px", mt: "-10px" }}>
                <Avatar alt={`${data?.lname} ${data?.fname}`} src={data?.profil} sx={{ width: "112px", height: "112px", my: "auto", ml: "20px" }}  />
                <Typography component="div" sx={{ my: "auto", ml: "30px" }}>
                <h2 style={{ marginBottom: "3px", marginTop: "-2px" }}>{`${data?.lname} ${data?.fname}`}</h2>
                <Typography component="label" variant='h5' sx={{ color: "#E09540" }}>{data?.category}</Typography>
                <Typography component="div" variant='h6' sx={{ color: "#595454" }}>{data?.ville}</Typography>
                </Typography>
            </Paper>
            <br/>

            <Paper elevation={3} sx={{ borderRadius: "20px", width: "990px", height: "250px", mt: "-10px" }}>
                <Stack>
                    <div style={{ display: "flex" }}>
                        <h2 style={{ marginLeft: "40px", marginTop: "20px" }}>{t('titre.InformationsPersonnelles')}</h2>
                    </div>
                    
                    <Typography component="div" sx={{ display: "flex", justifyContent: "space-around" }}>
                        <span>
                            <Typography component="label" variant='h5' sx={{ color: "#8E8989" }}>{t('table.nom')}</Typography>
                            <Typography component="div" variant='h6'>{data?.lname}</Typography>
                        </span>
                        <span>
                            <Typography component="label" variant='h5' sx={{ color: "#8E8989" }}>{t('table.prenom')}</Typography>
                            <Typography component="div" variant='h6'>{data?.fname}</Typography>
                        </span>
                        <span>
                            <Typography component="label" variant='h5' sx={{ color: "#8E8989" }}>{t('table.Ville')}</Typography>
                            <Typography component="div" variant='h6'>{data?.ville}</Typography>
                        </span>
                        <span>
                            <Typography component="label" variant='h5' sx={{ color: "#8E8989" }}>{t('table.Metier')}</Typography>
                            <Typography component="div" variant='h6'>{data?.category}</Typography>
                        </span>
                    </Typography>
                    <Typography component="div" sx={{ mt: "29px", display: "flex", justifyContent: "space-around"  }}>
                        <span>
                            <Typography component="label" variant='h5' sx={{ color: "#8E8989" }}>{t('table.AdresseEmail')}</Typography>
                            <Typography component="div" variant='h6'>{data?.email}</Typography>
                        </span>
                        <span>
                            <Typography component="label" variant='h5' sx={{ color: "#8E8989" }}>{t('table.telephone')}</Typography>
                            <Typography component="div" variant='h6'>{data?.telephone}</Typography>
                        </span>
                        <span>
                            <Typography component="label" variant='h5' sx={{ color: "#8E8989" }}>{t('table.Adresse')}</Typography>
                            <Typography component="div" variant='h6' sx={{ color: "black" }}>{data?.Adresse}</Typography>
                        </span>
                    </Typography>
                </Stack>

            </Paper>
            <br/>

            <Paper elevation={3} sx={{ borderRadius: "20px", width: "990px", minHeight: "250px", mt: "-10px" }}>
                <div>
                    <div style={{ display: "flex" }}>
                        <h2 style={{ marginLeft: "40px", marginTop: "20px" }}>{t('table.Galerie')}</h2>
                    </div>
                    <div>
                    <Grid container spacing={2} columns={{lg: 12, md: 12, sm: 4, xs: 1}} sx={{ ml: "20px" }}>
                        {data?.images.map((item: any, index: any) => {
                            return (
                                <Grid item lg={3} md={4} sm={2} xs={1}>
                                    <Card sx={{ width: "200px", borderRadius: "20px", '&:hover': { backgroundColor: "#FFEEBC" } }} key={index}>
                                        <CardActionArea sx={{'&:hover': { backgroundColor: "#FFEEBC" } }}>
                                            <Box sx={{height: 0, width: "100%", position: "relative", pb: "50%"}}>
                                                <Box component="img" sx={{ width: "100%", height: "100%", borderRadius: "20px", position: "absolute", top: 0, left: 0 }} src={item?.image_path} alt="green iguana" />
                                            </Box>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>
                    </div>
                </div>
            </Paper>
            <br/>

            <Paper elevation={3} sx={{ borderRadius: "20px", width: "990px", minHeight: "250px", mt: "-10px" }}>
                <div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h2 style={{ marginLeft: "40px", marginTop: "20px" }}>{t('table.Avis')}</h2>
                        <ColorButton variant="contained" onClick={handleOpen} size='small' sx={{ mt: "20px", mr: "30px", borderRadius: "20px", textDecoration: "none", textTransform: "none", fontWeight: "500", fontSize: "1.0rem" }}>{t('button.Redigeravis')}</ColorButton>
                    </div>
                    <Stack>
                        {reviews && 
                            reviews?.data.map((item: any, index: any) => {
                                return (
                                    item.client_id === user?.id && 
                                    <Stack direction="row" spacing={5}>
                                    <Stack style={{ marginLeft: "40px", marginTop: "30px" }}>
                                            <span style={{ display: "flex" }}>
                                                <Avatar alt={`${item?.client.lname} ${item?.client.fname}`} src={item?.client.profil} /> 
                                                <Stack direction="row" spacing={2} sx={{ my: "auto", ml: "30px"}}>
                                                    <Stack spacing={3}>
                                                        {`${item?.client.lname} ${item?.client.fname}`}
                                                        <Rating name="read-only" size='small' value={item.etoile} readOnly />
                                                    </Stack>
                                                    <span style={{ color: "#8E8989" }}>
                                                        {item.created_at} 
                                                    </span> 
                                                </Stack>
                                            </span>
                                            <Typography variant='subtitle1' gutterBottom sx={{ mt: "15px" }} >
                                                {item.Contenu}
                                            </Typography>
                                    </Stack>
                                    <div>
                                        <Tooltip title={t('button.modifier')}>
                                            <IconButton onClick={() => handleOpenEdit(item.id)} >
                                                <EditOutlinedIcon sx={{ mt: "20px", mr: "10px", color: "#E09540", fontSize: "26px" }} />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title={t('button.Supprimer')}>
                                            <IconButton onClick={() => handleDelete(item.id)}>
                                                <DeleteOutlineOutlinedIcon sx={{ mt: "20px", mr: "30px", color: "#E09540", fontSize: "26px" }} />
                                            </IconButton>
                                        </Tooltip>
                                        
                                    </div>
                                </Stack>
                                )
                            })
                        }
                    </Stack>
                    <Stack sx={{ mt: "20px", mb: "30px" }}>
                        {reviews &&
                        reviews?.data.map((item: any, index: any) => {
                            return (
                                <span>
                                    <Stack style={{ marginLeft: "40px", marginTop: "20px" }}>
                                        <span>
                                            <span style={{ display: "flex" }}>
                                                <Avatar alt={`${item?.client.lname} ${item?.client.fname}`} src={item?.client.profil} /> 
                                                <Typography component="div" sx={{ my: "auto", ml: "30px", display: "flex" }}>
                                                    <span>
                                                        {`${item?.client.lname} ${item?.client.fname}`} 
                                                        <br/>
                                                        <Rating name="read-only" size='small' value={item.etoile} readOnly />
                                                    </span>
                                                    <span style={{ color: "#8E8989" }}>
                                                        {item.created_at} 
                                                    </span> 
                                                </Typography>
                                            </span>
                                            <Typography variant='subtitle1' gutterBottom sx={{ mt: "10px" }} >
                                                {item.Contenu}
                                            </Typography>
                                        </span>
                                    </Stack>
                                    <Divider sx={{ width: "97%", mx: "auto" }}/>
                                </span>
                            )
                        })
                        }
                        
                    </Stack>
                </div>
            </Paper>

            {/* Modal Ajouter */}
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
                <Box sx={style}>
                    <Typography component="div" sx={{ display: "flex", mt: "10px", ml: "20px" }}>
                        <Avatar alt={`${user?.lname} ${user?.fname}`} src="/static/images/avatar/1.jpg"  /> 
                        <h2 style={{ marginBottom: "3px", marginTop: "-2px", marginLeft: "20px" }}>
                            {`${user?.lname} ${user?.fname}`}
                        </h2>             
                    </Typography>
                    <form onSubmit={handleSubmit} style={{ marginTop: "20px", marginLeft: "20px" }}>
                        <Rating name="etoile" value={etoile} size='large' onChange={handleInputChange} />
                        <br/><br/>
                        <textarea name='Contenu' value={Contenu || ""} cols={45} rows={6} style={{ borderRadius: "6px", padding: "8px", marginLeft: "auto", marginRight: "auto" }} onChange={handleInputChange} placeholder="Décrivez votre expérience" />
                        <br/>
                        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }} >
                            <ColorButton type='submit' variant="contained" sx={{ borderRadius: "20px", textDecoration: "none", textTransform: "none", fontWeight: "500", fontSize: "1.0rem" }}>
                                {idEdit ? "Modifier" : "Publier"}
                            </ColorButton>
                        </div>
                    </form>
                </Box>
            </Modal>
        </Stack>
    </>
  )
}

export default ShowArtisan