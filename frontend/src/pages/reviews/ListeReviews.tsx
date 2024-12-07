import React, { useEffect, useState } from 'react'
import { useDeleteReviewMutation, useDetailsReviewsQuery, useListeReviewsMutation } from '../../services/reviewApi';
import { Link } from 'react-router-dom';
import { Avatar, Box, Button, FormControl, MenuItem, Modal, Paper, Rating, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, tableCellClasses } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { toast } from 'react-toastify';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#FFEEBC",
      color: "black",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));

const ColorButton = styled(Button)(({ theme }) => ({
    color: "white",
    backgroundColor: "#E09540",
    '&:hover': {
        backgroundColor: "#E09540",
    }
}));

const ColorButtonOutlined = styled(Button)(() => ({
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

const ListeReviews = () => {
    const { t, i18n } = useTranslation();

    // Liste
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState<string | number>("10");

    const pages = ["5", "10", "15", "20", "25", "30"];

    const [listeReviews, {data: reviews}] = useListeReviewsMutation();

    const [deleteReview] = useDeleteReviewMutation();

    useEffect(() => {
        const fetchReviewsData = async () => {
            await listeReviews({ page, perPage });
        }

        fetchReviewsData();
    }, [page, perPage]);

    const handlePage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPerPage(e.target.value);
    };

    // Détails
    const [idShow, setIdShow] = useState();
    const [openShow, setOpenShow] = useState(false);

    const handleOpenShow = (id: any) => {
        setOpenShow(true);
        setIdShow(id);
    };

    const handleCloseShow = () => setOpenShow(false);

    const {data: dataShow} = useDetailsReviewsQuery(idShow!)


  return (
    <>
        <Helmet>
            <title>
                {t('titre.ListeReviews')}
            </title>
        </Helmet>

        <Stack spacing={4} sx={{ width: "100%", ml: "40px" }}>
            <h2>{t('titre.ListeReviews')}</h2>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 850, borderRadius: "20px" }} aria-label="simple table">
                    <TableHead >
                        <TableRow>
                            <StyledTableCell align="center">{t('titre.Artisan')}</StyledTableCell>
                            <StyledTableCell align="center">{t('table.Etoile')}</StyledTableCell>
                            <StyledTableCell align="center">{t('titre.Client')}</StyledTableCell>
                            <StyledTableCell align="center">{t('table.Date')}</StyledTableCell>
                            <StyledTableCell align="center">{t('table.Actions')}</StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {reviews && reviews?.data.map((item: any, index: any)  => (
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                            <TableCell align="center" component="th" scope="row">
                                {item?.artisan.fname} {item?.artisan.lname}
                            </TableCell>
                            <TableCell align="center"><Rating name="read-only" size='small' value={item.etoile} readOnly /> </TableCell>
                            <TableCell align="center">{item?.client.fname} {item?.client.lname}</TableCell>
                            <TableCell align="center">{item.created_at}</TableCell>
                            <TableCell align="center">
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
                <Stack spacing={2} sx={style}>
                    <Typography variant='h6'>Le client qui fait l'avis :</Typography>
                    <Stack direction="row" spacing={2} sx={{ mt: "10px" }}>
                        <Avatar src={dataShow?.client?.profil} /> <Typography variant="body1" sx={{ mt: "10px" }}>{dataShow?.client?.fname} {dataShow?.client?.lname} </Typography>
                    </Stack>
                    <Typography variant='h6'>L'artisan :</Typography>
                    <Stack direction="row" spacing={2} sx={{ mt: "10px" }}>
                        <Avatar src={dataShow?.artisan?.profil} /> <Typography variant="body1" sx={{ mt: "10px" }}>{dataShow?.artisan?.fname} {dataShow?.artisan?.lname} </Typography>
                    </Stack>
                    <Typography variant='h6'>Avis :</Typography>
                    <Stack spacing={2} sx={{ mt: "10px" }}>
                        <Typography variant="body1" sx={{ mt: "10px" }}>{dataShow && dataShow.Contenu}</Typography>
                        <Rating name="read-only" size='small' value={dataShow?.etoile} readOnly />
                    </Stack>
                    <div style={{ display: "flex", justifyContent: "flex-end" }} >
                        <ColorButton onClick={handleCloseShow} variant="contained" sx={{ borderRadius: "20px", textDecoration: "none", textTransform: "none", fontWeight: "500", fontSize: "1rem" }} >{t('button.Fermer')}</ColorButton>
                    </div>
                </Stack>
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

export default ListeReviews