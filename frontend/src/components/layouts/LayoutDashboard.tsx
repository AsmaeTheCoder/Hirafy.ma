import { Box, Typography } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../atoms/Header';
import Drawerr from '../atoms/Drawerr';
import Footer from '../atoms/Footer';

const LayoutDashboard = () => {
  return (
    <>
        <Header /><br/>
        <Typography component="div" sx={{ display: "flex", }} >
          <Drawerr />
          <Box component="main" sx={{ mt: "40px", mb: "60px" }} >
              <Outlet />
          </Box>
        </Typography>
        <Footer />       
    </>
  )
}

export default LayoutDashboard