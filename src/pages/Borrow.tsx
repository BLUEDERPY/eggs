import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import { LendingInterface } from "../Lending/LendingInterface";
import { LendingStats } from "../Lending/LendingStats";

const LendingPage: React.FC = () => {
  return (
    <>
      <Grid item xs={12} alignSelf="center">
        <Typography padding={1} align="center" variant="h5">
          LENDING
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom>
          Borrow SONIC against your EGGS collateral
        </Typography>
      </Grid>
      <Grid item xs={12} alignSelf="center" mb={"30px"}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
            maxWidth: "calc(100dvw - 30px)",
            alignItems: { xs: "center", md: "flex-start" },
          }}
        >
          <LendingInterface />
        </Box>
      </Grid>
    </>
  );
};

export default LendingPage;
