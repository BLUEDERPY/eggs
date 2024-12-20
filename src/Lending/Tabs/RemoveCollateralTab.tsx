import React, { useState } from "react";
import { Stack, TextField, Typography, Alert, Button } from "@mui/material";
import { formatEther, parseEther } from "viem";
import useLoanByAddress from "../../hooks/useLoanByAddress";
import { HealthIndicator } from "../components/HealthIndicator";

export const RemoveCollateralTab = () => {
  const { data: loanData } = useLoanByAddress();
  const [removalAmount, setRemovalAmount] = useState("0");

  const collateral = loanData ? Number(formatEther(loanData[0])) : 0;
  const borrowed = loanData ? Number(formatEther(loanData[1])) : 0;
  const maxRemovable = Math.max(0, collateral * 0.99 - borrowed);

  const remainingCollateral = collateral - Number(removalAmount);
  const newHealthFactor = borrowed > 0 ? remainingCollateral / borrowed : 0;

  const handleRemove = async () => {
    // Implement removal logic
  };

  return (
    <Stack spacing={3}>
      <Alert severity="info">
        Maximum removable amount: {maxRemovable.toFixed(2)} EGGS
      </Alert>

      <Stack spacing={2}>
        <Typography variant="subtitle2">Remove Collateral</Typography>
        <TextField
          type="number"
          value={removalAmount}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value <= maxRemovable && value >= 0) {
              setRemovalAmount(e.target.value);
            }
          }}
          fullWidth
          helperText={`Remaining collateral: ${remainingCollateral.toFixed(
            2
          )} EGGS`}
        />
      </Stack>

      <Button
        variant="contained"
        onClick={handleRemove}
        disabled={
          Number(removalAmount) <= 0 || Number(removalAmount) > maxRemovable
        }
        fullWidth
      >
        Remove {removalAmount} EGGS
      </Button>
    </Stack>
  );
};
