import React, { useEffect, useState } from "react";
import {
  Stack,
  Typography,
  Button,
  Alert,
  Box,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { formatEther } from "viem";

import LoadingScreen from "../../LoadingScreen";
import { nFormatter } from "../../../utils/formatters";
import { BalancesWidget } from "../BalancesWidget";

import useConverter from "../../../hooks/useConverter";
import { useEggsData } from "../../../providers/data-provider";

type CloseMethod = "standard" | "flash";

export const ClosePositionTab = () => {
  const [closeMethod, setCloseMethod] = useState<CloseMethod>("standard");

  const {
    closePosition,

    isConfirming,
    isPending,
    flashClosePosition,
    userSonicBalance: balance,
    userEggsBalance: eggs,
    userLoan: loanData,
  } = useEggsData();

  const borrowed = loanData ? Number(formatEther(loanData[1])) : 0;
  const collateral = loanData ? Number(formatEther(loanData[0])) : 0;
  const { eggs: borrowedInEggs } = useConverter(loanData ? loanData[1] : 0);
  const _maxRemovable =
    collateral * 0.99 - Number(formatEther(borrowedInEggs || "0"));
  const maxRemovable = _maxRemovable < 0 ? 0 : _maxRemovable;
  const handleClose = async () => {
    // Implement close logic
    closePosition();
  };
  const handleFlashClose = async () => {
    // Implement close logic
    flashClosePosition();
  };

  return (
    <Stack
      spacing={3}
      minHeight={"458px"}
      justifyContent={"center"}
      position={"relative"}
      pt={"50px"}
    >
      <BalancesWidget sonic={balance} eggs={eggs} />
      {isConfirming || isPending ? (
        <LoadingScreen />
      ) : (
        <>
          <ToggleButtonGroup
            value={closeMethod}
            exclusive
            onChange={(_, value) => value && setCloseMethod(value)}
            fullWidth
          >
            <ToggleButton value="standard">Standard Repay</ToggleButton>
            <ToggleButton value="flash">Flash Close</ToggleButton>
          </ToggleButtonGroup>

          {closeMethod === "standard" ? (
            <>
              <Stack spacing={2}>
                <Typography variant="subtitle2">
                  Required SONIC to Repay
                </Typography>
                <Typography variant="h6">
                  {nFormatter(borrowed, 2)} SONIC
                </Typography>
              </Stack>

              <Alert severity="info">
                After repayment, you will receive {nFormatter(collateral, 2)}{" "}
                EGGS
              </Alert>

              <Button
                disabled={Number(borrowed) > Number(balance?.formatted)}
                variant="contained"
                onClick={handleClose}
                color="primary"
                fullWidth
              >
                Repay & Close Position
              </Button>
            </>
          ) : (
            <Box mt={"50px"}>
              {maxRemovable < 0 ? (
                <Alert severity="info">
                  Your collateral value must be 1% higher than your borrowed
                  amount to use this function.
                </Alert>
              ) : (
                <Alert severity="warning">
                  Flash close will swap your collateral for SONIC to repay the
                  loan in a single transaction. Using this function result in 1%
                  fee.
                </Alert>
              )}

              <Stack spacing={0} my={2}>
                <Typography variant="subtitle2">Estimated Return</Typography>
                <Typography variant="h6">
                  {nFormatter(maxRemovable, 2)} EGGS
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  After 1% flash close fee
                </Typography>
              </Stack>

              <Button
                disabled={maxRemovable < 0}
                variant="contained"
                onClick={handleFlashClose}
                color="error"
                fullWidth
              >
                Flash Close Position
              </Button>
            </Box>
          )}
        </>
      )}
    </Stack>
  );
};
