import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Cart = () => {
    const cartItems = [
        { id: 1, name: 'Item 1', price: 10 },
        { id: 2, name: 'Item 2', price: 20 },
        { id: 3, name: 'Item 3', price: 30 },
    ];

    const handleCheckout = () => {
        // Handle checkout logic here
        console.log('Proceed to checkout');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <Container style={{ flex: 1 }}>
                <Typography variant="h4" gutterBottom>
                    Shopping Cart
                </Typography>
                <Grid container spacing={3}>
                    {cartItems.map((item) => (
                        <Grid item xs={12} sm={6} md={4} key={item.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">{item.name}</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        ${item.price}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        Remove
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Button variant="contained" color="primary" onClick={handleCheckout} style={{ marginTop: '20px' }}>
                    Proceed to Checkout
                </Button>
            </Container>
            <Footer />
        </div>
    );
};

export default Cart;