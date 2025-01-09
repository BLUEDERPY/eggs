import React from "react";
import {
  Stack,
  TextField,
  Button,
  InputAdornment,
  Typography,
  Grid,
  Slider,
  Box,
  Paper,
} from "@mui/material";
import { formatEther } from "viem";
import useAccountWithBalance from "../hooks/useAccountWithBalance";
import { nFormatter } from "../utils/formatters";
import theme from "../themes";
import { BalancesWidget } from "./BalancesWidget";

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
    <Stack spacing={0} pt={"70px"} position={"relative"}>
      <BalancesWidget sonic={sonic} eggs={balance} />
      <Stack spacing={2}>
        <Box>
          <Typography gutterBottom>Loan Duration: {duration} days</Typography>

          <Slider
            value={duration}
            onChange={(_, value) => setDuration(value as number)}
            min={0}
            max={365}
          />
        </Box>
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
      </Stack>
    </Stack>
  );
};
