import { useVisibilityChange } from "@uidotdev/usehooks";
import { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { Address } from "viem";
import { useAccount, useReadContract } from "wagmi";
import { EggsContract } from "../providers/contracts";
const WS_URL = "wss://vote-leaderboard-2a3dbf662016.herokuapp.com"; // "ws://localhost:8000";

export default function useRefresh2(eggs) {
  const documentVisible = useVisibilityChange();

  const [ready, setReady] = useState(0);

  const wS_URL =
    (!documentVisible && ready === 1) || documentVisible ? WS_URL : "wss://";
  // ////console.log((!documentVisible && ready === 1) || documentVisible);

  const { lastJsonMessage, readyState } = useWebSocket(wS_URL, {
    share: true,

    shouldReconnect: () => {
      return documentVisible;
    },

    heartbeat: true,
  });

  useEffect(() => {
    setReady(readyState);
  }, [readyState]);
  const { abi, address } = EggsContract;
  const { address: _address } = useAccount();
  const { data, isSuccess, isPending, isError, error, refetch } =
    useReadContract({
      abi,
      address: address as Address,
      functionName: "SONICtoEGGSNoTrade",
      args: [eggs],
    });

  if (lastJsonMessage && lastJsonMessage !== "ping") {
  }
  refetch();

  return {
    data,
    isSuccess,
  };
}
