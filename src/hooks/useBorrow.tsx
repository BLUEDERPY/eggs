import { Address, parseEther } from "viem";
import { EggsContract } from "../providers/contracts";
import useWriteContractAndWaitForConfirm from "./useWriteContractAndWaitForConfirm";

export default function useBorrow() {
  const { writeContract, isError, isSuccess, isConfirming, isPending, reset } =
    useWriteContractAndWaitForConfirm();
  const { abi, address } = EggsContract;

  const borrow = (eggs: string, sonicAmount: string, days: number) => {
    const eggsCollateral = parseEther(eggs.toString());
    const sonicToBorrow = parseEther(sonicAmount.toString());
    writeContract({
      abi,
      address: address as Address,
      functionName: "borrow",
      args: [eggsCollateral, sonicToBorrow, days],
    });
  };
  return { borrow, isError, isSuccess, isConfirming, isPending, reset };
}
