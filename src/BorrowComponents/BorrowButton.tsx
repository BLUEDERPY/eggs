import { Button } from "@mui/material";
import useAccountWithBalance from "../hooks/useAccountWithBalance";
import { EggsContract } from "../providers/contracts";
import { Address, parseEther } from "viem";

interface Props {
  eggs: string;
  days: number;
  sonic: string;
  writeContract: any;
}

const BorrowButton = ({ eggs, days, sonic, writeContract }: Props) => {
  //const {amountSonicApproved, approveSonic, sonicAmount} = useContext(GlobalContext);
  const { isConnected } = useAccountWithBalance();
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
              args: [parseEther(eggs), parseEther(sonic), days],
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

export default BorrowButton;
