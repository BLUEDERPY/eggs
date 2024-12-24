import { Address, formatEther } from "viem";
import { EggsContract } from "../providers/contracts";
import { useAccount, useReadContract } from "wagmi";
import { parseEther } from "viem";
import { useEffect, useState } from "react";
import useRefresh from "./useRefresh";

export default function useSonicToEggs(eggs: string) {
  const { abi, address } = EggsContract;
  const { address: _address } = useAccount();
  const { data, isSuccess, isPending, isError, error, refetch } =
    useReadContract({
      abi,
      address: address as Address,
      functionName: "SONICtoEGGSNoTrade",
      args: [eggs],
    });
  const { update } = useRefresh(eggs);

  return { data, isSuccess, isPending, isError, error, refetch };
}
