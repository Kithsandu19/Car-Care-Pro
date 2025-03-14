import React from "react";
import { AppBar, Toolbar, Typography, Button, Container, Grid, Card, CardContent } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import Appbar from "./Appbar";

const services = [
    { title: "Oil Change", description: "Keep your engine healthy with regular oil changes." },
    { title: "Car Wash", description: "Professional car wash services to keep your car shining." },
    { title: "Tire Services", description: "Ensure your safety with our tire inspection and replacement." },
    { title: "Brake Repair", description: "Expert brake services for a safe and smooth ride." },
];

const Home = () => {
    return (
        <>


            <Container sx={{ mt: 4, textAlign: "center" }}>
                <Appbar />
                <Typography variant="h3" gutterBottom>
                    Premium Car Care Services
                </Typography>
                <Typography variant="h6" color="textSecondary">
                    Your car deserves the best. Experience top-notch service with us.
                </Typography>
            </Container>

            <Container sx={{ mt: 4 }}>
                <Grid container spacing={3}>
                    {services.map((service, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card sx={{ textAlign: "center", p: 2 }}>
                                <CardContent>
                                    <Typography variant="h5">{service.title}</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {service.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            <Container sx={{ mt: 6, textAlign: "center", pb: 4 }}>
                <Typography variant="h4">Contact Us</Typography>
                <Typography variant="body1" color="textSecondary">
                    Visit us or call us at (123) 456-7890 for appointments.
                </Typography>
                <Button variant="contained" color="primary" href="https://www.example.com" sx={{ mt: 2 }}>
                    Visit Our Website
                </Button>
            </Container>
        </>
    );
};

export default Home;