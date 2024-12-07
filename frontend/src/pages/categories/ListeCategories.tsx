import { useEffect, useState } from 'react'
import { useDeleteCategorieMutation, useDetailsCategorieQuery, useListeCategoriesMutation, useUpdateCategorieMutation } from '../../services/categorieApi';
import { toast } from 'react-toastify';
import { Button, TextField, Table, TableBody, TableContainer, TableHead, TableRow, Paper, TableCell, tableCellClasses, Avatar, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AddOutlined, DeleteOutlined } from '@mui/icons-material';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddCategorie from './AddCategorie';
import { useConfirm } from 'material-ui-confirm';
import { useUploadFileMutation } from '../../services/cdnApi';
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
  
const initialState = {
    id: "",
    libelle: "",
    image: "",
};

const ListeCategories = () => {
    const { t, i18n } = useTranslation();

    // Liste
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState<string>("10");

    const pages = ["5", "10", "15", "20", "25", "30"];

    const [listeCategories, {data : categories}] = useListeCategoriesMutation();

    useEffect(() => {
        const fetchCategoriesData = async () => {
            await listeCategories({ page, perPage });
        }

        fetchCategoriesData();
    }, [page, perPage]);

    const handlePage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPerPage(e.target.value);
    };

    // Ajout
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);


    //Delete
    const confirm = useConfirm();
    const [deleteCategorie] = useDeleteCategorieMutation();

    const handleDelete = (id: any) => {
        confirm({ title: 'Confirmation', description: "Vous êtes sûr de supprimer cette catégorie?",confirmationText: 'Oui', cancellationText: 'Non', confirmationButtonProps: { style: { color: "#E09540" } }, cancellationButtonProps: { style: { color: "#E09540" } } })
          .then( async () => {
            await deleteCategorie(id);
            toast.success("Catégorie a été supprimé avec succès");
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
 
    const {data: dataShow, error: errorShow, isFetching: isFetchingShow, isLoading: isLoadingShow} = useDetailsCategorieQuery(idShow!);


    // Modifier
    const [openEdit, setOpenEdit] = useState(false);

    const handleOpenEdit = (id: any) => {
        setOpenEdit(true);
        setIdShow(id);
    };
   
    const handleCloseEdit = () => setOpenEdit(false);

    const [formValue, setFormValue] = useState(initialState);

    const [updateCategorie] = useUpdateCategorieMutation();

    const [uploadFile, {data}] = useUploadFileMutation();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          uploadFile(e.target.files[0]);
        }
    };

    const {libelle, image} = formValue;

    useEffect(() => {
        if (idShow && dataShow) {
            setFormValue({...dataShow});
        }
    }, [idShow, dataShow]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const photo = data?.url ? data?.url : image;
        if (!libelle && !image) {
            toast.error("Please provide value into each field");
        }else {
            await updateCategorie({...formValue, image: photo});
            toast.success("Contact Updated Successfuly")
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
                {t('titre.Listecategorie')}
                
            </title>
        </Helmet>
        <Stack spacing={4} sx={{ width: "100%", ml: "40px" }}>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>
                    {t('titre.Listedescategories')}
                </h2>

                <ColorButtonOutlined variant="outlined" size='small' onClick={handleOpen} sx={{ mt: "20px", textDecoration: "none", textTransform: "none", fontWeight: "500", fontSize: "1rem" }} startIcon={<AddOutlined />}>
                    {t('titre.titeAddCategorie')}
                </ColorButtonOutlined>
            </div>
            <br/>

            {/* Modal Ajouter */}
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
                <Box sx={style}>
                    <AddCategorie/>
                </Box>
            </Modal>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 850, borderRadius: "20px" }} aria-label="simple table">
                    <TableHead >
                        <TableRow>
                            <StyledTableCell align="center">{t('table.Photo')}</StyledTableCell>
                            <StyledTableCell align="center">{t('label.Libelle')}</StyledTableCell>
                            <StyledTableCell align="center">{t('table.Actions')}</StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {categories &&
                        categories?.data.map((item: any, index: any)  => (
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                            <TableCell align="center" component="th" scope="row">
                                <Box component="img" sx={{ width: "70px", height: "70px", borderRadius: "35px"}} src={item.image} alt={item.libelle} />
                            </TableCell>
                            <TableCell align="center">{item.libelle}</TableCell>
                            <TableCell align="center">
                                <ColorButtonOutlined variant="outlined" onClick={() => handleOpenEdit(item.id)} sx={{ mr: "10px", textDecoration: "none", textTransform: "none", fontWeight: "500", fontSize: "1rem" }} startIcon={<ModeEditOutlineOutlinedIcon />}>
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
                    <Stack spacing={4} justifyContent="center" alignItems="center" >
                        <Box component="img" sx={{ width: "90px", height: "90px", borderRadius: "45px", mb: "30px"}} src={image} alt="green iguana" />
                        <Typography variant="body1" component="span">
                            {dataShow && dataShow.libelle}
                        </Typography>
                    </Stack>
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "9px" }} >
                        <ColorButton onClick={handleCloseShow} variant="contained" sx={{ borderRadius: "20px", textDecoration: "none", textTransform: "none", fontWeight: "500", fontSize: "1rem" }} >
                            {t('button.Fermer')}
                        </ColorButton>
                    </div>
                </Box>
            </Modal>

            {/* Modal Modifier */}
            <Modal open={openEdit} onClose={handleCloseEdit} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
                <Box sx={style}>
                    <Typography variant='h5' sx={{fontWeight: "700", fontSize: "1.8rem"}}>{t('titre.Categorie')}</Typography>
                    <form style={{ margin: "auto", padding: "15px", maxWidth: "400px", alignContent: "center", marginTop: "20px" }} onSubmit={handleSubmit} >
                        <Stack spacing={4}>
                            <Typography variant="h6" component="label">
                                {t('label.Libelle')}
                            </Typography>
                            
                            <TextField type='text' id='libelle' name='libelle' value={libelle} onChange={handleInputChange} fullWidth size='small' variant="outlined" />
                            
                            <Stack direction="row" spacing={2} sx={{ mt: "10px"}}>
                                <Box component="img" sx={{ width: "70px", height: "70px", borderRadius: "35px"}} src={data?.url ? data?.url : image} alt={image} />
                                <TextField type='file' id='image' name='image' onChange={handleFileChange} fullWidth size='small' variant="outlined" InputLabelProps={{ shrink: true, }} />
                            </Stack>

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

export default ListeCategories