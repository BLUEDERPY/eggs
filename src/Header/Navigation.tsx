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
            <NavLink href="/">Trade</NavLink>
            <NavLink href="/lending">Lending</NavLink>
            <NavLink href="/leverage">Leverage</NavLink>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Navigation;
