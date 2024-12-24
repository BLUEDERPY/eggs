import { Address, formatEther, parseEther, parseUnits } from "viem";
import { EggsContract } from "../providers/contracts";
import useWriteContractAndWaitForConfirm from "./useWriteContractAndWaitForConfirm";
import useGetLeverageFee from "./useGetLeverageFee";

export default function useLeverUp(sonic: bigint, days: number) {
  const {
    writeContract,
    isError,
    isSuccess,
    isConfirming,
    isPending,
    isUserError,
    error,
    reset,
  } = useWriteContractAndWaitForConfirm();
  const { abi, address } = EggsContract;
  const { data: _fee } = useGetLeverageFee(sonic, days);
  const leverUp = () => {
    console.log(formatEther(sonic || "0"));
    console.log(formatEther(_fee || "0"));
    console.log(days);
    writeContract({
      abi,
      address: address as Address,
      functionName: "leverUp",
      args: [sonic, days],
      value: _fee,
    });
  };

  return {
    leverUp,
    isError,
    isSuccess,
    isConfirming,
    isPending,
    isUserError,
    reset,
  };
}
