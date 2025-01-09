import { Address } from "viem";
import { EggsContract } from "../providers/contracts";
import { useReadContract } from "wagmi";

export default function useGetLeverageFee(amount: string, days: number) {
  const { abi, address } = EggsContract;
  const { data, isSuccess, isPending, isError, error, refetch } =
    useReadContract({
      abi,
      address: address as Address,
      functionName: "leverageFee",
      args: [amount, days],
    });

  return { data, isSuccess, isPending, isError, error, refetch };
}
