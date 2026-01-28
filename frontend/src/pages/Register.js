import React, { useState } from "react";
import { Container, Box, TextField, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      // alert("Registered successfully");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
      console.error(err.response?.data);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Paper elevation={4} sx={{ p: 4, width: "100%" }}>
          <Typography variant="h5" align="center" gutterBottom>LMS Register</Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField fullWidth label="Name" name="name" value={form.name} onChange={handleChange} margin="normal" required />
            <TextField fullWidth label="Email" type="email" name="email" value={form.email} onChange={handleChange} margin="normal" required />
            <TextField fullWidth label="Password" type="password" name="password" value={form.password} onChange={handleChange} margin="normal" required />
            <Button fullWidth variant="contained" sx={{ mt: 2 }} type="submit">Register</Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default Register;
