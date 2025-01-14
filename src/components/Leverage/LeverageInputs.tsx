import React from "react";
import {
  Stack,
  Typography,
  TextField,
  Slider,
  Box,
  InputAdornment,
  Button,
  Alert,
  Tooltip,
  IconButton,
} from "@mui/material";
import { nFormatter } from "../../utils/formatters";
import useleverage from "../hooks/useLeverage";
import { parseEther } from "viem";
import { InfoIcon } from "lucide-react";

interface LeverageInputsProps {
  sonicAmount: string;
  setSonicAmount: (value: string) => void;
  duration: number;
  setDuration: (value: number) => void;
  loanFee: number;
  requiredEggs: number;
  sonicBalance: string;
  onMaxClick: () => void;
  handleLeveragePosition: () => void;
}

export const LeverageInputs = ({
  sonicAmount,
  setSonicAmount,
  duration,
  setDuration,
  loanFee,
  requiredEggs,
  sonicBalance,
  onMaxClick,
  handleLeveragePosition,
}: LeverageInputsProps) => {
  const isValidInput =
    Number(sonicAmount) > 0 && duration >= 0 && duration <= 365;

  return (
    <Stack
      spacing={3}
      sx={{
        py: { xs: "24px", sm: 4, md: 6 },
        px: { xs: "24px", sm: 6, md: 8 },
      }}
    >
      <Stack spacing={3}>
        {/* Loan Duration */}
        <Box>
          <Typography gutterBottom>Loan Duration: {duration} days</Typography>
          <Slider
            value={duration}
            onChange={(_, value) => setDuration(value as number)}
            min={0}
            max={365}
            valueLabelDisplay="auto"
          />
        </Box>

        {/* SONIC Amount */}
        <Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 1, textAlign: "right" }}
          >
            Balance: {sonicBalance} SONIC
          </Typography>
          <TextField
            label="Amount of SONIC to Borrow"
            type="number"
            value={sonicAmount}
            onChange={(e) => setSonicAmount(e.target.value)}
            fullWidth
            InputProps={{
              inputProps: { min: 0 },
              endAdornment: (
                <InputAdornment position="end">
                  <Button onClick={onMaxClick} size="small">
                    MAX
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Stack>

      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Total Borrowed
          </Typography>
          <Typography variant="body2">
            {nFormatter(Number(sonicAmount) * 0.99 - loanFee, 2)} SONIC
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Total Collateral
          </Typography>
          <Typography variant="body2">
            {nFormatter(requiredEggs, 2)} EGGS
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Box>
            <Typography sx={{ display: "inline" }} variant="h6">
              You Pay{" "}
              <Tooltip
                sx={{ display: "inline" }}
                title={
                  "This is the total cost you pay to open the position seen here.This fee is non-refundable and may be lost if the price of EGGS does not increase before your expiry date."
                }
              >
                <InfoIcon height={15} width={15} />
              </Tooltip>
            </Typography>
          </Box>

          <Typography variant="h6">{nFormatter(loanFee, 2)} SONIC</Typography>
        </Box>
      </Box>

      <Alert severity="info" sx={{ mt: 2 }}>
        Make sure you understand the risks of leveraged positions before
        proceeding.
      </Alert>

      <Button
        variant="contained"
        fullWidth
        onClick={handleLeveragePosition}
        disabled={!isValidInput}
        sx={{
          py: 1,
          height: "auto",
        }}
      >
        Open Leverage Position
      </Button>
    </Stack>
  );
};
