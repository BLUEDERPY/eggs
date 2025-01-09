import { useVisibilityChange } from "@uidotdev/usehooks";
import { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { Address, formatEther, parseEther } from "viem";
import { useAccount, useReadContract } from "wagmi";
import { EggsContract } from "../providers/contracts";
const WS_URL = "wss://eggs-64815067aa3c.herokuapp.com/"; //"ws://localhost:8000"; //"wss://eggs-64815067aa3c.herokuapp.com/"; //

export default function useRefresh(eggs) {
  const documentVisible = useVisibilityChange();

  const wS_URL = !documentVisible || documentVisible ? WS_URL : "wss://";
  // ////console.log((!documentVisible && ready === 1) || documentVisible);

  const { lastJsonMessage } = useWebSocket(wS_URL, {
    share: true,

    shouldReconnect: () => {
      return documentVisible;
    },

    heartbeat: true,
  });

  const { abi, address } = EggsContract;
  const { address: _address } = useAccount();

  const price =
    lastJsonMessage &&
    lastJsonMessage !== "ping" &&
    lastJsonMessage.data &&
    lastJsonMessage.data !== "ping"
      ? parseEther(
          (
            (Number(formatEther(eggs)) *
              lastJsonMessage.data[lastJsonMessage.data.length - 1].high) /
            1000000000000
          ).toFixed(4)
        )
      : undefined;
  // console.log(lastJsonMessage?.data);

  return {
    data: price && Number(formatEther(price)) > 0 ? price : undefined,
    isSuccess: price && Number(formatEther(price)) > 0,
  };
}
