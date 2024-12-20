import React, { useState } from "react";
import { Stack, Typography, Slider, Alert, Button, Grid } from "@mui/material";
import { formatDate } from "../../utils/formatters";
import useLoanByAddress from "../../hooks/useLoanByAddress";
import useGetLoanFee from "../../hooks/useGetLoanFee";
import { formatEther } from "viem";

export const ExtendLoanTab = () => {
  const { data: loanData } = useLoanByAddress();
  const [extensionDays, setExtensionDays] = useState(1);

  const currentExpiry = loanData
    ? new Date(Number(loanData[2]) * 1000)
    : new Date();
  const newExpiry = new Date(
    currentExpiry.getTime() + extensionDays * 24 * 60 * 60 * 1000
  );

  const { data: fee } = useGetLoanFee(extensionDays.toString(), extensionDays);
  const feeAmount = fee ? Number(formatEther(fee)) : 0;

  const handleExtend = async () => {
    // Implement extension logic
  };

  return (
    <Stack spacing={3}>
      <Grid
        container
        sx={{
          textAlign: "center",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Grid item>
          <Stack spacing={2}>
            <Typography variant="subtitle2">New Expiration Date</Typography>
            <Typography variant="h6">{formatDate(newExpiry)}</Typography>
          </Stack>
        </Grid>
        <Grid item>
          <Stack spacing={2}>
            <Typography variant="subtitle2">Extension Period</Typography>
            <Typography variant="h6"> {extensionDays} days</Typography>
          </Stack>
        </Grid>
      </Grid>

      <Stack spacing={2} pb="24px">
        <Grid
          container
          spacing={2}
          sx={{ alignItems: "center", width: "100%" }}
        >
          <Grid item>
            <Typography variant="subtitle2">1 day</Typography>
          </Grid>
          <Grid item xs>
            <Slider
              value={extensionDays}
              onChange={(_, value) => setExtensionDays(value as number)}
              min={1}
              max={365}
            />
          </Grid>
          <Grid item>
            {" "}
            <Typography variant="subtitle2">365 days</Typography>
          </Grid>
        </Grid>
      </Stack>

      <Alert severity="info">Extension fee: {feeAmount.toFixed(4)} SONIC</Alert>

      <Button
        variant="contained"
        onClick={handleExtend}
        disabled={extensionDays <= 0}
        fullWidth
      >
        Extend Loan
      </Button>
    </Stack>
  );
};
