import { useEffect, useState } from 'react';
import { useConsulterArtisansMutation } from '../../services/artisanApi';
import { Avatar, Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { NavLink, useParams } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import TtyOutlinedIcon from '@mui/icons-material/TtyOutlined';
import { MailOutline, RoomOutlined, Search } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useListeAllCategoriesQuery } from '../../services/categorieApi';
import styled from '@emotion/styled';

const ColorButton = styled(Button)(({ theme }) => ({
    color: "white",
    backgroundColor: "#E09540",
    '&:hover': {
        backgroundColor: "#E09540",
    }
}));

interface City {
    [key: string]: string;
}

interface MyComponentProps {
  ville: string;
  idArtisan?: string;
  page: number;
  perPage: number;
}

const ConsulterArtisans= () => {
  // Translation
    const { t, i18n } = useTranslation();
    const cities: City[] = t('villes', { returnObjects: true });

    // Liste Artisans
    const { id } = useParams();
    console.log(id);
    
    const [par, setPar] = useState<MyComponentProps>({ ville: "", page: 1, perPage: 10 });
    const handleVille = (e: any) => {
      setPar({ ville: e.target.value, page: 1, perPage: par.perPage })
    };
    

    const [consulterArtisans, {data : artisans}] = useConsulterArtisansMutation();
 
    
    useEffect(() => {
        const fetchArtisansData = async () => {
            await consulterArtisans({...par, id: id});
        }

        fetchArtisansData();
    }, [par.page, par.perPage]);

      
    const handleSearch = async () => {
      await consulterArtisans({...par, id: id});
    };

    // liste categorie
    const {data, error, isLoading, isSuccess, isFetching} = useListeAllCategoriesQuery();

  return (
    <>
      <Helmet>
          <title>
            {t('titre.ListeArtisans')}
          </title>
      </Helmet>

      <Stack spacing={4} sx={{ mt: "50px", mb: "80px", ml: "40px" }} >
        <h1>{t('titre.ListeArtisans')}</h1>

        <Stack direction="row" justifyContent="center" alignItems="center" spacing={4} sx={{ width: "97%", height: "110px", backgroundColor: "#FFEEBC", borderRadius: "20px"}} >
          <FormControl fullWidth sx={{ width: "400px", backgroundColor: "white", borderRadius: "20px" }}>
              <InputLabel id="villes">Tout le Maroc</InputLabel>
              <Select label="villes" value={par.ville} onChange={handleVille} sx={{ borderRadius: "20px"}} >
                <MenuItem value="">Tout le Maroc</MenuItem>
                {cities.map((city: City, index: number) => (
                  <MenuItem key={index} value={t(`villes.${index}.${Object.keys(city)[0]}`)}>{t(`villes.${index}.${Object.keys(city)[0]}`)}</MenuItem>
                ))}
              </Select>
          </FormControl>

          <FormControl fullWidth sx={{ width: "400px", backgroundColor: "white", borderRadius: "20px" }}>
            <InputLabel id="avis">Avis</InputLabel>
            <Select id="avis" name="avis" sx={{ borderRadius: "20px"}} >
              <MenuItem disabled value="">
                Avis
              </MenuItem>
                <MenuItem value="5">5</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="1">1</MenuItem>
            </Select>
          </FormControl>

          <ColorButton variant="contained" sx={{ borderRadius: "20px", textDecoration: "none", textTransform: "none", fontWeight: "500", fontSize: "1.2rem" }} size='large' startIcon={<Search />} onClick={handleSearch}>
            {t('button.Chercher')}
          </ColorButton>
        </Stack>

        <Grid container spacing={2} columns={{lg: 12, md: 12, sm: 4, xs: 1}}>
          {artisans && artisans?.data.map((item: any, index: any) => {
            return (
              <Grid item lg={3} md={4} sm={2} xs={1}>
                  <Card sx={{borderRadius: "20px", border: "1px solid black", '&:hover': { backgroundColor: "#FFEEBC" } }} key={index}>
                    <CardActionArea component={NavLink} to={`/showArtisan/${item.id}`}  sx={{p: "10px", '&:hover': { backgroundColor: "#FFEEBC" } }}>
                      <Box sx={{height: 0, width: "100%", position: "relative", pb: "60%"}}>
                        {/* <Box component="img" sx={{ width: "100%", height: "100%", borderRadius: "20px", position: "absolute", top: 0, left: 0 }} src={item?.profil} alt={item.lname} /> */}
                        <Avatar src={item?.profil} alt={item.lname} sx={{ width: "100%", height: "100%", borderRadius: "20px", position: "absolute", top: 0, left: 0 }} />
                      </Box>
                      <CardContent>
                        <Typography variant="h6" sx={{fontWeight: "800", fontSize: "1.2rem"}}>
                          {item.fname} {item.lname}
                        </Typography>
                        <Typography gutterBottom variant="body1" component="div">
                            <span><TtyOutlinedIcon sx={{ fontSize: "22px", mr: "10px" }}/> {item.telephone}</span>
                        </Typography>
                        <Typography gutterBottom variant="body1" component="div">
                            <span><MailOutline sx={{ fontSize: "22px", mr: "10px", mb: "-3px" }} /> {item.email}</span>
                        </Typography>
                        <Typography gutterBottom variant="body1" component="div">
                            <span><RoomOutlined sx={{ fontSize: "22px", mr: "10px", mb: "-3px" }} /> {item.ville}</span>
                        </Typography>
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

export default ConsulterArtisans;