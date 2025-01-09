import React from "react";
import { Stack, Typography, Box, Paper } from "@mui/material";
import { formatEther } from "viem";
import useAccountWithBalance from "../hooks/useAccountWithBalance";
import { nFormatter } from "../utils/formatters";
import theme from "../themes";
import useEggsBalance from "../hooks/useEggsBalance";

export const BalancesWidget: React.FC<{}> = ({ sonic, eggs }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        width: "auto",
        p: 2,
        position: "absolute",
        right: 0,
        top: 0,
        border: "1px solid",
        borderColor: theme.palette.primary.dark,
        borderRadius: 1,
        bgcolor: "background.paper",
      }}
    >
      <Stack spacing={1}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
            EGGS
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontFamily: "monospace" }}
            aria-label="EGGS balance"
          >
            {nFormatter(Number(formatEther(eggs || "0")), 2)}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
            SONIC
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontFamily: "monospace" }}
            aria-label="SONIC balance"
          >
            {nFormatter(Number(sonic?.formatted || "0"), 2)}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};
