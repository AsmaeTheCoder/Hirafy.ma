import { useEffect, useState } from 'react';
import { useListeAllCategoriesQuery } from '../../services/categorieApi';
import { toast } from 'react-toastify';
import { NavLink, useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, Grid, Stack } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../app/hooks';
import { selectAuth } from '../../features/authSlice1';

const Home = () => {
  const { user } = useAppSelector(selectAuth);

  const { t, i18n } = useTranslation(); 

  const {data, error, isLoading, isSuccess, isFetching} = useListeAllCategoriesQuery();

  const navigate = useNavigate();

  useEffect(() => {
    if(error) {
        toast.error("Something went wrong");
    }
    }, [error]);

  return (
    <>
        <Helmet>
            <title>
                {t('titre.Accueil')}
            </title>
        </Helmet>
        <Stack sx={{ mt: "50px", mb: "80px", mx: "40px" }}>
            <h1>{t('titre.Categories')}</h1>
            <Grid container spacing={2} columns={{lg: 12, md: 12, sm: 4, xs: 1}}>
                {data && data.map((item:any, index: any) => {
                    return (
                        <Grid item lg={3} md={4} sm={2} xs={1}>
                            <Card sx={{borderRadius: "20px", border: "1px solid black", '&:hover': { backgroundColor: "#FFEEBC" } }} key={index}>
                                <CardActionArea component={NavLink} to={`/consulterArtisans/${item.id}`} sx={{p: "10px", '&:hover': { backgroundColor: "#FFEEBC" } }}>
                                    <Box sx={{height: 0, width: "100%", position: "relative", pb: "60%"}}>
                                        <Box component="img" sx={{ width: "100%", height: "100%", borderRadius: "20px", position: "absolute", top: 0, left: 0 }} src={item?.image} alt="green iguana" />
                                    </Box>
                                    <CardContent>
                                        <Typography variant="h6" sx={{fontWeight: "800", fontSize: "1.2rem"}}>{item.libelle}</Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
                
        </Stack>
    </>
  )
}

export default Home