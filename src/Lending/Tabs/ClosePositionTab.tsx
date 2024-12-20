import React, { useState } from "react";
import {
  Stack,
  Typography,
  Button,
  Alert,
  Box,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { formatEther } from "viem";
import useLoanByAddress from "../../hooks/useLoanByAddress";

type CloseMethod = "standard" | "flash";

export const ClosePositionTab = () => {
  const [closeMethod, setCloseMethod] = useState<CloseMethod>("standard");
  const { data: loanData } = useLoanByAddress();

  const borrowed = loanData ? Number(formatEther(loanData[1])) : 0;
  const collateral = loanData ? Number(formatEther(loanData[0])) : 0;

  const handleClose = async () => {
    // Implement close logic
  };

  return (
    <Stack spacing={3}>
      <ToggleButtonGroup
        value={closeMethod}
        exclusive
        onChange={(_, value) => value && setCloseMethod(value)}
        fullWidth
      >
        <ToggleButton value="standard">Standard Repay</ToggleButton>
        <ToggleButton value="flash">Flash Close</ToggleButton>
      </ToggleButtonGroup>

      {closeMethod === "standard" ? (
        <>
          <Stack spacing={2}>
            <Typography variant="subtitle2">Required SONIC to Repay</Typography>
            <Typography variant="h6">{borrowed.toFixed(2)} SONIC</Typography>
          </Stack>

          <Alert severity="info">
            After repayment, you will receive {collateral.toFixed(2)} EGGS
          </Alert>

          <Button
            variant="contained"
            onClick={handleClose}
            color="primary"
            fullWidth
          >
            Repay & Close Position
          </Button>
        </>
      ) : (
        <>
          <Alert severity="warning">
            Flash close will swap your collateral for SONIC to repay the loan in
            a single transaction. This may result in higher slippage.
          </Alert>

          <Stack spacing={2}>
            <Typography variant="subtitle2">Estimated Return</Typography>
            <Typography variant="h6">
              {(collateral * 0.99).toFixed(2)} EGGS
            </Typography>
            <Typography variant="caption" color="text.secondary">
              After 1% flash close fee
            </Typography>
          </Stack>

          <Button
            variant="contained"
            onClick={handleClose}
            color="error"
            fullWidth
          >
            Flash Close Position
          </Button>
        </>
      )}
    </Stack>
  );
};
