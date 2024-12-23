import { Address, parseEther } from "viem";
import { EggsContract } from "../providers/contracts";
import useWriteContractAndWaitForConfirm from "./useWriteContractAndWaitForConfirm";

export default function useBorrow() {
  const {
    writeContract,
    isError,
    isSuccess,
    isConfirming,
    isPending,
    isUserError,
    reset,
  } = useWriteContractAndWaitForConfirm();
  const { abi, address } = EggsContract;

  const borrow = (sonicAmount: string, days: number) => {
    writeContract({
      abi,
      address: address as Address,
      functionName: "borrow",
      args: [Number(sonicAmount), days],
    });
  };
  return {
    borrow,
    isError,
    isSuccess,
    isConfirming,
    isPending,
    isUserError,
    reset,
  };
}
