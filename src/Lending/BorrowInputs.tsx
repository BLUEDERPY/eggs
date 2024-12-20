import React from "react";
import {
  Stack,
  TextField,
  Button,
  InputAdornment,
  Typography,
} from "@mui/material";
import { formatEther } from "viem";

interface BorrowInputsProps {
  borrowAmount: string;
  setBorrowAmount: (value: string) => void;
  duration: number;
  setDuration: (value: number) => void;
  onMaxClick: () => void;
  balance: string;
}

export const BorrowInputs: React.FC<BorrowInputsProps> = ({
  borrowAmount,
  setBorrowAmount,
  duration,
  setDuration,
  onMaxClick,
  balance,
}) => {
  return (
    <Stack spacing={0}>
      <Typography
        sx={{ textAlign: "right" }}
        variant="body2"
        color="text.secondary"
      >
        Balance: {Number(formatEther(balance || 0)).toFixed(2)} EGGS
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Borrow Amount"
          type="number"
          value={formatEther(borrowAmount || 0)}
          onChange={(e) => setBorrowAmount(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button onClick={onMaxClick} size="small">
                  MAX
                </Button>
              </InputAdornment>
            ),
          }}
          helperText="Amount of SONIC tokens to borrow"
        />

        <TextField
          label="Duration (days)"
          type="number"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          inputProps={{ min: 0, max: 365 }}
          helperText="Loan duration in days (1-365)"
        />
      </Stack>
    </Stack>
  );
};
