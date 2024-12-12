import React from "react";
import { Box, Container } from "@mui/material";
import { NavLink } from "./NavLink";

const Navigation = () => {
  return (
    <Box component="nav">
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            py: 2,
          }}
        >
          <Box sx={{ display: "flex", gap: 0.5 }}>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/trade">Trade</NavLink>
            <NavLink href="/borrow">Borrow</NavLink>
            <NavLink href="/loop">Loop</NavLink>
            <NavLink href="/unwind">Unwind</NavLink>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Navigation;
