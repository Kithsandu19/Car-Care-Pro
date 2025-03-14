import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';


const Appbar = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
            <Toolbar>
                <DirectionsCarIcon sx={{ mr: 1 }} />
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Car Care Pro
            </Typography>
            <Button color="inherit" href="/" sx={{ mt: 2 }}>Home</Button>
            <Button color="inherit" href="/Services" sx={{ mt: 2 }}>Services</Button>
            <Button color="inherit" href="/About" sx={{ mt: 2 }}>About Us</Button>
            <Button color="inherit" href="/Contact" sx={{ mt: 2 }}>Contact</Button>
        </Toolbar>
        </AppBar >
    );
};

export default Appbar;