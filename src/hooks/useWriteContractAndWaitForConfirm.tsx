import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

export default function useWriteContractAndWaitForConfirm() {
  const {
    writeContract,
    data: hash,
    isPending,
    isError: isUserError,
    error: error2,
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

  console.log(error2);
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
