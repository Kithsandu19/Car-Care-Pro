import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Appointment = () => {
    const services = [
        { id: 1, name: 'Oil Change', price: 50 },
        { id: 2, name: 'Tire Rotation', price: 30 },
        { id: 3, name: 'Brake Inspection', price: 40 },
    ];

    const handleBookAppointment = () => {
        // Handle booking logic here
        console.log('Proceed to book appointment');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <Container style={{ flex: 1 }}>
                <Typography variant="h4" gutterBottom>
                    Book Service Appointment
                </Typography>
                <Grid container spacing={3}>
                    {services.map((service) => (
                        <Grid item xs={12} sm={6} md={4} key={service.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">{service.name}</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        ${service.price}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        Book
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Button variant="contained" color="primary" onClick={handleBookAppointment} style={{ marginTop: '20px' }}>
                    Proceed to Book Appointment
                </Button>
            </Container>
            <Footer />
        </div>
    );
};

export default Appointment;