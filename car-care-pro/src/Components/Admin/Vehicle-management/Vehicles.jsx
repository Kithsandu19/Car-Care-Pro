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
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@mui/material";
import jsPDF from "jspdf";
import Cancel from "@mui/icons-material/Cancel";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Assignment from "@mui/icons-material/Assignment";
import Delete from "@mui/icons-material/Delete";
import PictureAsPdf from "@mui/icons-material/PictureAsPdf";

const Vehicles = () => {
    const [vehicles, setVehicles] = useState([
        { id: 1, VID: "V001", plate: "XX-xxxx", model: "FB-15", ownerContact: "0712345678", level: "Bronze", status: "Available"},
        { id: 2, VID: "V002", plate: "YY-yyyy", model: "FB-16", ownerContact: "0712345679", level: "Silver", status: "Available" },
        { id: 3, VID: "V003", plate: "ZZ-zzzz", model: "FB-17", ownerContact: "0712345680", level: "Gold", status: "Not Available" },
    ]);

    const [newVehicle, setNewVehicle] = useState({ VID: "", plate: "", model: "", ownerContact: "", level: "" });
    const [searchQuery, setSearchQuery] = useState("");

    const addVehicle = () => {
        if (newVehicle.VID && newVehicle.plate && newVehicle.model && newVehicle.ownerContact && newVehicle.level) {
            setVehicles([
                ...vehicles,
                { ...newVehicle, id: Date.now(), status: "Available" },
            ]);
            setNewVehicle({ VID: "", plate: "", model: "", ownerContact: "", level: "" });
        }
    };

    const deleteVehicle = (id) => {
        if (window.confirm("Are you sure you want to delete this vehicle?")) {
            setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
        }
    };

    const updateVehicle = (id, updatedData) => {
        setVehicles(vehicles.map((vehicle) => (vehicle.id === id ? { ...vehicle, ...updatedData } : vehicle)));
    };

    const changeStatus = (id, status) => {
        updateVehicle(id, { status });
    };

    const generatePDF = (vehicle) => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Vehicle Details", 20, 20);
        doc.setFontSize(12);
        doc.text(`Vehicle ID: ${vehicle.VID}`, 20, 40);
        doc.text(`Plate: ${vehicle.plate}`, 20, 50);
        doc.text(`Model: ${vehicle.model}`, 20, 60);
        doc.text(`Owner Contact: ${vehicle.ownerContact}`, 20, 70);
        doc.text(`Level: ${vehicle.level}`, 20, 80);
        doc.text(`Status: ${vehicle.status}`, 20, 90);
        doc.save(`${vehicle.VID}_Details.pdf`);
    };

    const filteredVehicles = vehicles.filter(
        (vehicle) =>
            vehicle.VID.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vehicle.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vehicle.ownerContact.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vehicle.level.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Vehicle Management
            </Typography>
            <Box sx={{ marginBottom: 4 }}>
                <Typography variant="h6">Add Vehicle</Typography>
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", marginTop: 2 }}>
                    <TextField
                        label="Vehicle ID"
                        variant="outlined"
                        value={newVehicle.VID}
                        onChange={(e) => setNewVehicle({ ...newVehicle, VID: e.target.value })}
                    />
                    <TextField
                        label="Plate"
                        variant="outlined"
                        value={newVehicle.plate}
                        onChange={(e) => setNewVehicle({ ...newVehicle, plate: e.target.value })}
                    />
                    <TextField
                        label="Model"
                        variant="outlined"
                        value={newVehicle.model}
                        onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
                    />
                    <TextField
                        label="Owner Contact"
                        variant="outlined"
                        value={newVehicle.ownerContact}
                        onChange={(e) => setNewVehicle({ ...newVehicle, ownerContact: e.target.value })}
                    />
                    <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                        <InputLabel>Level</InputLabel>
                        <Select
                            value={newVehicle.level}
                            onChange={(e) => setNewVehicle({ ...newVehicle, level: e.target.value })}
                            label="Level"
                        >
                            <MenuItem value="Bronze">Bronze</MenuItem>
                            <MenuItem value="Silver">Silver</MenuItem>
                            <MenuItem value="Gold">Gold</MenuItem>
                            <MenuItem value="Platinum">Platinum</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={addVehicle}
                        disabled={
                            !newVehicle.VID ||
                            !newVehicle.plate ||
                            !newVehicle.model ||
                            !newVehicle.ownerContact ||
                            !newVehicle.level
                        }
                    >
                        Add Vehicle
                    </Button>
                </Box>
            </Box>
            <Box sx={{ marginBottom: 4 }}>
                <TextField
                    label="Search by Vehicle ID, Plate, Model, or Owner Contact"
                    variant="outlined"
                    fullWidth
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </Box>

            <Grid container spacing={3}>
                {filteredVehicles
                    .sort((a, b) => b.id - a.id) // Sort vehicles in descending order by ID
                    .map((vehicle) => (
                        <Grid item xs={12} sm={6} md={4} key={vehicle.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">Vehicle ID: {vehicle.VID}</Typography>
                                    <Typography variant="body2">Plate: {vehicle.plate}</Typography>
                                    <Typography variant="body2">Model: {vehicle.model}</Typography>
                                    <Typography variant="body2">Owner Contact: {vehicle.ownerContact}</Typography>
                                    <Typography variant="body2">Level: {vehicle.level}</Typography>
                                    <Typography variant="body2">Status: {vehicle.status}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        size="small"
                                        startIcon={vehicle.status === "Available" ? <Cancel /> : <CheckCircle />}
                                        onClick={() =>
                                            vehicle.status === "Available"
                                                ? changeStatus(vehicle.id, "Not Available")
                                                : changeStatus(vehicle.id, "Available")
                                        }
                                    >
                                        {vehicle.status === "Available" ? "Unavailable" : "Available"}
                                    </Button>
                                    <Button size="small" color="error" startIcon={<Delete />} onClick={() => deleteVehicle(vehicle.id)}>
                                    </Button>
                                    <Button size="small" startIcon={<PictureAsPdf />} onClick={() => generatePDF(vehicle)}>
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
            </Grid>
        </Box>
    );
};

export default Vehicles;