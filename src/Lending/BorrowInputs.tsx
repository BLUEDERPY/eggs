import React from "react";
import {
  Stack,
  TextField,
  Button,
  InputAdornment,
  Typography,
  Grid,
} from "@mui/material";
import { formatEther } from "viem";
import useAccountWithBalance from "../hooks/useAccountWithBalance";

interface BorrowInputsProps {
  borrowAmount: string;
  setBorrowAmount: (value: string) => void;
  duration: number;
  setDuration: (value: number) => void;
  onMaxClick: () => void;
  balance: string;
  minDuration: number;
}

export const BorrowInputs: React.FC<BorrowInputsProps> = ({
  borrowAmount,
  setBorrowAmount,
  duration,
  setDuration,
  onMaxClick,
  balance,
  minDuration,
}) => {
  const { data: sonic } = useAccountWithBalance();
  return (
    <Stack spacing={0}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        width={"100%"}
        mb={2}
      >
        <Grid item>
          <Typography
            sx={{ textAlign: "left" }}
            variant="body2"
            color="text.secondary"
          >
            {Number(sonic?.formatted || "0").toFixed(2)} SONIC
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            sx={{ textAlign: "right" }}
            variant="body2"
            color="text.secondary"
          >
            {Number(formatEther(balance || 0)).toFixed(2)} EGGS
          </Typography>
        </Grid>
      </Grid>
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
          inputProps={{ min: minDuration, max: minDuration + 365 }}
          helperText="Loan duration in days (1-365)"
        />
      </Stack>
    </Stack>
  );
};
