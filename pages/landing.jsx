import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import logo from './../src/images/logo-transparent.png';

const LandingPage = () => {
    return (
        <Container component="main">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 4 }}>
                    <Image src={logo} alt="Logo" width={120} height={120} priority />
                </Box>

                <Button
                    variant="contained"
                    sx={{ py: 2, px: 4 }}
                    component={Link}
                    href="/invoice/create"
                    noLinkStyle
                >
                    Make New Invoice
                </Button>
            </Box>
        </Container>
    );
};

export default LandingPage;
