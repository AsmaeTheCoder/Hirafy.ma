import { ReactNode } from 'react'
import { useCurrentUserQuery } from '../../services/authApi';
import { CircularProgress, Container, Typography } from '@mui/material';

const styleContainer = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    customColor: {
        color: '#E09540',
    },
    text: {
        marginTop: '40px',
    }
};

export const AppLayout = ({children} : {children: ReactNode}) => {
    const {isLoading} = useCurrentUserQuery();

    if( isLoading ) return (
        <>
            <Container sx={styleContainer}>
            <CircularProgress color="primary" size={80} sx={styleContainer.customColor} />
            <Typography variant="h6" sx={styleContainer.text}>
                Chargement en cours...
            </Typography>
            </Container>
        </>
    )

    return <>{children}</>
}