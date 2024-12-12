import { formatEther } from "viem";
import { Stack, Typography } from "@mui/material";
import useLoanByAddress from "../hooks/useLoanByAddress";

export const LoanInfo = () => {
  const { data } = useLoanByAddress();
  //@ts-expect-error
  const collateral = data ? formatEther(data.collateral) : "--";
  //@ts-expect-error

  const borrowed = data ? formatEther(data.borrowed) : "--";
  //@ts-expect-error

  const endDate = data ? data.endDate.toString() : "--";

  const date = new Date(endDate * 1000);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();

  return (
    <>
      <Stack
        direction="row"
        spacing={0}
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginBottom: 0 }}
      >
        <Typography fontWeight="bold" variant="body1">
          Collateral:
        </Typography>
        <Typography fontWeight="bold" variant="body1">
          Total SONIC Borrowed:
        </Typography>
        <Typography fontWeight="bold" variant="body1">
          Date Expires:
        </Typography>
      </Stack>
      <Stack
        direction="row"
        spacing={0}
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginBottom: 2 }}
      >
        <Typography variant="body1">
          {Number(collateral).toFixed(2) + " EGGS"}
        </Typography>
        <Typography variant="body1">
          {Number(borrowed).toFixed(2) + " SONIC"}
        </Typography>
        <Typography variant="body1">
          {month + "-" + day + "-" + year}
        </Typography>
      </Stack>
    </>
  );
};

export default LoanInfo;
