import { Address, formatEther } from "viem";
import { EggsContract } from "../providers/contracts";
import { useAccount, useReadContract } from "wagmi";

export default function useEggsBalance() {
  const { abi, address } = EggsContract;
  const { address: _address } = useAccount();

  const { data, isSuccess, isError, error, isPending, refetch } =
    useReadContract({
      abi,
      address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      functionName: "balanceOf",
      args: ["0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65"],
    });

  const balance = data ? data : undefined;
  return { data: balance, isSuccess, isPending, isError, error, refetch };
}
