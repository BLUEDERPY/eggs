import { Button, Box } from "@mui/material";
import { EggsContract } from "../providers/contracts";
import { Address, formatEther, parseEther } from "viem";
import useLoanByAddress from "../hooks/useLoanByAddress";

interface Props {
  writeContract: any;
}

const ClosePosition = ({ writeContract }: Props) => {
  const { abi, address } = EggsContract;

  const { data } = useLoanByAddress();
  //@ts-expect-error

  const sonic = formatEther(data?.borrowed || 0);

  return (
    <>
      <Box sx={{ marginTop: 4 }} paddingX={2} paddingY={3}>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            writeContract({
              abi,
              address: address as Address,
              functionName: "closePosition",
              args: [],
              value: parseEther(sonic),
            });
          }}
          fullWidth
        >
          Close Position
        </Button>
      </Box>
    </>
  );
};

export default ClosePosition;
