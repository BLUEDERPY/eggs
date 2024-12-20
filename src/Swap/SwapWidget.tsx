import React from "react";
import { Card, Stack, Typography } from "@mui/material";
import { SwapForm } from "./SwapForm";

export const SwapWidget: React.FC = () => {
  return (
    <Card
      sx={{
        width: { xs: "calc(100dvw - 10px)", sm: "400px" },
        p: 3,
        height: "fit-content",
      }}
    >
      <Stack spacing={3}>
        <Typography variant="h6" align="center">
          Swap
        </Typography>
        <SwapForm />
      </Stack>
    </Card>
  );
};
