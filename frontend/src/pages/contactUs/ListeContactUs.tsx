import React, { useEffect, useState } from 'react'
import { useDetailsContactQuery, useListeContactMutation } from '../../services/contactUsApi'
import { Box, Button, Modal, Paper, Stack, Table, TableBody, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import styled from '@emotion/styled';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
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
    minWidth: 500,
    bgcolor: 'background.paper',
    borderRadius: "20px",
    boxShadow: 24,
    p: 4,
};

const ListeContactUs = () => {
    const { t, i18n } = useTranslation();
    // Liste
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState<string>("10");

    const pages = ["5", "10", "15", "20", "25", "30"];

    const [listeContactUs, {data : contacts}] = useListeContactMutation();

    useEffect(() => {
       const fetchContactUsData = async () => {
           await listeContactUs({ page, perPage });
       }

       fetchContactUsData();
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

    const {data: dataShow, error: errorShow, isFetching: isFetchingShow, isLoading: isLoadingShow} = useDetailsContactQuery(idShow!);

  return (
    <>
        <Helmet>
          <title>
            {t('titre.Listecontactes')}
          </title>
      </Helmet>
        <Stack spacing={4} sx={{ width: "100%", ml: "40px" }}>
            <h2>Liste des contact</h2>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 850, borderRadius: "20px" }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Prénom</StyledTableCell>
                            <StyledTableCell align="center">Nom</StyledTableCell>
                            <StyledTableCell align="center">Email</StyledTableCell>
                            <StyledTableCell align="center">Téléphone</StyledTableCell>
                            <StyledTableCell align="center">Détails</StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {contacts &&
                            contacts?.data.map((item: any, index: any) => (
                                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                    <TableCell align="center" component="th" scope="row">
                                        {item.fname}
                                    </TableCell>
                                    <TableCell align="center">{item.lname}</TableCell>
                                    <TableCell align="center">{item.email}</TableCell>
                                    <TableCell align="center">{item.telephone}</TableCell>
                                    <TableCell align="center">
                                    <ColorButtonOutlined variant="outlined" onClick={() => handleOpenShow(item.id)} sx={{ marginLeft: "10px", textDecoration: "none", textTransform: "none", fontWeight: "500", fontSize: "1rem" }} startIcon={<MoreVertIcon />}>
                                        Détails
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
                    <table width="99%">
                        <tr>
                            <td>
                                <Typography variant="h6" component="label" >
                                    Prénom
                                </Typography>
                            </td>
                            <td >
                                <Typography variant="body1">
                                    {dataShow && dataShow.fname}
                                </Typography>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Typography variant="h6" component="label" >
                                    Nom
                                </Typography>
                            </td>
                            <td >
                                <Typography variant="body1">
                                    {dataShow && dataShow.lname}
                                </Typography>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Typography variant="h6" component="label" >
                                    Email
                                </Typography>
                            </td>
                            <td >
                                <Typography variant="body1" >
                                    {dataShow && dataShow.email}
                                </Typography>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Typography variant="h6" component="label" >
                                    Téléphone
                                </Typography>
                            </td>
                            <td>
                                <Typography variant="body1">
                                    {dataShow && dataShow.telephone}
                                </Typography>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Typography variant="h6" component="label" >  
                                    Déscription
                                </Typography>
                            </td>
                            <td>
                                <Typography variant="body1">
                                    {dataShow && dataShow.description}
                                </Typography>
                            </td>
                        </tr>
                    </table>
                    <div style={{ display: "flex", justifyContent: "flex-end" }} >
                        <ColorButton onClick={handleCloseShow} variant="contained" sx={{ borderRadius: "20px", textDecoration: "none", textTransform: "none", fontWeight: "500", fontSize: "1rem" }} >Fermer</ColorButton>
                    </div>
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

export default ListeContactUs;