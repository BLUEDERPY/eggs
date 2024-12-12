import { Address, formatEther, parseEther } from "viem";
import { EggsContract } from "../providers/contracts";
import useWriteContractAndWaitForConfirm from "./useWriteContractAndWaitForConfirm";

import useLoanByAddress from "./useLoanByAddress";

export default function useClosePosition() {
  const { writeContract, isError, isSuccess, isConfirming, isPending, reset } =
    useWriteContractAndWaitForConfirm();
  const { abi, address } = EggsContract;

  const { data } = useLoanByAddress();
  //@ts-expect-error

  const sonic = formatEther(data?.borrowed || 0);

  const closePosition = () => {
    writeContract({
      abi,
      address: address as Address,
      functionName: "closePosition",
      args: [],
      value: parseEther(sonic),
    });
  };
  return { closePosition, isError, isSuccess, isConfirming, isPending, reset };
}
