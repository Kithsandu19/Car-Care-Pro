import React from "react";
import { Container, Typography, Card, CardContent, Grid } from "@mui/material";

const AboutUs = () => {
  return (
    <Container sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h3" gutterBottom>
        About Us
      </Typography>
      <Typography variant="h6" color="textSecondary" paragraph>
        At Car Care Service Center, we are dedicated to providing high-quality auto maintenance and repair services.
        Our experienced professionals ensure that your vehicle stays in excellent condition, offering top-notch services with a commitment to excellence.
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Our Mission</Typography>
              <Typography variant="body2" color="textSecondary">
                To provide reliable and affordable car care services, ensuring safety and satisfaction for all our customers.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Our Vision</Typography>
              <Typography variant="body2" color="textSecondary">
                To be the most trusted car service center, known for excellence, innovation, and customer satisfaction.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Why Choose Us?</Typography>
              <Typography variant="body2" color="textSecondary">
                Experienced professionals, high-quality service, and a customer-first approach set us apart.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutUs;
