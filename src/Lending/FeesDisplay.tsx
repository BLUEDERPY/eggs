import React from "react";
import { Box, Typography, Tooltip } from "@mui/material";
import { Info } from "lucide-react";

interface FeesDisplayProps {
  fees: {
    borrowingFee: number;
    protocolFee: number;
    total: number;
  };
  duration: number;
}

export const FeesDisplay: React.FC<FeesDisplayProps> = ({ fees, duration }) => {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Borrowing Fee ({duration} days)
        </Typography>
        <Typography variant="body2">
          {fees.borrowingFee.toFixed(4)} EGGS
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Typography variant="body2" color="text.secondary">
            Liquidation Fee
          </Typography>
          <Tooltip title="This is the fee if liquidated. If the loan is returned or extended before the expire date, the user can still recover this fee.">
            <Info size={16} />
          </Tooltip>
        </Box>
        <Typography variant="body2">
          {fees.protocolFee.toFixed(4)} EGGS
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 1,
          pt: 1,
          borderTop: 1,
          borderColor: "divider",
        }}
      >
        <Typography variant="subtitle2">Total</Typography>
        <Typography variant="subtitle2">
          {fees.total.toFixed(4)} EGGS
        </Typography>
      </Box>
    </>
  );
};
