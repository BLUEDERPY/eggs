import { Address, parseEther } from "viem";
import { EggsContract } from "../providers/contracts";
import useWriteContractAndWaitForConfirm from "./useWriteContractAndWaitForConfirm";
import useAccountWithBalance from "./useAccountWithBalance";
import useEggsBalance from "./useEggsBalance";
import { useAccount } from "wagmi";

export default function useBuy() {
  const {
    writeContract,
    isError,
    isSuccess,
    isConfirming,
    isPending,
    isUserError,
    reset,
  } = useWriteContractAndWaitForConfirm("borrow");
  const { abi, address } = EggsContract;

  const { data } = useEggsBalance();

  const sell = (eggAmount: string) => {
    writeContract({
      abi,
      address: address as Address,
      functionName: "sell",
      args: [data < eggAmount ? data : eggAmount],
    });
  };
  return {
    sell,
    isError,
    isSuccess,
    isConfirming,
    isPending,
    isUserError,
    reset,
  };
}
