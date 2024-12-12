import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

export default function useWriteContractAndWaitForConfirm() {
  const {
    writeContract,
    data: hash,
    isPending,
    isError: isUserError,
    reset,
  } = useWriteContract();

  const {
    isSuccess,
    isLoading: isConfirming,
    isError,
    error,
  } = useWaitForTransactionReceipt({
    hash,
  });
  return {
    writeContract,
    hash,
    isUserError,
    isSuccess,
    isPending,
    isConfirming,
    isError,
    error,
    reset,
  };
}
