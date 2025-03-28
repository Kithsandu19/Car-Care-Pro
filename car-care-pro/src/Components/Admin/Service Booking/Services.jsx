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
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import jsPDF from "jspdf";
import Cancel from "@mui/icons-material/Cancel";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Assignment from "@mui/icons-material/Assignment";
import Delete from "@mui/icons-material/Delete";
import PictureAsPdf from "@mui/icons-material/PictureAsPdf";

const Services = () => {
    const [services, setServices] = useState([
        { id: 1, VID: "001", CID: "002", serviceNo: "001", status: "In Queue", date: "2025-03-28", description: "Oil change" },
        { id: 2, VID: "002", CID: "003", serviceNo: "002", status: "Completed", date: "2025-03-27", description: "Tire replacement" },
        { id: 3, VID: "003", CID: "004", serviceNo: "003", status: "In Progress", date: "2025-03-26", description: "Brake inspection" },
    ]);

    const [newService, setNewService] = useState({ VID: "", CID: "", serviceNo: "", description: "" });
    const [searchQuery, setSearchQuery] = useState("");
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [currentService, setCurrentService] = useState(null);
    const [editedDescription, setEditedDescription] = useState("");

    const addService = () => {
        if (newService.VID && newService.CID && newService.serviceNo && newService.description) {
            setServices([
                ...services,
                { ...newService, id: Date.now(), status: "In Queue", date: new Date().toISOString().split("T")[0] },
            ]);
            setNewService({ VID: "V", CID: "C", serviceNo: "S", description: "" });
        }
    };

    const deleteService = (id) => {
        if (window.confirm("Are you sure you want to delete this service?")) {
            setServices(services.filter((service) => service.id !== id));
        }
    };

    const updateService = (id, updatedData) => {
        setServices(services.map((service) => (service.id === id ? { ...service, ...updatedData } : service)));
    };

    const changeStatus = (id, status) => {
        updateService(id, { status });
    };

    const generatePDF = (service) => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Service Details", 20, 20);
        doc.setFontSize(12);
        doc.text(`Vehicle ID: ${service.VID}`, 20, 40);
        doc.text(`Customer ID: ${service.CID}`, 20, 50);
        doc.text(`Service No: ${service.serviceNo}`, 20, 60);
        doc.text(`Status: ${service.status}`, 20, 70);
        doc.text(`Date: ${service.date}`, 20, 80);
        doc.text(`Description: ${service.description}`, 20, 90);
        doc.save(`${service.serviceNo}_Details.pdf`);
    };

    const openEditDialog = (service) => {
        setCurrentService(service);
        setEditedDescription(service.description);
        setEditDialogOpen(true);
    };

    const closeEditDialog = () => {
        setEditDialogOpen(false);
        setCurrentService(null);
        setEditedDescription("");
    };

    const saveEditedDescription = () => {
        if (currentService) {
            updateService(currentService.id, { description: editedDescription });
        }
        closeEditDialog();
    };

    const filteredServices = services.filter(
        (service) =>
            service.VID.toLowerCase().includes(searchQuery.toLowerCase()) ||
            service.CID.toLowerCase().includes(searchQuery.toLowerCase()) ||
            service.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Service Management
            </Typography>
            <Box sx={{ marginBottom: 4 }}>
                <Typography variant="h6">Add Service</Typography>
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", marginTop: 2 }}>
                    <TextField
                        label="Vehicle ID"
                        variant="outlined"
                        type="number"
                        value={newService.VID}
                        onChange={(e) => setNewService({ ...newService, VID: e.target.value })}
                    />
                    <TextField
                        label="Customer ID"
                        variant="outlined"
                        type="number"
                        value={newService.CID}
                        onChange={(e) => setNewService({ ...newService, CID: e.target.value })}
                    />
                    <TextField
                        label="Service No"
                        type="number"
                        variant="outlined"
                        value={newService.serviceNo}
                        onChange={(e) => setNewService({ ...newService, serviceNo: e.target.value })}
                    />
                    <TextField
                        label="Description"
                        variant="outlined"
                        value={newService.description}
                        onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={addService}
                        disabled={!newService.VID || !newService.CID || !newService.serviceNo || !newService.description}
                    >
                        Add Service
                    </Button>
                </Box>
            </Box>
            <Box sx={{ marginBottom: 4 }}>
                <TextField
                    label="Search by Vehicle ID, Customer ID, or Description"
                    variant="outlined"
                    fullWidth
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </Box>

            <Grid container spacing={3}>
                {filteredServices
                    .sort((a, b) => b.id - a.id) // Sort services in descending order by ID
                    .map((service) => (
                        <Grid item xs={12} sm={6} md={4} key={service.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">Service No: S{service.serviceNo}</Typography>
                                    <Typography variant="body2">Vehicle ID: V{service.VID}</Typography>
                                    <Typography variant="body2">Customer ID: C{service.CID}</Typography>
                                    <Typography variant="body2">Status: {service.status}</Typography>
                                    <Typography variant="body2">Date: {service.date}</Typography>
                                    <Typography variant="body2">Description: {service.description}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        size="small"
                                        startIcon={service.status === "In Queue" ? <Cancel /> : <CheckCircle />}
                                        onClick={() =>
                                            service.status === "In Queue"
                                                ? changeStatus(service.id, "Completed")
                                                : changeStatus(service.id, "In Queue")
                                        }
                                    >
                                        {service.status === "In Queue" ? "Mark Completed" : "Mark In Queue"}
                                    </Button>
                                    <Button size="small" color="error" startIcon={<Delete />} onClick={() => deleteService(service.id)}>
                                    </Button>
                                    <Button size="small" startIcon={<Assignment />} onClick={() => openEditDialog(service)}>
                                    </Button>
                                    <Button size="small" startIcon={<PictureAsPdf />} onClick={() => generatePDF(service)}>
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
            </Grid>

            {/* Edit Description Dialog */}
            <Dialog open={editDialogOpen} onClose={closeEditDialog}>
                <DialogTitle>Edit Description</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeEditDialog} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={saveEditedDescription} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Services;