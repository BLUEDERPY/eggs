import { useState } from "react";
import { Box, TextField, Typography, Button, Stack } from "@mui/material";
import { Address, formatEther, parseEther } from "viem";
import useLoanByAddress from "../hooks/useLoanByAddress";

import { EggsContract } from "../providers/contracts";

interface Props {
  writeContract: any;
}

const CollateralBox = ({ writeContract }: Props) => {
  const { data } = useLoanByAddress();
  //@ts-expect-error

  const collateral = formatEther(data?.collateral || 0);
  const [removal, setRemoval] = useState(0);
  const { address, abi } = EggsContract;
  const collatRestrictions = (value: number) => {
    if (value < 0) setRemoval(0);
    else if (value > Number(collateral) * 0.95)
      setRemoval(Number(collateral) * 0.95);
    else setRemoval(value);
  };

  return (
    <Box sx={{ marginTop: 4 }} paddingX={2}>
      <Typography>
        {" "}
        {"Remove Collateral (MAX " +
          (Number(collateral) * 0.95).toFixed(2) +
          "  EGGS)"}{" "}
      </Typography>
      <TextField
        type="number"
        value={removal}
        onChange={(event) => collatRestrictions(Number(event.target.value))}
        fullWidth
      />
      <Stack marginTop={1}>
        <Button
          onClick={() => {
            writeContract({
              abi,
              address: address as Address,
              functionName: "removeCollateral",
              args: [parseEther(collateral)],
            });
          }}
          fullWidth
          variant="contained"
        >
          {" "}
          {"Remove " + removal + " EGGS"}{" "}
        </Button>
      </Stack>
    </Box>
  );
};

export default CollateralBox;
