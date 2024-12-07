import React, { useEffect, useState } from 'react'
import { useDeleteUserMutation, useDetailsUserQuery, useListeArtisansMutation, useUpdateArtisanClientMutation } from '../../../services/userApi';
import { Button, TextField, Table, TableBody, TableContainer, TableHead, TableRow, Paper, TableCell, tableCellClasses, Box, Typography, Modal, Avatar, IconButton, InputAdornment, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { toast } from 'react-toastify';
import { DeleteOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { useConfirm } from 'material-ui-confirm';
import { useUploadFileMutation } from '../../../services/cdnApi';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#FFEEBC",
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.common.white,
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
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: "20px",
    boxShadow: 24,
    p: 4,
};

const styleEdit = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    height: 500,
    overflowY: 'auto',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    borderRadius: "20px",
    boxShadow: 24,
    p: 4,
};

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

const ListeArtisans = () => {
    const { t, i18n } = useTranslation();

    // List
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState<string>("10");

    const pages = ["5", "10", "15", "20", "25", "30"];

    const [listeArtisans, {data : artisans}] = useListeArtisansMutation();

    useEffect(() => {
        const fetchArtisansData = async () => {
            await listeArtisans({ page, perPage });
        }

        fetchArtisansData();
    }, [page, perPage]);

    const handlePage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPerPage(e.target.value);
    };


    // Delete
    const confirm = useConfirm();
    const [deleteUser] = useDeleteUserMutation();

    const handleDelete = (id: any) => {
        confirm({ title: 'Confirmation', description: "Vous êtes sûr de supprimer ce artisan?",confirmationText: 'Oui', cancellationText: 'Non', confirmationButtonProps: { style: { color: "#E09540" } }, cancellationButtonProps: { style: { color: "#E09540" } } })
          .then( async () => {
            await deleteUser(id);
            toast.success("Artisan a été supprimer avec succès");
          })
          .catch(() => {});
    };


    // Détails
    const [idShow, setIdShow] = useState();
    const [openShow, setOpenShow] = useState(false);

    const handleOpenShow = (id: any) => {
        setOpenShow(true);
        setIdShow(id);
    };
   
    const handleCloseShow = () => setOpenShow(false);

    const {data: dataShow, error: errorShow, isFetching: isFetchingShow, isLoading: isLoadingShow} = useDetailsUserQuery(idShow!);


    // Modifier
    const [openEdit, setOpenEdit] = useState(false);

    const handleOpenEdit = (id: any) => {
        setOpenEdit(true);
        setIdShow(id);
    };
   
    const handleCloseEdit = () => setOpenEdit(false);

    const [formValue, setFormValue] = useState(initialState);

    const [
        updateArtisanClient,
        {
            data: modifierData,
            isSuccess: isModifierSuccess, 
            isError: isModifierError,
            error: modifierError
        } 
    ] = useUpdateArtisanClientMutation();

    const [uploadFile, {data}] = useUploadFileMutation();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          uploadFile(e.target.files[0]);
        }
    };

    const {fname, lname, telephone, adresse, ville,profil, email,role} = formValue;

    useEffect(() => {
        if (idShow && dataShow) {
            setFormValue({...dataShow});
        }
    }, [idShow, dataShow]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const profile = data?.url ? data?.url : profil;
        if (!fname && !lname && !telephone && ! adresse && !ville && !email) {
            toast.error("Please provide value into each field");
        }else {
            await updateArtisanClient({...formValue, profil: profile, role: "artisan"});
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
                {t('titre.ListeArtisans')}
            </title>
        </Helmet>
        <Stack spacing={4} sx={{ width: "100%", ml: "40px" }}>

            <h2>{t('titre.ListeArtisans')}</h2>
            
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 850, borderRadius: "20px" }} aria-label="simple table">
                    <TableHead >
                        <TableRow>
                            <StyledTableCell align="center">{t('table.Photo')}</StyledTableCell>
                            <StyledTableCell align="center">{t('table.prenom')}</StyledTableCell>
                            <StyledTableCell align="center">{t('table.nom')}</StyledTableCell>
                            <StyledTableCell align="center">{t('table.Actions')}</StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {artisans && artisans?.data.map((item: any, index: any)  => (
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                <TableCell align="center" component="th" scope="row">
                                    <Avatar src={item.profil} alt={item.fname} />
                                </TableCell>
                                <TableCell align="center">{item.fname}</TableCell>
                                <TableCell align="center">{item.lname}</TableCell>
                                <TableCell align="center">
                                    <ColorButtonOutlined variant="outlined" onClick={() => handleOpenEdit(item.id)} sx={{ mr:"10px", textDecoration: "none", textTransform: "none", fontWeight: "500", fontSize: "1rem" }} startIcon={<ModeEditOutlineOutlinedIcon />}>
                                        {t('button.modifier')}
                                    </ColorButtonOutlined>  
                                    <ColorButtonOutlined variant="outlined" onClick={() => handleDelete(item.id)} sx={{ mx:"auto", textDecoration: "none", textTransform: "none", fontWeight: "500", fontSize: "1rem" }} startIcon={<DeleteOutlined />}>
                                        {t('button.Supprimer')}
                                    </ColorButtonOutlined>
                                    <ColorButtonOutlined variant="outlined" onClick={() => handleOpenShow(item.id)} sx={{ marginLeft: "10px", textDecoration: "none", textTransform: "none", fontWeight: "500", fontSize: "1rem" }} startIcon={<MoreVertIcon />}>
                                        {t('button.Details')}
                                    </ColorButtonOutlined>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modal Details */}
            <Modal open={openShow} onClose={handleCloseShow} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
                <Box sx={style}>
                    <table width="90%">
                        <tr>
                            <td align='center' colSpan={2}>
                                <Avatar src={dataShow && dataShow.profil} alt={dataShow && dataShow.fname} sx={{ width: "90px", height: "90px", mb: "20px"}} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Typography variant="h6" component="label" >
                                    {t('table.nom')}
                                </Typography>
                            </td>
                            <td>
                                <Typography variant="body1" component="span">
                                    {dataShow && dataShow.lname}
                                </Typography>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Typography variant="h6" component="label" >
                                    {t('table.prenom')}
                                </Typography>
                            </td>
                            <td>
                                <Typography variant="body1" component="span">
                                    {dataShow && dataShow.fname}
                                </Typography>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Typography variant="h6" component="label" >
                                    {t('table.telephone')}
                                </Typography>
                            </td>
                            <td>
                                <Typography variant="body1" component="span">
                                    {dataShow && dataShow.telephone}
                                </Typography>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Typography variant="h6" component="label" >
                                    {t('table.Adresse')}
                                </Typography>
                            </td>
                            <td>
                                <Typography variant="body1" component="span">
                                    {dataShow && dataShow.adresse}
                                </Typography>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Typography variant="h6" component="label" >
                                    {t('table.Ville')}
                                </Typography>
                            </td>
                            <td>
                                <Typography variant="body1" component="span">
                                    {dataShow && dataShow.ville}
                                </Typography>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Typography variant="h6" component="label" >
                                    {t('table.AdresseEmail')}
                                </Typography>
                            </td>
                            <td>
                                <Typography variant="body1" component="span">
                                    {dataShow && dataShow.email}
                                </Typography>
                            </td>
                        </tr>
                    </table>
                    <div style={{ display: "flex", justifyContent: "flex-end" }} >
                        <ColorButton onClick={handleCloseShow} variant="contained" sx={{ borderRadius: "20px", textDecoration: "none", textTransform: "none", fontWeight: "500", fontSize: "1rem" }} >{t('button.Fermer')}</ColorButton>
                    </div>
                </Box>
            </Modal>

            {/* Modal Modifier */}
            <Modal open={openEdit} onClose={handleCloseEdit} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
                <Box sx={styleEdit}>
                    <Typography variant='h5' sx={{fontWeight: "700", fontSize: "1.8rem"}}>{t('titre.Artisan')}</Typography>
                    <form style={{ margin: "auto", padding: "15px", maxWidth: "400px", alignContent: "center", marginTop: "20px" }} onSubmit={handleSubmit} >
                        <Stack spacing={3}>
                            <Stack direction="row" spacing={2} sx={{ mt: "10px", mb: "10px" }}>
                                <Avatar src={data?.url ? data?.url : profil} alt={fname} sx={{ width: "60px", height: "60px"}} />
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
                                {t('table.Adresse')}
                            </Typography>
                            
                            <TextField type='text' id='adresse' name='adresse' value={adresse} onChange={handleInputChange} fullWidth size='small' variant="outlined" />
                            
                            <Typography variant="h6" component="label">
                                {t('table.Ville')}
                            </Typography>
                            
                            <TextField type='text' id='ville' name='ville' value={ville} onChange={handleInputChange} fullWidth size='small' variant="outlined" />
                            
                            <Typography variant="h6" component="label">
                                {t('table.AdresseEmail')}
                            </Typography>
                            
                            <TextField type='email' id='email' name='email' value={email} onChange={handleInputChange} fullWidth size='small' variant="outlined" />

                            <div style={{ display: "flex", justifyContent: "flex-end" }} >
                                <ColorButton type='reset' onClick={handleCloseEdit} variant="contained" sx={{ mx: "5px", borderRadius: "20px", textDecoration: "none", textTransform: "none", fontWeight: "500", fontSize: "1rem"}}>{t('button.Annuler')}</ColorButton>
                                <ColorButton type='submit' variant="contained" sx={{ borderRadius: "20px", textDecoration: "none", textTransform: "none", fontWeight: "500", fontSize: "1rem" }} >{t('button.modifier')}</ColorButton>
                            </div>
                        </Stack>
                    </form>
                </Box>
            </Modal>   

            <Stack direction="row" spacing={3}>
                <ColorButton variant="contained" sx={{ borderRadius: "20px", textDecoration: "none", textTransform: "none", fontWeight: "500", fontSize: "1rem" }} onClick={() => setPage((page) => page - 1)} disabled={page === 1 ? true : false} >
                    {t('button.Precedent')}
                </ColorButton>
                <p style={{ marginTop: "5px" }}>{page}</p>
                <ColorButton variant="contained" sx={{ borderRadius: "20px", textDecoration: "none", textTransform: "none", fontWeight: "500", fontSize: "1rem" }} onClick={() => setPage((page) => page + 1)}>
                    {t('button.Suivant')}
                </ColorButton>
                <div>
                    <span style={{ marginTop: "8px" }}>{t('text.Par page')} : </span>
                    <select value={perPage} onChange={handlePage}>
                        {pages.map((page, index) => (
                            <option key={index}>{page}</option>
                        ))}
                    </select>
                </div>
            </Stack>
        </Stack>
    </>
  )
}

export default ListeArtisans;