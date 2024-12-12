import SonicDeposit from "./SonicDeposit";
import DayBox from "./DayBox";
import LoopSlider from "./LoopSlider";
import { Stack, Card } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import ApproveButton from "./ApproveButton";
import LoadingScreen from "../UnwindComponents/LoadingScreen";
import useWriteContractAndWaitForConfirm from "../hooks/useWriteContractAndWaitForConfirm";
import { GlobalContext } from "../providers/global-provider";

const Widget = () => {
  const [eggsAmount, setEggsAmount] = useState(0);
  const [days, setDays] = useState(0);

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
          <SonicDeposit eggsAmount={eggsAmount} setEggsAmount={setEggsAmount} />
          <DayBox days={days} setDays={setDays} />
          <LoopSlider />
          <ApproveButton
            eggs={eggsAmount.toString()}
            days={days}
            writeContract={writeContract}
          />
        </Stack>
      )}
    </Card>
  );
};

export default Widget;
