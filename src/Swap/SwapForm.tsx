import React, { useState } from "react";
import { Stack, Button } from "@mui/material";
import { SwapInput } from "./SwapInput";
import { SwapButton } from "./SwapButton";
import { ArrowUpDown } from "lucide-react";
import useEggsToSonic from "../hooks/useEggsToSonic";
import useAccountWithBalance from "../hooks/useAccountWithBalance";
import useEggsBalance from "../hooks/useEggsBalance";

export const SwapForm: React.FC = () => {
  const [fromAmount, setFromAmount] = useState<string>("");
  const [toAmount, setToAmount] = useState<string>("");
  const [isEggsToSonic, setIsEggsToSonic] = useState(true);

  const { data: balance } = useAccountWithBalance();
  const { data: eggsBalance } = useEggsBalance();

  const sonicBalance = balance ? Number(balance.formatted).toFixed(6) : "0";
  const eggsBalanceFormatted = eggsBalance || "0";

  const { data: conversionRate } = useEggsToSonic(fromAmount || "0");

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    if (value && conversionRate) {
      const converted = isEggsToSonic
        ? Number(conversionRate).toFixed(6)
        : (Number(value) / Number(conversionRate)).toFixed(6);
      setToAmount(converted);
    } else {
      setToAmount("");
    }
  };

  const handleSwapDirection = () => {
    setIsEggsToSonic(!isEggsToSonic);
    setFromAmount("");
    setToAmount("");
  };

  return (
    <Stack spacing={2}>
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
        onClick={handleSwapDirection}
        disabled={!fromAmount || Number(fromAmount) <= 0}
      />
    </Stack>
  );
};
