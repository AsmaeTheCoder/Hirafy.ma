import React from 'react'
import { useGetProfilQuery } from '../../../services/authApi'
import { Link } from 'react-router-dom';
import { Avatar, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography, tableCellClasses } from '@mui/material';
import styled from '@emotion/styled';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "black",
      color: "white",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: "#FFEEBC",
      borderRadius: "20px"
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  

const GetProfil = () => {
  const { t, i18n } = useTranslation();

    const {
        data,
        error,
        isFetching,
        isLoading
    } = useGetProfilQuery();

  return (
    <>
      <Helmet>
        <title>
          {t('titre.Profil')}
        </title>
      </Helmet>
      <Stack spacing={4} sx={{ width: "100%", ml: "30px", mt: "8%" }} justifyContent="center" alignContent="center">
        <div>

          <Typography component="div" sx={{ display: "flex", justifyContent: "space-between" }}>
            <Paper elevation={3} sx={{ borderRadius: "20px", width: "300px", minHeight: "270px", padding: "20px", mr: "20px"}}>
              <Avatar sx={{ width: "130px", height: "130px", mx: "auto", mt: "10px" }} alt={`${data?.lname} ${data?.fname}`} src={data?.profil}  />
              <br/>
              <Typography variant='h5' component="div" sx={{ display: "flex", justifyContent: "center" }} >{`${data?.lname} ${data?.fname}`}</Typography>
              <Typography component="div" variant='h6'sx={{ display: "flex", justifyContent: "center", color: "#595454" }}>{data?.email}</Typography>
              <Typography component="div" variant='h6' sx={{ display: "flex", justifyContent: "center", color: "#595454" }}>{data?.ville}</Typography>
            </Paper>

            <TableContainer component={Paper} sx={{ borderRadius: "20px", ml: "20px" }}>
              <Table sx={{ minWidth: 500 }} aria-label="customized table">
                <TableBody sx={{ padding: "20px" }}>
                  <StyledTableRow >
                    <StyledTableCell component="th" scope="row">{t('table.prenom')} :</StyledTableCell>
                    <StyledTableCell component="th" scope="row">{data && data.fname}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow >
                    <StyledTableCell component="th" scope="row">{t('table.nom')} :</StyledTableCell>
                    <StyledTableCell component="th" scope="row">{data && data.lname}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow >
                    <StyledTableCell component="th" scope="row">{t('table.telephone')} :</StyledTableCell>
                    <StyledTableCell component="th" scope="row">{data && data.telephone}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow >
                    <StyledTableCell component="th" scope="row">{t('table.AdresseEmail')} :</StyledTableCell>
                    <StyledTableCell component="th" scope="row">{data && data.email}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow >
                    <StyledTableCell component="th" scope="row">{t('table.Adresse')} :</StyledTableCell>
                    <StyledTableCell component="th" scope="row">{data && data.adresse}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow >
                    <StyledTableCell component="th" scope="row">{t('table.Ville')} :</StyledTableCell>
                    <StyledTableCell component="th" scope="row">{data && data.ville}</StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Typography>
        </div>
      </Stack>
    </>
  )
}

export default GetProfil