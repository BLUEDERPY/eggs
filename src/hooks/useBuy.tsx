import { Address, parseEther } from "viem";
import { EggsContract } from "../providers/contracts";
import useWriteContractAndWaitForConfirm from "./useWriteContractAndWaitForConfirm";
import useAccountWithBalance from "./useAccountWithBalance";

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
  const { address: userAddress } = useAccountWithBalance();

  const buy = (sonicAmount: string) => {
    writeContract({
      abi,
      address: address as Address,
      functionName: "buy",
      args: [userAddress],
      value: parseEther(sonicAmount),
    });
  };
  return {
    buy,
    isError,
    isSuccess,
    isConfirming,
    isPending,
    isUserError,
    reset,
  };
}
