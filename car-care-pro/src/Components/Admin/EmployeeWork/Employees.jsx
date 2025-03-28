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
import Assignment from "@mui/icons-material/Assignment";
import Delete from "@mui/icons-material/Delete";
import PictureAsPdf from "@mui/icons-material/PictureAsPdf";

const Employees = () => {
    const [employees, setEmployees] = useState([
        { id: 1, name: "John Doe", position: "Manager", email: "john.doe@example.com", status: "Available", assignedTo: "Update social" },
        { id: 2, name: "Jane Smith", position: "Technician", email: "jane.smith@example.com", status: "Available", assignedTo: "Fix engine" },
        { id: 3, name: "Alice Johnson", position: "Receptionist", email: "alice.johnson@example.com", status: "Not Available", assignedTo: "Answer calls" },
        { id: 4, name: "Bob Brown", position: "Cleaner", email: "bob.brown@example.com", status: "Available", assignedTo: "Clean garage" },
        { id: 5, name: "Charlie Davis", position: "Mechanic", email: "charlie.davis@example.com", status: "Available", assignedTo: "Repair brakes" },
        { id: 6, name: "Diana Evans", position: "Supervisor", email: "diana.evans@example.com", status: "Not Available", assignedTo: "Oversee operations" },
        { id: 7, name: "Ethan Harris", position: "Technician", email: "ethan.harris@example.com", status: "Available", assignedTo: "Inspect tires" },
        { id: 8, name: "Fiona Green", position: "Manager", email: "fiona.green@example.com", status: "Available", assignedTo: "Prepare reports" },
        { id: 9, name: "George Hill", position: "Technician", email: "george.hill@example.com", status: "Not Available", assignedTo: "Replace battery" },
        { id: 10, name: "Hannah King", position: "Receptionist", email: "hannah.king@example.com", status: "Available", assignedTo: "Schedule appointments" },
        { id: 11, name: "Ian Lewis", position: "Mechanic", email: "ian.lewis@example.com", status: "Available", assignedTo: "Fix suspension" },
        { id: 12, name: "Julia Moore", position: "Cleaner", email: "julia.moore@example.com", status: "Not Available", assignedTo: "Clean office" },
        { id: 13, name: "Kevin Nelson", position: "Technician", email: "kevin.nelson@example.com", status: "Available", assignedTo: "Check oil levels" },
        { id: 14, name: "Laura Owens", position: "Supervisor", email: "laura.owens@example.com", status: "Available", assignedTo: "Monitor staff" },
        { id: 15, name: "Michael Perez", position: "Mechanic", email: "michael.perez@example.com", status: "Not Available", assignedTo: "Fix transmission" },
        { id: 16, name: "Nina Quinn", position: "Receptionist", email: "nina.quinn@example.com", status: "Available", assignedTo: "Handle inquiries" },
        { id: 17, name: "Oscar Reed", position: "Technician", email: "oscar.reed@example.com", status: "Available", assignedTo: "Inspect brakes" },
        { id: 18, name: "Paula Scott", position: "Cleaner", email: "paula.scott@example.com", status: "Not Available", assignedTo: "Clean waiting area" },
        { id: 19, name: "Quinn Taylor", position: "Manager", email: "quinn.taylor@example.com", status: "Available", assignedTo: "Plan schedules" },
        { id: 20, name: "Rachel White", position: "Technician", email: "rachel.white@example.com", status: "Available", assignedTo: "Test drive cars" }
    ]);

    const [newEmployee, setNewEmployee] = useState({ name: "", position: "", email: "" });
    const [task, setTask] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const addEmployee = () => {
        if (newEmployee.name && newEmployee.position && newEmployee.email) {
            setEmployees([...employees, { ...newEmployee, id: Date.now(), status: "Available", assignedTo: "" }]);
            setNewEmployee({ name: "", position: "", email: "" });
        }
    };

    const deleteEmployee = (id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            setEmployees(employees.filter((employee) => employee.id !== id));
        }
    };

    const updateEmployee = (id, updatedData) => {
        setEmployees(employees.map((employee) => (employee.id === id ? { ...employee, ...updatedData } : employee)));
    };

    const changeStatus = (id, status) => {
        updateEmployee(id, { status });
    };

    const assignTask = (id) => {
        updateEmployee(id, { assignedTo: task });
        setTask("");
    };

    const generatePDF = (employee) => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Employee Details", 20, 20);
        doc.setFontSize(12);
        doc.text(`Name: ${employee.name}`, 20, 40);
        doc.text(`Position: ${employee.position}`, 20, 50);
        doc.text(`Email: ${employee.email}`, 20, 60);
        doc.text(`Status: ${employee.status}`, 20, 70);
        doc.text(`Assigned Task: ${employee.assignedTo}`, 20, 80);
        doc.save(`${employee.name}_Details.pdf`);
    };

    const filteredEmployees = employees.filter(
        (employee) =>
            employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Employee Management
            </Typography>
            <Box sx={{ marginBottom: 4 }}>
                <Typography variant="h6">Add Employee</Typography>
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", marginTop: 2 }}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        value={newEmployee.name}
                        onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                        error={!newEmployee.name && newEmployee.name !== ""}
                        helperText={!newEmployee.name && newEmployee.name !== "" ? "Name is required" : ""}
                    />
                    <TextField
                        label="Position"
                        variant="outlined"
                        value={newEmployee.position}
                        onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
                        error={!newEmployee.position && newEmployee.position !== ""}
                        helperText={!newEmployee.position && newEmployee.position !== "" ? "Position is required" : ""}
                    />
                    <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        value={newEmployee.email}
                        onChange={(e) => {
                            const value = e.target.value;
                            setNewEmployee({ ...newEmployee, email: value });
                        }}
                        error={
                            (!newEmployee.email && newEmployee.email !== "") ||
                            (newEmployee.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmployee.email))
                        }
                        helperText={
                            (!newEmployee.email && newEmployee.email !== "")
                                ? "Email is required"
                                : newEmployee.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmployee.email)
                                    ? "Invalid email format"
                                    : ""
                        }
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={addEmployee}
                        disabled={!newEmployee.name || !newEmployee.position || !newEmployee.email}
                    >
                        Add Employee
                    </Button>
                </Box>
            </Box>
            <Box sx={{ marginBottom: 4 }}>
                <TextField
                    label="Search by Name or Task"
                    variant="outlined"
                    fullWidth
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <TextField
                    label="Assign Task"
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{ marginTop: 2 }}
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
            </Box>

            <Grid container spacing={3}>
                {filteredEmployees
                    .sort((a, b) => b.id - a.id) // Sort employees in descending order by ID
                    .map((employee) => (
                        <Grid item xs={12} sm={6} md={4} key={employee.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">{employee.name}</Typography>
                                    <Typography variant="body2">Position: {employee.position}</Typography>
                                    <Typography variant="body2">Email: {employee.email}</Typography>
                                    <Typography variant="body2">Status: {employee.status}</Typography>
                                    <Typography variant="body2">Assigned Task: {employee.assignedTo}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        size="small"
                                        startIcon={employee.status === "Available" ? <Cancel /> : <CheckCircle />}
                                        onClick={() =>
                                            employee.status === "Available"
                                                ? changeStatus(employee.id, "Not Available")
                                                : changeStatus(employee.id, "Available")
                                        }
                                    >
                                        {employee.status === "Available" ? "Unavailable" : "Available"}
                                    </Button>
                                    <Button size="small" startIcon={<Assignment />} onClick={() => assignTask(employee.id)}>
                                    </Button>
                                    <Button size="small" color="error" startIcon={<Delete />} onClick={() => deleteEmployee(employee.id)}>
                                    </Button>
                                    <Button size="small" startIcon={<PictureAsPdf />} onClick={() => generatePDF(employee)}>
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
            </Grid>
        </Box>
    );
};

export default Employees;
