import { ReactNode, useEffect } from "react"
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { Navigate, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import { Button, Stack, Typography } from "@mui/material";
import styled from "@emotion/styled";

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

interface PermissionProps {
    children: ReactNode;
    can: string;
}

const ColorButton = styled(Button)(() => ({
  color: "white",
  width: "120px",
  backgroundColor: "#E09540",
  '&:hover': {
      backgroundColor: "#E09540",
  }
}));

export const Permission = ({children, can}: PermissionProps) => {
    const { t, i18n } = useTranslation();
    
    const user = useAppSelector((state: RootState) => state.auth.user);
    const navigate = useNavigate();

    // useEffect(() => {
    //     if( !user?.id ) {
    //         navigate('/login')
    //     }
    // }, [user])

    if( !user?.gates?.includes(can) ) {
        return (
          <>
            <Stack spacing={5} sx={{ width: "100%", mb: "50px", ml: "280px" }} alignItems="center">
              <SentimentDissatisfiedOutlinedIcon sx={{ fontSize: "100px", color: "#E09540", mx: "auto" }} />
              <Typography variant="h5" sx={{fontWeight: "700", fontSize: "1.7rem"}} >{t('titre.Nopermission')}</Typography> 
              <ColorButton onClick={() => navigate("/")} variant="contained" sx={{ borderRadius: "20px" }} size='medium' startIcon={<KeyboardArrowLeftOutlinedIcon />} >
              {t('button.retourner')}
            </ColorButton>
            </Stack>
          </>
        )
    }

    return (<>{children}</>)
}