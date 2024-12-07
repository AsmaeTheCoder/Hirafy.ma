import React from 'react'
import Header from '../atoms/Header'
import { Box, Stack, Typography } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Footer from '../atoms/Footer'

const LayoutHome = () => {
  return (
    <>
    <Header /><br/>
      <Stack>
        <Box component="main" >
            <Outlet />
        </Box>
      </Stack>
    <Footer />       
</>
  )
}

export default LayoutHome