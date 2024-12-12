import { useState } from "react";
import { Address, formatEther, parseEther } from "viem";
import { Typography, Box, Slider, Button, Stack } from "@mui/material";
import useLoanByAddress from "../hooks/useLoanByAddress";

import { EggsContract } from "../providers/contracts";

interface Props {
  writeContract: any;
}

const RepaySlider = ({ writeContract }: Props) => {
  const { abi, address } = EggsContract;
  const [currentValue, setCurrentValue] = useState<number>(1);
  const minLoop = 1;
  const maxLoop = 100;

  const { data } = useLoanByAddress();
  //@ts-expect-error

  const borrowed = formatEther(data?.borrowed || 0);

  const handleChange = (_: Event, newValue: number | number[]) => {
    setCurrentValue(newValue as number);
  };

  const val = ((currentValue / 100) * Number(borrowed)).toString();

  return (
    <Box sx={{ marginTop: 4 }} paddingX={2}>
      <Typography variant="body1" gutterBottom>
        {"Repay: " + currentValue + "%"}
      </Typography>
      <Slider
        value={currentValue}
        onChange={handleChange}
        aria-labelledby="repay-slider"
        valueLabelDisplay="auto"
        step={1}
        min={minLoop}
        max={maxLoop}
      />
      <Stack marginTop={1}>
        <Button
          fullWidth
          variant="contained"
          onClick={() => {
            writeContract({
              abi,
              address: address as Address,
              functionName: "repay",
              args: [],
              value: parseEther(val),
            });
          }}
        >
          {" "}
          {"REPAY " + val + " SONIC"}
        </Button>
      </Stack>
    </Box>
  );
};

export default RepaySlider;
