import React, { useEffect, useState } from 'react'
import { useDeleteReclamationMutation, useDetailsReclamationQuery, useListeReclamationsMutation, useUpdateReclamationMutation } from '../../services/reclamationApi';
import { Button, IconButton, TextField, Table, TableBody, TableContainer, TableHead, TableRow, Paper, TableCell, tableCellClasses, Box, Typography, Modal, Dialog, DialogActions, DialogContent, FormControl, InputLabel, Select, MenuItem, Stack } from '@mui/material';
import { toast } from 'react-toastify';
import { styled } from '@mui/material/styles';
import { DeleteOutlined } from '@mui/icons-material';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useConfirm } from "material-ui-confirm";
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
    minWidth: 550,
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
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: "20px",
    boxShadow: 24,
    p: 4,
};

interface Statut {
    [key: string]: string;
};

const initialState = {
    id: "",
    sujet: "",
    description: "",
    statut: "",
};

const ListeReclamations = () => {
    const { t, i18n } = useTranslation();

    const statuts: Statut[] = t('statut', { returnObjects: true });

    // List 
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState<string>("10");

    const pages = ["5", "10", "15", "20", "25", "30"];

    const [listeReclamations, {data: reclamations}] = useListeReclamationsMutation();   


    useEffect(() => {
        const fetchReclamationsData = async () => {
            await listeReclamations({ page, perPage });
        }

        fetchReclamationsData();
    }, [page, perPage]);

    const handlePage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPerPage(e.target.value);
    };


    // Delete
    const confirm = useConfirm();
    const [deleteReclamation] = useDeleteReclamationMutation();

    const handleDelete = (id: any) => {
        confirm({ title: 'Confirmation', description: "Vous êtes sûr de supprimer cette réclamation?",confirmationText: 'Oui', cancellationText: 'Non', confirmationButtonProps: { style: { color: "#E09540" } }, cancellationButtonProps: { style: { color: "#E09540" } } })
          .then( async () => {
            await deleteReclamation(id);
            toast.success("Reclamation supprimée avec succès");
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

    const {data: dataShow, error: errorShow, isFetching: isFetchingShow, isLoading: isLoadingShow} = useDetailsReclamationQuery(idShow!);

    // Modifier
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const handleOpen = (id: any) => {
        setOpen(true);
        setIdShow(id);
    };

    const handleOpenEdit = () => {
        setOpenEdit(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const [formValue, setFormValue] = useState(initialState);

    const [
        updateReclamation,
        {
          data: modifierData,
          isSuccess: isModifierSuccess, 
          isError: isModifierError,
          error: modifierError
        } 
    ] = useUpdateReclamationMutation();

    const {sujet, description, statut} = formValue;

    useEffect(() => {
        if (idShow && dataShow) {
            setFormValue({...dataShow});
        }
    }, [idShow, dataShow]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!sujet && !description && !statut) {
            toast.error("Please provide value into each field");
        }else {
          await updateReclamation(formValue);
          toast.success("Reclamation Updated Successfuly");
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
                {t('titre.Listereclamations')}
            </title>
        </Helmet>
        <Stack spacing={4} sx={{ width: "100%", ml: "40px" }}>

            <h2>{t('titre.Listereclamations')}</h2>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 870, borderRadius: "20px" }} aria-label="simple table">
                    <TableHead >
                        <TableRow>
                            <StyledTableCell align="center">{t('table.Emeteur')}</StyledTableCell>
                            <StyledTableCell align="center">{t('table.Sujet')}</StyledTableCell>
                            <StyledTableCell align="center">{t('table.Statut')}</StyledTableCell>
                            <StyledTableCell align="center">{t('table.Date')}</StyledTableCell>
                            <StyledTableCell align="center">{t('table.Actions')}</StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody sx={{ textWrap: "wrap" }}>
                        {reclamations &&
                        reclamations?.data.map((item: any, index: any) => (
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                            <TableCell align="center" component="th" scope="row">
                                {`${item?.emeteur.lname} ${item?.emeteur.fname}`}
                            </TableCell>
                            <TableCell align="center">{item.sujet}</TableCell>
                            <TableCell align="center"><span>{item.statut} <IconButton onClick={() => handleOpen(item.id)} sx={{ color: "inherit" }} ><MoreVertIcon sx={{ color: "inherit" }} /></IconButton></span></TableCell>
                            <TableCell align="center">
                                {
                                    item.created_at
                                }
                            </TableCell>
                            <TableCell align="center">
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
                    <table width="100%">
                        <tr>
                            <td>
                                <Typography variant="h6" component="label" >
                                    {t('table.Emeteur')}
                                </Typography>  
                            </td>
                            <td>
                                <Typography variant="body1" component="span" >
                                    {dataShow && dataShow.utilisateur_id}
                                </Typography>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Typography variant="h6" component="label" >
                                    {t('table.Sujet')}
                                </Typography>
                            </td>
                            <td>
                                <Typography variant="body1" component="span">
                                    {dataShow && dataShow.sujet}
                                </Typography>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Typography variant="h6" component="label" >
                                    {t('table.Description')}
                                </Typography>
                            </td>
                            <td>
                                <Typography variant="body1" component="span">
                                    {dataShow && dataShow.description}
                                </Typography>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Typography variant="h6" component="label" >
                                    {t('table.Statut')}
                                </Typography>
                            </td>
                            <td>
                                <Typography variant="body1" component="span">
                                    {dataShow && dataShow.statut}
                                </Typography>
                            </td>
                        </tr>
                    </table>
                    <div style={{ display: "flex", justifyContent: "flex-end" }} >
                        <ColorButton onClick={handleCloseShow} variant="contained" sx={{ borderRadius: "20px", textDecoration: "none", textTransform: "none", fontWeight: "500", fontSize: "1rem" }} >{t('button.Fermer')}</ColorButton>
                    </div>
                </Box>
            </Modal>

            {/* Dialog du button modifier */}
            <Dialog open={open} onClose={handleClose}>
                <DialogActions>
                    <Button variant="text" onClick={handleOpenEdit} sx={{ color: "black", textDecoration: "none", textTransform: "none", fontWeight: "500", fontSize: "1rem"}} startIcon={<ModeEditOutlineOutlinedIcon />}>
                        {t('button.Modifierstatut')}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Dialog de form de modification du statut */}
            <Dialog open={openEdit} onClose={handleCloseEdit}>
                <DialogContent>
                    <form style={{ margin: "auto", padding: "15px", maxWidth: "400px", alignContent: "center" }} onSubmit={handleSubmit} >
                        <Typography variant="h6" component="label">
                            {t('table.Statut')}
                        </Typography>
                        <br/><br/>
                        <FormControl fullWidth size='small'>
                            <Select label="statut" name='statut' onChange={handleInputChange} value={statut}>
                                {statuts.map((statut: Statut, index: number) => (
                                <MenuItem key={index} value={t(`statut.${index}.${Object.keys(statut)[0]}`)} >{t(`statut.${index}.${Object.keys(statut)[0]}`)}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <br/><br/>
                        <div style={{ display: "flex", justifyContent: "flex-end" }} >
                        <ColorButton type='submit' variant="contained" sx={{ borderRadius: "20px", textDecoration: "none", textTransform: "none", fontWeight: "500", fontSize: "1rem" }} >{t('button.modifier')}</ColorButton>
                    </div>
            </form>
                </DialogContent>
            </Dialog>
            
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

export default ListeReclamations