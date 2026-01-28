import React, { useState } from "react";
import { Container, Box, TextField, Button, Typography, Paper, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      const role = res.data.user.role;
      if (role === "admin") navigate("/admin/dashboard");
      else if (role === "provider") navigate("/provider/dashboard");
      else navigate("/user/dashboard");

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Paper elevation={4} sx={{ p: 4, width: "100%" }}>
          <Typography variant="h5" align="center" gutterBottom>
            LMS Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField fullWidth label="Email" type="email" name="email" value={form.email} onChange={handleChange} margin="normal" required />
            <TextField fullWidth label="Password" type="password" name="password" value={form.password} onChange={handleChange} margin="normal" required />
            <Button fullWidth variant="contained" sx={{ mt: 2 }} type="submit">Login</Button>
          </Box>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don’t have an account? <Link component="button" onClick={() => navigate("/register")}>Register</Link>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}

export default Login;
