import { Button } from "@mui/material";
import useAccountWithBalance from "../hooks/useAccountWithBalance";
import useEggsToSonic from "../hooks/useEggsToSonic";
import { EggsContract } from "../providers/contracts";
import { Address, parseEther } from "viem";

interface Props {
  eggs: string;
  days: number;
  writeContract: any;
}

const ApproveButton = ({ eggs, days, writeContract }: Props) => {
  const { isConnected } = useAccountWithBalance();
  const { data: sonic } = useEggsToSonic(eggs);
  const eggsToSonic = (Number(sonic) * 0.95).toString();
  const { abi, address } = EggsContract;

  return (
    <>
      {!isConnected ? (
        <Button size="large" disabled variant="contained">
          {" "}
          Borrow{" "}
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={() => {
            writeContract({
              abi,
              address: address as Address,
              functionName: "borrow",
              args: [parseEther(eggs), parseEther(eggsToSonic), days],
            });
          }}
        >
          {" "}
          Borrow{" "}
        </Button>
      )}
    </>
  );
};

export default ApproveButton;
