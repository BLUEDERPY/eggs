import { Address, formatEther, parseEther } from "viem";
import { EggsContract } from "../providers/contracts";
import useWriteContractAndWaitForConfirm from "./useWriteContractAndWaitForConfirm";

import useLoanByAddress from "./useLoanByAddress";

export default function useFlashClose() {
  const { writeContract, isError, isSuccess, isConfirming, isPending, reset } =
    useWriteContractAndWaitForConfirm("flashClosePosition");
  const { abi, address } = EggsContract;

  //@ts-expect-error

  const flashClosePosition = () => {
    writeContract({
      abi,
      address: address as Address,
      functionName: "flashClosePosition",
      args: [],
    });
  };
  return {
    flashClosePosition,
    isError,
    isSuccess,
    isConfirming,
    isPending,
    reset,
  };
}
