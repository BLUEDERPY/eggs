import { EggsContract } from "../providers/contracts";
import useWriteContractAndWaitForConfirm from "./useWriteContractAndWaitForConfirm";

export default function useRepay() {
  const {
    writeContract,
    isConfirming,
    isPending,
    isSuccess,
    isError,
    error,
    reset,
  } = useWriteContractAndWaitForConfirm();
  const { abi, address } = EggsContract;

  return {
    writeContract,
    abi,
    address,
    isConfirming,
    isPending,
    isSuccess,
    isError,
    error,
    reset,
  };
}
