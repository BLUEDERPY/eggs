import { Address, parseEther } from "viem";
import { EggsContract } from "../providers/contracts";
import useWriteContractAndWaitForConfirm from "./useWriteContractAndWaitForConfirm";

export default function useExtend() {
  const {
    writeContract,
    isError,
    isSuccess,
    isConfirming,
    isPending,
    isUserError,
    error,
    reset,
  } = useWriteContractAndWaitForConfirm("extendLoan");
  const { abi, address } = EggsContract;

  const extendLoan = (days: number, fee: string) => {
    writeContract({
      abi,
      address: address as Address,
      functionName: "extendLoan",
      args: [days],
      value: parseEther(fee),
    });
  };
  // ////console.log(error);

  return {
    extendLoan,
    isError,
    isSuccess,
    isConfirming,
    isPending,
    isUserError,
    reset,
  };
}
