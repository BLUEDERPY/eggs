import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";
import { formatEther } from "viem";

interface CollateralDisplayProps {
  collateralRequired: number;
  borrowAmount: string;
}

export const CollateralDisplay: React.FC<CollateralDisplayProps> = ({
  collateralRequired,
  borrowAmount,
}) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <Typography variant="subtitle1" gutterBottom>
          Required Collateral
        </Typography>
      </Box>

      <Typography variant="subtitle1">{collateralRequired} EGGS</Typography>
    </Box>
  );
};
