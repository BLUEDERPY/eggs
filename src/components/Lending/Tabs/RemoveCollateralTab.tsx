import { useEffect, useState } from "react";
import {
  Stack,
  TextField,
  Typography,
  Alert,
  Button,
  InputAdornment,
} from "@mui/material";
import { formatEther } from "viem";

import LoadingScreen from "../../LoadingScreen";

import { BalancesWidget } from "../BalancesWidget";
import useConverter from "../../../hooks/useConverter";
import { useEggsData } from "../../../providers/data-provider";

export const RemoveCollateralTab = () => {
  const [removalAmount, setRemovalAmount] = useState("0");

  const {
    userSonicBalance: balance,
    userLoan: loanData,
    isSuccess,
    isConfirming,
    isPending,
    removeCollateral,
    userEggsBalance: eggs,
  } = useEggsData();

  const collateral = loanData ? Number(formatEther(loanData[0])) : 0;

  const { eggs: borrowedInEggs } = useConverter(loanData ? loanData[1] : 0);
  const _maxRemovable =
    collateral * 0.99 - Number(formatEther(borrowedInEggs || "0"));
  const maxRemovable = _maxRemovable > 0 ? _maxRemovable : 0;

  const remainingCollateral = collateral - Number(removalAmount);

  const handleRemove = async () => {
    removeCollateral(removalAmount);
  };

  return (
    <Stack
      spacing={3}
      minHeight={"458px"}
      justifyContent={"center"}
      position={"relative"}
      pt={"0px"}
    >
      <BalancesWidget sonic={balance} eggs={eggs} />

      {isConfirming || isPending ? (
        <LoadingScreen />
      ) : (
        <>
          <Stack spacing={2}>
            <Typography variant="subtitle2">Remove Collateral</Typography>
            <TextField
              type="number"
              value={removalAmount}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      onClick={() => {
                        setRemovalAmount(maxRemovable);
                      }}
                      size="small"
                    >
                      MAX
                    </Button>
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value <= maxRemovable && value >= 0) {
                  setRemovalAmount(e.target.value);
                }
              }}
              fullWidth
              helperText={`Remaining collateral: ${remainingCollateral.toFixed(
                2
              )} EGGS`}
            />
          </Stack>
          <Alert severity="info">
            Maximum removable amount: {maxRemovable.toFixed(2)} EGGS
          </Alert>

          <Button
            variant="contained"
            onClick={handleRemove}
            disabled={
              Number(removalAmount) <= 0 || Number(removalAmount) > maxRemovable
            }
            fullWidth
          >
            Remove {removalAmount} EGGS
          </Button>
        </>
      )}
    </Stack>
  );
};
