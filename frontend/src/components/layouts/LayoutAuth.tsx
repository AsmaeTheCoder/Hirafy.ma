import { IconButton, Menu, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';
import { Translate } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

interface Locale {
  title: string;
}

interface Locales {
  [key: string]: Locale;
}

const locales: Locales = {
  fr: { title: 'Français' },
  ar: { title: 'Arabe' }
};

const LayoutAuth = () => {
  const { t, i18n } = useTranslation(); 

  const [anchorElDialog, setAnchorElDialog] = useState(null);
  const openDialog = Boolean(anchorElDialog);
  const handleClickDialog = (event: any) => {
    setAnchorElDialog(event.currentTarget);
  };
  const handleCloseDialog = () => {
    setAnchorElDialog(null);
  };

  return (
    <div>
        <div>
            <div>
              <IconButton onClick={(e) => handleClickDialog(e)} sx={{ mt: '60px', ml: "60px" }} ><Translate sx={{ color: "#E09540" }} /></IconButton>

              <Menu id="basic-menu" anchorEl={anchorElDialog} open={openDialog} onClose={handleCloseDialog} MenuListProps={{ 'aria-labelledby': 'basic-button', }} >
                <ul>
                  {
                    Object.keys(locales).map((locale) => (
                      <li key={locale}>
                        <button style={{ fontWeight: i18n.resolvedLanguage === locale ? 'bold' : 'normal' }} type='submit' onClick={() => i18n.changeLanguage(locale)}>
                          {locales[locale].title}
                        </button>
                      </li>
                    ))
                  }
                </ul>
              </Menu>
            </div>

            <Paper elevation={3} sx={{ borderRadius: "20px", width: "800px", padding: "40px", mx: "auto", my: "50px" }}>
                <Typography variant='h4' sx={{textAlign: "center", fontSize: "1.6rem", fontWeight: "800"}}>Hirafy.ma</Typography>

                <Outlet />
            </Paper>
        </div>
    </div>
  )
}

export default LayoutAuth