import { Divider, List, ListItem, ListItemText, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t, i18n } = useTranslation(); 
    const user = useAppSelector((state: RootState) => state.auth.user);

  return (
    <Typography component="div">
        <Typography component="div" sx={{ backgroundColor: "#FFEEBC", display: "flex", justifyContent: "space-around"}}>
            <Typography component="div" sx={{ fontSize: '24px', ml: "30px", mt: "25px" }}>
            Hirafy.ma
            </Typography>

            <List sx={{ mt: "20px"  }} >
                <ListItem >
                    <Typography component="div" sx={{ fontSize: "24px" }} >
                        {t('titre.Navigation')}
                    </Typography>
                </ListItem>
                <ListItem>
                    <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                        <ListItemText primary={t('titre.Accueil')} />
                    </Link>
                </ListItem>
                <ListItem>
                    <Link to="#" style={{ textDecoration: "none", color: "inherit" }}>
                        <ListItemText primary={t('titre.AboutUs')} />
                    </Link>
                </ListItem>
                <ListItem>
                    <Link to="/addContactUs" style={{ textDecoration: "none", color: "inherit" }}>
                        <ListItemText primary={t('titre.Contacteznous')} />
                    </Link>
                </ListItem>
            </List>

            <List sx={{ mt: "20px"  }}>
                
                <ListItem>
                    <Typography component="div" sx={{ fontSize: "24px" }} >
                        {t('titre.Réclamation')}
                    </Typography>
                </ListItem>
                {user?.gates?.includes("envoyer reclamation") && <ListItem>
                    <Link to="/addReclamation" style={{ textDecoration: "none", color: "inherit" }}>
                        <ListItemText primary={t('titre.Reclamez')} />
                    </Link>
                </ListItem>}

                <ListItem>
                    <Link to="#" style={{ textDecoration: "none", color: "inherit" }}>
                        <ListItemText primary={t('titre.Termesetconditions')} />
                    </Link>
                </ListItem>
                <ListItem>
                    <Link to="#" style={{ textDecoration: "none", color: "inherit" }}>
                        <ListItemText primary={t('titre.Politiquedeconfidentialité')} />
                    </Link>
                </ListItem>
            </List>
        </Typography>
        <Divider sx={{ backgroundColor: "black", mt: "2px" }} />
        <Typography component="div" sx={{ display: "flex", mx: "auto", justifyContent: "space-around", mt: "10px" }}>
            Copyright © 2023 Hirafy.ma
        </Typography>
    </Typography>
  )
}

export default Footer