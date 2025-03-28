import React, { useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardActions,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import jsPDF from "jspdf";
import Cancel from "@mui/icons-material/Cancel";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Delete from "@mui/icons-material/Delete";
import PictureAsPdf from "@mui/icons-material/PictureAsPdf";

const SpareParts = () => {
    const [inventory, setInventory] = useState([
        { id: 1, InvID: "V001", Scode: "a1b2c3d4e5f6", name: "gearbox", quantity: "12", model: "n16 auto", price: "1000", status: "Available" },
        { id: 2, InvID: "V002", Scode: "f6e5d4c3b2a1", name: "brake pads", quantity: "20", model: "n16 manual", price: "200", status: "Available" },
        { id: 3, InvID: "V003", Scode: "z9y8x7w6v5u4", name: "engine oil", quantity: "50", model: "universal", price: "50", status: "Not Available" },
    ]);

    const [newPart, setNewPart] = useState({ InvID: "", Scode: "", name: "", quantity: "", model: "", price: "" });
    const [searchQuery, setSearchQuery] = useState("");

    const addPart = () => {
        if (newPart.InvID && newPart.Scode && newPart.name && newPart.quantity && newPart.model && newPart.price) {
            setInventory([
                ...inventory,
                { ...newPart, id: Date.now(), status: "Available" },
            ]);
            setNewPart({ InvID: "", Scode: "", name: "", quantity: "", model: "", price: "" });
        }
    };

    const deletePart = (id) => {
        if (window.confirm("Are you sure you want to delete this part?")) {
            setInventory(inventory.filter((part) => part.id !== id));
        }
    };

    const updatePart = (id, updatedData) => {
        setInventory(inventory.map((part) => (part.id === id ? { ...part, ...updatedData } : part)));
    };

    const changeStatus = (id, status) => {
        updatePart(id, { status });
    };

    const generatePDF = (part) => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Spare Part Details", 20, 20);
        doc.setFontSize(12);
        doc.text(`Inventory ID: ${part.InvID}`, 20, 40);
        doc.text(`Serial Code: ${part.Scode}`, 20, 50);
        doc.text(`Name: ${part.name}`, 20, 60);
        doc.text(`Quantity: ${part.quantity}`, 20, 70);
        doc.text(`Model: ${part.model}`, 20, 80);
        doc.text(`Price: $${part.price}`, 20, 90);
        doc.text(`Status: ${part.status}`, 20, 100);
        doc.save(`${part.InvID}_Details.pdf`);
    };

    const filteredInventory = inventory.filter(
        (part) =>
            part.InvID.toLowerCase().includes(searchQuery.toLowerCase()) ||
            part.Scode.toLowerCase().includes(searchQuery.toLowerCase()) ||
            part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            part.model.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Spare Parts Inventory Management
            </Typography>
            <Box sx={{ marginBottom: 4 }}>
                <Typography variant="h6">Add Spare Part</Typography>
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", marginTop: 2 }}>
                    <TextField
                        label="Inventory ID"
                        variant="outlined"
                        value={newPart.InvID}
                        onChange={(e) => setNewPart({ ...newPart, InvID: e.target.value })}
                    />
                    <TextField
                        label="Serial Code"
                        variant="outlined"
                        value={newPart.Scode}
                        onChange={(e) => setNewPart({ ...newPart, Scode: e.target.value })}
                    />
                    <TextField
                        label="Name"
                        variant="outlined"
                        value={newPart.name}
                        onChange={(e) => setNewPart({ ...newPart, name: e.target.value })}
                    />
                    <TextField
                        label="Quantity"
                        variant="outlined"
                        value={newPart.quantity}
                        onChange={(e) => setNewPart({ ...newPart, quantity: e.target.value })}
                    />
                    <TextField
                        label="Model"
                        variant="outlined"
                        value={newPart.model}
                        onChange={(e) => setNewPart({ ...newPart, model: e.target.value })}
                    />
                    <TextField
                        label="Price"
                        variant="outlined"
                        value={newPart.price}
                        onChange={(e) => setNewPart({ ...newPart, price: e.target.value })}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={addPart}
                        disabled={
                            !newPart.InvID ||
                            !newPart.Scode ||
                            !newPart.name ||
                            !newPart.quantity ||
                            !newPart.model ||
                            !newPart.price
                        }
                    >
                        Add Part
                    </Button>
                </Box>
            </Box>
            <Box sx={{ marginBottom: 4 }}>
                <TextField
                    label="Search by Inventory ID, Serial Code, Name, or Model"
                    variant="outlined"
                    fullWidth
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </Box>

            <Grid container spacing={3}>
                {filteredInventory
                    .sort((a, b) => b.id - a.id) // Sort inventory in descending order by ID
                    .map((part) => (
                        <Grid item xs={12} sm={6} md={4} key={part.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">Inventory ID: {part.InvID}</Typography>
                                    <Typography variant="body2">Serial Code: {part.Scode}</Typography>
                                    <Typography variant="body2">Name: {part.name}</Typography>
                                    <Typography variant="body2">Quantity: {part.quantity}</Typography>
                                    <Typography variant="body2">Model: {part.model}</Typography>
                                    <Typography variant="body2">Price: ${part.price}</Typography>
                                    <Typography variant="body2">Stock: {part.status}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        size="small"
                                        startIcon={part.status === "Instock" ? <Cancel /> : <CheckCircle />}
                                        onClick={() =>
                                            part.status === "Instock"
                                                ? changeStatus(part.id, "Out of Stock")
                                                : changeStatus(part.id, "Instock")
                                        }
                                    >
                                        {part.status === "Instock" ? "Out of Stock" : "Instock"}
                                    </Button>
                                    <Button size="small" color="error" startIcon={<Delete />} onClick={() => deletePart(part.id)}>
                                        Delete
                                    </Button>
                                    <Button size="small" startIcon={<PictureAsPdf />} onClick={() => generatePDF(part)}>
                                        Export PDF
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
            </Grid>
        </Box>
    );
};

export default SpareParts;