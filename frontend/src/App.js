import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import ProviderDashboard from "./pages/provider/Dashboard";
import UserDashboard from "./pages/user/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>}/>
        <Route path="/provider/dashboard" element={<ProviderDashboard />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="*" element={<Navigate to="/login" />} />{" "}
        {/* default redirect */}
      </Routes>
    </ThemeProvider>
  );
}

export default App;
