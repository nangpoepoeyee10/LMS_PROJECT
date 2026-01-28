// src/pages/admin/Dashboard.js
import React from "react";
import { Container, Typography } from "@mui/material";

export default function AdminDashboard() {
  return (
    <Container>
      <Typography variant="h4">Admin Dashboard</Typography>
      <Typography>
        Manage Users, Providers, Courses, Categories, Apps, Sliders, Homepage Blocks
      </Typography>
    </Container>
  );
}
