import { Address } from "viem";
import { EggsContract } from "../providers/contracts";
import useWriteContractAndWaitForConfirm from "./useWriteContractAndWaitForConfirm";
import useGetLoanFee from "./useGetLoanFee";

export default function useExtendLoan() {
  const { writeContract, isError, isSuccess, isConfirming, isPending, reset } =
    useWriteContractAndWaitForConfirm();
  const { abi, address } = EggsContract;
  const extendLoan = (days: number) => {
    const { data } = useGetLoanFee(days);
    const fee = data ? data : 0;
    writeContract({
      abi,
      address: address as Address,
      functionName: "extendLoan",
      args: [days],
      //@ts-expect-error

      value: fee,
    });
  };
  return { extendLoan, isError, isSuccess, isConfirming, isPending, reset };
}
