import React, { useEffect, useState } from "react";
import { Stack, Button } from "@mui/material";
import { SwapInput } from "./SwapInput";
import { SwapButton } from "./SwapButton";
import { ArrowUpDown } from "lucide-react";

import { formatEther, parseEther } from "viem";

import LoadingScreen from "../LoadingScreen";
import { useEggsData } from "../../providers/data-provider";
import useConverter from "../../hooks/useConverter";

export const SwapForm: React.FC = () => {
  const [fromAmount, setFromAmount] = useState<string>("");
  //const [toAmount, setToAmount] = useState<string>("");
  const [isEggsToSonic, setIsEggsToSonic] = useState(true);

  const {
    userEggsBalance: eggsBalance,
    userSonicBalance: balance,
    buy,
    sell,
    isConfirming,
    isPending,
    isSuccess,
  } = useEggsData();

  const { sonic: conversionRateToSonic, eggs: conversionRate } = useConverter(
    parseEther(fromAmount.toString() || "0")
  );

  const sonicBalance = balance ? Number(balance.formatted).toFixed(6) : "0";
  const eggsBalanceFormatted = Number(formatEther(eggsBalance || "0"));

  /* const { data: conversionRateToSonic } = useEggsToSonic(
    parseEther(fromAmount.toString() || "0")
  );*/

  const toAmount =
    conversionRate && conversionRateToSonic
      ? (
          Number(
            formatEther(isEggsToSonic ? conversionRateToSonic : conversionRate)
          ) * 0.99
        ).toFixed(6)
      : "";

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
  };

  const handleSwapDirection = () => {
    setIsEggsToSonic(!isEggsToSonic);
    setFromAmount(toAmount);
  };
  const handleBuy = () => {
    buy(fromAmount);
  };
  const handleSell = () => {
    sell(parseEther(fromAmount.toString()));
  };

  useEffect(() => {
    if (isSuccess) {
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
            onClick={isEggsToSonic ? handleSell : handleBuy}
            disabled={
              !fromAmount ||
              Number(fromAmount) <= 0 ||
              Number(fromAmount) >
                (isEggsToSonic
                  ? Number(eggsBalanceFormatted)
                  : Number(sonicBalance))
            }
          />
        </>
      )}
    </Stack>
  );
};
