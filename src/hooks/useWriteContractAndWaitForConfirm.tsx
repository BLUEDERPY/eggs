import {
  useEstimateGas,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useEstimateFeesPerGas } from "wagmi";
import { sepolia } from "wagmi/chains";
import { EggsContract } from "../providers/contracts";

export default function useWriteContractAndWaitForConfirm(name: string) {
  const { abi, address } = EggsContract;
  const { data: gasMult } = useEstimateFeesPerGas({
    chainId: sepolia.id,
  });
  const maxFeePerGas = gasMult ? gasMult.maxFeePerGas * BigInt(120) : BigInt(0);
  const maxPriorityFeePerGas = gasMult
    ? maxFeePerGas + (gasMult.maxPriorityFeePerGas * BigInt(120)) / BigInt(100)
    : BigInt(0);
  const { data: gas } = useEstimateGas({
    chainId: sepolia.id,
  });
  //// console.log(gasMult);
  const {
    writeContract: _write,
    data: hash,
    isPending,
    isError: isUserError,
    error: error2,
    reset,
  } = useWriteContract();
  const writeContract = (params) => {
    _write({ ...params });
  };

  const {
    isSuccess,
    isLoading: isConfirming,
    isError,
    error,
  } = useWaitForTransactionReceipt({
    hash,
  });

  //// console.log(error2);
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
