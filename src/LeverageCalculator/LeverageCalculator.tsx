import React, { useEffect, useState } from "react";
import {
  Card,
  Box,
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Stack,
} from "@mui/material";
import useEggsToSonic from "../hooks/useEggsToSonic";
import useGetLoanFee from "../hooks/useGetLoanFee";
import { formatEther, parseEther } from "viem";
import { LeverageInputs } from "./LeverageInputs";
import { PotentialReturns } from "./PotentialReturns";
import useAccountWithBalance from "../hooks/useAccountWithBalance";
import {
  getleverageFee,
  getMaxEggsFromFee,
} from "../utils/leverageCalculations";
import useRefresh from "../hooks/useRefresh";
import useSonicToEggs from "../hooks/useSonicToEggs";
import useLoanByAddress from "../hooks/useLoanByAddress";
import { LoanMetrics } from "../Lending/Sidebar/LoanMetrics";
import { LendingTabs } from "../Lending/LendingTabs";
import theme from "../themes";
import useleverage from "../hooks/useleverage";
import LoadingScreen from "../UnwindComponents/LoadingScreen";

export const LeverageCalculator = () => {
  const { data: loan, refetch } = useLoanByAddress();

  const [sonicAmount, setSonicAmount] = useState("0");
  const [duration, setDuration] = useState<number>(1);
  const { data: balance, refetch: refetchBal } = useAccountWithBalance();
  const sonicBalance = balance ? balance.formatted : "0";

  const { data: conversionRate } = useEggsToSonic();
  const eggsPerSonic = conversionRate ? Number(formatEther(conversionRate)) : 0;
  const { data: _requiredEggs } = useSonicToEggs(parseEther(sonicAmount));
  const requiredEggs = _requiredEggs ? Number(formatEther(_requiredEggs)) : 0;

  const { data: _eggsBal } = useRefresh(balance?.value || parseEther("0"));

  const fee = getleverageFee(parseEther(sonicAmount || "0"), duration);
  const max = getMaxEggsFromFee(balance?.value || BigInt(0), duration);
  //// console.log(fee);
  const loanFee = fee ? Number(formatEther(fee)) : 0;

  const leverageX = Number(sonicAmount) / loanFee;

  const { leverage, isSuccess, isPending, isConfirming } = useleverage(
    parseEther(sonicAmount),
    duration
  );

  const handleLeveragePosition = async () => {
    leverage();
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      refetchBal();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (fee > balance?.value)
      setSonicAmount(Number(formatEther(max || "0")).toString());
  }, [duration, max, fee, balance]);

  const handleMaxClick = () => {
    setSonicAmount(Number(formatEther(max || "0")).toString());
  };

  const calculateROI = (priceIncrease: number) => {
    const initialCollateralValue = requiredEggs;
    const newCollateralValue = requiredEggs * (1 + priceIncrease);
    const borrowedValue = Number(sonicAmount) / eggsPerSonic;
    const roi =
      ((newCollateralValue - initialCollateralValue) / initialCollateralValue) *
      100;
    const profit =
      (newCollateralValue * roi - newCollateralValue * 100) / 10000 - loanFee;

    return { profit: profit / 100, roi };
  };

  const getScenstio = (incre) => {
    if (incre && fee)
      return (incre * Number(sonicAmount)) / Number(formatEther(fee)) / 100;
  };

  const scenarios = [
    { increase: getScenstio(5), label: "5%" },
    { increase: getScenstio(25), label: "25%" },
    { increase: getScenstio(100), label: "100%" },
    { increase: getScenstio(1000), label: "1000%" },
  ].map((scenario) => ({
    label: scenario.label,
    ...calculateROI(scenario.increase),
  }));

  return (
    <Card
      sx={{
        p: 0,
        mb: "24px",
        width: { xs: "calc(100dvw - 30px)", sm: "450px", md: "900px" },
        borderRadius: { sm: "16px" },
        position: "relative",
      }}
    >
      {isPending || isConfirming ? (
        <Stack spacing={3} minHeight={"566px"} justifyContent={"center"}>
          <LoadingScreen />
        </Stack>
      ) : loan &&
        loan[1] > 0 &&
        new Date(formatEther(loan[2]) * 1000) <= new Date() ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 320px" },
            gap: 0,
          }}
        >
          {/* Borrow More Section */}

          <LendingTabs />

          {/* Close Position Dialog */}

          <Box
            sx={{
              //borderLeft: { xs: "none", md: 1 },
              //borderTop: { xs: 1, md: "none" },
              //borderRadius: { sm: "0 16px 16px 0" },
              //m: "1px",
              //borderColor: `${theme.palette.primary.dark} !important`,
              background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[900]} 100%)`,
              px: { xs: 0, sm: 4, md: 2 },
              pt: { xs: 3, md: 0 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <LoanMetrics />
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 400px" },
            gap: 0,
          }}
        >
          <LeverageInputs
            sonicAmount={sonicAmount}
            setSonicAmount={setSonicAmount}
            duration={duration}
            setDuration={setDuration}
            loanFee={loanFee}
            requiredEggs={requiredEggs}
            eggsPerSonic={eggsPerSonic}
            sonicBalance={sonicBalance}
            onMaxClick={handleMaxClick}
            handleLeveragePosition={handleLeveragePosition}
          />
          <Box
            sx={{
              background: (theme) =>
                `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[900]} 100%)`,
              px: { xs: 0, sm: 4, md: 2 },
              pt: { xs: 3, md: 0 },
              display: "flex",
            }}
          >
            <PotentialReturns
              leverageX={leverageX}
              borrowAmount={Number(sonicAmount)}
              scenarios={scenarios}
              fee={loanFee}
            />
          </Box>
        </Box>
      )}
    </Card>
  );
};
