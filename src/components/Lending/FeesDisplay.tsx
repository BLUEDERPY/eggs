import React, { useEffect, useState } from "react";
import { Box, Typography, Tooltip } from "@mui/material";
import { Info } from "lucide-react";
import { nFormatter } from "../../utils/formatters";

interface FeesDisplayProps {
  fees: {
    borrowingFee: number;
    protocolFee: number;
    total: number;
    conversionRate: bigint;
  };
  duration: number;
}

export const FeesDisplay: React.FC<FeesDisplayProps> = ({ fees, duration }) => {
  const [borrowingFee, setBorrowFee] = useState(0);
  const [protocolFee, setProtocolFee] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (fees) {
      if (fees.borrowingFee && fees.borrowingFee > 0)
        setBorrowFee(fees.borrowingFee);
      if (fees.protocolFee && fees.protocolFee > 0)
        setProtocolFee(fees.protocolFee);
      if (fees.total && fees.total > 0) setTotal(fees.total);
    }
  }, [fees]);
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Borrowing Fee ({duration} days)
        </Typography>
        <Typography variant="body2">
          {nFormatter(Number(borrowingFee), 2)} EGGS
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
          {nFormatter(Number(protocolFee), 2)} EGGS
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
          {nFormatter(Number(total), 2)} EGGS
        </Typography>
      </Box>
    </>
  );
};
