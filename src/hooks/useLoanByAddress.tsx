import { Address } from "viem";
import { EggsContract } from "../providers/contracts";
import { useAccount, useReadContract } from "wagmi";

export default function useLoanByAddress() {
  const { abi, address } = EggsContract;
  const { address: _address } = useAccount();

  const { data, refetch } = useReadContract({
    abi,
    address: address as Address,
    functionName: "getLoanByAddress",
    args: [_address],
  });

  return { data, refetch };
}
