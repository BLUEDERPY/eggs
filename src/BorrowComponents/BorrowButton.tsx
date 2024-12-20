import { Button } from "@mui/material";
import useAccountWithBalance from "../hooks/useAccountWithBalance";
import { EggsContract } from "../providers/contracts";
import { Address, parseEther } from "viem";
import useBorrow from "../hooks/useBorrow";

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
  const { borrow } = useBorrow();

  return (
    <>
      {!isConnected ? (
        <Button disabled variant="contained">
          {" "}
          Borrow{" "}
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={() => {
            borrow(sonic, days);
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
