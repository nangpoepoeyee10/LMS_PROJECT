// src/pages/user/Dashboard.js
import React from "react";
import { Container, Typography } from "@mui/material";

export default function UserDashboard() {
  return (
    <Container>
      <Typography variant="h4">User Dashboard</Typography>
      <Typography>View enrolled courses, progress, certificates</Typography>
    </Container>
  );
}
