import React from "react";
import { Stack, Alert, Typography, Box } from "@mui/material";
import { BorrowInputs } from "../BorrowInputs";
import { CollateralDisplay } from "../CollateralDisplay";
import { FeesDisplay } from "../FeesDisplay";
import { BorrowActions } from "../BorrowActions";
import { useLendingState } from "../hooks/useLendingState";
import { PositionSummary } from "../components/PositionSummary";

export const BorrowMoreTab = () => {
  const {
    borrowAmount,
    setBorrowAmount,
    duration,
    setDuration,
    collateralRequired,
    fees,
    isValid,
    errorMessage,
    handleMaxBorrow,
    handleBorrow,
    balance,
  } = useLendingState();

  return (
    <Stack spacing={3}>
      <BorrowInputs
        borrowAmount={borrowAmount}
        setBorrowAmount={setBorrowAmount}
        duration={duration}
        setDuration={setDuration}
        onMaxClick={handleMaxBorrow}
        balance={balance}
      />

      <Box>
        <CollateralDisplay
          collateralRequired={collateralRequired}
          borrowAmount={borrowAmount}
        />
        <FeesDisplay fees={fees} duration={duration} />
      </Box>

      <BorrowActions
        isValid={isValid}
        errorMessage={errorMessage}
        onBorrow={handleBorrow}
      />
    </Stack>
  );
};
