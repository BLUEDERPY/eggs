import React, { useEffect, useState } from "react";
import { Stack, Button } from "@mui/material";
import { SwapInput } from "./SwapInput";
import { SwapButton } from "./SwapButton";
import { ArrowUpDown } from "lucide-react";
import useEggsToSonic from "../hooks/useEggsToSonic";
import useAccountWithBalance from "../hooks/useAccountWithBalance";
import useEggsBalance from "../hooks/useEggsBalance";
import { formatEther, parseEther } from "viem";
import useBuy from "../hooks/useBuy";
import useSonicToEggs from "../hooks/useSonicToEggs";
import LoadingScreen from "../UnwindComponents/LoadingScreen";

export const SwapForm: React.FC = () => {
  const [fromAmount, setFromAmount] = useState<string>("");
  //const [toAmount, setToAmount] = useState<string>("");
  const [isEggsToSonic, setIsEggsToSonic] = useState(true);

  const { data: balance, refetch: refetchSonic } = useAccountWithBalance();
  const { data: eggsBalance, refetch: refetchEggs } = useEggsBalance();
  const { buy, isConfirming, isPending, isSuccess } = useBuy();
  const sonicBalance = balance ? Number(balance.formatted).toFixed(6) : "0";
  const eggsBalanceFormatted = Number(formatEther(eggsBalance || "0"));

  const { data: conversionRate } = useSonicToEggs(
    parseEther(fromAmount || "0")
  );

  const toAmount = conversionRate
    ? (Number(formatEther(conversionRate)) * 0.99).toFixed(6)
    : "";

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
  };

  const handleSwapDirection = () => {
    setIsEggsToSonic(!isEggsToSonic);
    setFromAmount("");
  };
  const handleBuy = () => {
    buy(fromAmount);
  };

  useEffect(() => {
    if (isSuccess) {
      refetchEggs();
      refetchSonic();
      setFromAmount("");
    }
  }, [isSuccess]);

  return (
    <Stack spacing={2} minHeight={"352px"}>
      {isConfirming || isPending ? (
        <LoadingScreen />
      ) : (
        <>
          <SwapInput
            label={isEggsToSonic ? "EGGS" : "SONIC"}
            value={fromAmount}
            onChange={handleFromAmountChange}
            balance={isEggsToSonic ? eggsBalanceFormatted : sonicBalance}
            onMax={() =>
              handleFromAmountChange(
                isEggsToSonic ? eggsBalanceFormatted : sonicBalance
              )
            }
          />
          <Button
            onClick={handleSwapDirection}
            sx={{
              width: "40px",
              minWidth: "40px",
              height: "40px",
              p: 0,
              alignSelf: "center",
              borderRadius: "50%",
            }}
          >
            <ArrowUpDown size={20} />
          </Button>
          <SwapInput
            label={isEggsToSonic ? "SONIC" : "EGGS"}
            value={toAmount}
            onChange={() => {}}
            balance={isEggsToSonic ? sonicBalance : eggsBalanceFormatted}
            disabled
          />
          <SwapButton
            onClick={isEggsToSonic ? handleBuy : handleBuy}
            disabled={!fromAmount || Number(fromAmount) <= 0}
          />
        </>
      )}
    </Stack>
  );
};
