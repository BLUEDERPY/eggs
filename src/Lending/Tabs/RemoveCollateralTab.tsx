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
import useLoanByAddress from "../../hooks/useLoanByAddress";
import useRefresh2 from "../../hooks/useRefresh2";
import useRemoveCollateral from "../../hooks/useRemoveCollateral";
import LoadingScreen from "../../UnwindComponents/LoadingScreen";
import useEggsBalance from "../../hooks/useEggsBalance";
import useAccountWithBalance from "../../hooks/useAccountWithBalance";

export const RemoveCollateralTab = () => {
  const { data: balance, refetch: refetchBal } = useAccountWithBalance();
  const { data: loanData, refetch } = useLoanByAddress();
  const [removalAmount, setRemovalAmount] = useState("0");
  const { removeCollateral, isSuccess, isConfirming, isPending } =
    useRemoveCollateral();

  const collateral = loanData ? Number(formatEther(loanData[0])) : 0;

  const { data: borrowedInEggs } = useRefresh2(loanData ? loanData[1] : 0);
  const _maxRemovable =
    collateral * 0.99 - Number(formatEther(borrowedInEggs || "0"));
  const maxRemovable = _maxRemovable > 0 ? _maxRemovable : 0;

  const remainingCollateral = collateral - Number(removalAmount);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      refetchBal();
    }
  }, [isSuccess]);

  const handleRemove = async () => {
    removeCollateral(removalAmount);
  };

  return (
    <Stack
      spacing={3}
      minHeight={"424px"}
      justifyContent={"center"}
      position={"relative"}
    >
      <Typography
        sx={{ textAlign: "right" }}
        variant="body2"
        color="text.secondary"
        position={"absolute"}
        right={0}
        top={0}
      >
        Balance: {Number(balance?.formatted).toFixed(4)} SONIC
      </Typography>

      {isConfirming || isPending ? (
        <LoadingScreen />
      ) : (
        <>
          <Alert severity="info">
            Maximum removable amount: {maxRemovable.toFixed(2)} EGGS
          </Alert>

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
