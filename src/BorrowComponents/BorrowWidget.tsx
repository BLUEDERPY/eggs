import EggsDeposit from "./EggsDeposit";
import ExtendDays from "./ExtendDays";
import BorrowButton from "./BorrowButton";
import { Stack, Card } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import LoadingScreen from "../UnwindComponents/LoadingScreen";
import useWriteContractAndWaitForConfirm from "../hooks/useWriteContractAndWaitForConfirm";
import { GlobalContext } from "../providers/global-provider";
import BorrowBox from "./BorrowBox";

const BorrowWidget = () => {
  const [eggsAmount, setEggsAmount] = useState(0);
  const [days, setDays] = useState(0);
  const [sonicBorrow, setSonicBorrow] = useState(0);

  const { status, setStatus } = useContext(GlobalContext);
  const {
    writeContract,
    isError,
    isUserError,
    isConfirming,
    isSuccess,
    isPending,
  } = useWriteContractAndWaitForConfirm();
  const [isTransactionOccuring, setIsTransactionOccuring] = useState(false);

  useEffect(() => {
    setStatus(
      isError
        ? "ERROR"
        : isUserError
        ? "ERROR"
        : isSuccess
        ? "SUCCESS"
        : isConfirming
        ? "CONFIRMING"
        : isPending
        ? "PENDING"
        : "NONE",
      isError
        ? `There was an error with your transaction on the blockchain`
        : isUserError
        ? "There was an error with your transaction. "
        : isSuccess
        ? `Success`
        : isConfirming
        ? `Blockchain transaction is confirming`
        : isPending
        ? `Your transaction is pending`
        : ""
    );
  }, [isError, isUserError, isSuccess, isConfirming, isPending]);

  useEffect(() => {
    if (status !== "NONE") {
      setIsTransactionOccuring(true);
    } else {
      setIsTransactionOccuring(false);
    }
  }, [status]);

  return (
    <Card>
      {isTransactionOccuring ? (
        <LoadingScreen />
      ) : (
        <Stack spacing={5}>
          <BorrowBox
            sonicBorrow={sonicBorrow}
            setSonicBorrow={setSonicBorrow}
          />
          <EggsDeposit eggsAmount={eggsAmount} setEggsAmount={setEggsAmount} />
          <ExtendDays days={days} setDays={setDays} />

          <BorrowButton
            eggs={eggsAmount.toString()}
            sonic={sonicBorrow.toString()}
            days={days}
            writeContract={writeContract}
          />
        </Stack>
      )}
    </Card>
  );
};

export default BorrowWidget;
