import React from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

interface SwapInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  balance: string;
  onMax?: () => void;
  disabled?: boolean;
}

export const SwapInput: React.FC<SwapInputProps> = ({
  label,
  value,
  onChange,
  balance,
  onMax,
  disabled = false,
}) => {
  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
      >
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body2" color="text.secondary">
            Balance: {Number(balance).toFixed(6)}
          </Typography>
          {onMax && (
            <Button
              size="small"
              onClick={onMax}
              sx={{ minWidth: "auto", px: 1, py: 0.25 }}
            >
              MAX
            </Button>
          )}
        </Stack>
      </Stack>
      <TextField
        fullWidth
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        inputProps={{
          min: 0,
          max: Number(balance),
          step: "any",
        }}
      />
    </Box>
  );
};
