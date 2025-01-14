import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { useReadContract, useAccount, useBalance } from "wagmi";
import { EggsContract } from "./contracts";
import { Address, parseEther } from "viem";
import useWriteContractAndWaitForConfirm from "../hooks/useWriteContractAndWaitForConfirm";

interface EggsContextType {
  // Protocol data
  totalSupply: bigint | undefined;
  maxSupply: bigint | undefined;
  totalBorrowed: bigint | undefined;
  totalCollateral: bigint | undefined;
  backing: bigint | undefined;
  lastPrice: bigint | undefined;

  // User data
  userLoan:
    | {
        collateral: bigint;
        borrowed: bigint;
        endDate: bigint;
      }
    | undefined;
  userEggsBalance: bigint | undefined;
  userSonicBalance: bigint | undefined;

  // Actions
  refetch: () => void;
  buy: (sonicAmount: string) => void;
  sell: (eggsAmount: string) => void;
  extendLoan: (eggsAmount: string, duration: number) => void;
  removeCollateral: (eggsAmount: string) => void;
  borrow: (eggsAmount: string, duration: number) => void;
  leverage: () => void;
  closePosition: () => void;
  flashClosePosition: () => void;
  isSuccess: boolean | undefined;
  isConfirming: boolean | undefined;
  isPending: boolean | undefined;
  isUserError: boolean | undefined;
  isError: boolean | undefined;
}

const EggsContext = createContext<EggsContextType>({
  totalSupply: undefined,
  maxSupply: undefined,
  totalBorrowed: undefined,
  totalCollateral: undefined,
  backing: undefined,
  lastPrice: undefined,
  userLoan: undefined,
  userEggsBalance: undefined,
  userSonicBalance: undefined,
  refetch: () => {},
  buy: () => {},
  sell: () => {},
  borrow: () => {},
  leverage: () => {},
  closePosition: () => {},
  flashClosePosition: () => {},
  removeCollateral: () => {},
  extendLoan: () => {},
  isSuccess: undefined,
  isConfirming: undefined,
  isPending: undefined,
  isUserError: undefined,
  isError: undefined,
});

export const useEggsData = () => useContext(EggsContext);

export const EggsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { address: userAddress, isConnected } = useAccount();

  // Protocol data reads
  const { data: totalSupply, refetch: refetchTotalSupply } = useReadContract({
    abi: EggsContract.abi,
    address: EggsContract.address as Address,
    functionName: "totalSupply",
  });

  const { data: maxSupply, refetch: refetchMaxSupply } = useReadContract({
    abi: EggsContract.abi,
    address: EggsContract.address as Address,
    functionName: "maxSupply",
  });

  const { data: totalBorrowed, refetch: refetchTotalBorrowed } =
    useReadContract({
      abi: EggsContract.abi,
      address: EggsContract.address as Address,
      functionName: "getTotalBorrowed",
    });

  const { data: totalCollateral, refetch: refetchTotalCollateral } =
    useReadContract({
      abi: EggsContract.abi,
      address: EggsContract.address as Address,
      functionName: "getTotalCollateral",
    });

  const { data: backing, refetch: refetchBacking } = useReadContract({
    abi: EggsContract.abi,
    address: EggsContract.address as Address,
    functionName: "getBacking",
  });

  const { data: lastPrice, refetch: refetchLastPrice } = useReadContract({
    abi: EggsContract.abi,
    address: EggsContract.address as Address,
    functionName: "lastPrice",
  });

  // User data reads
  const { data: userLoan, refetch: refetchUserLoan } = useReadContract({
    abi: EggsContract.abi,
    address: EggsContract.address as Address,
    functionName: "getLoanByAddress",
    args: [userAddress],
    enabled: isConnected,
  });

  const { data: userEggsBalance, refetch: refetchUserEggsBalance } =
    useReadContract({
      abi: EggsContract.abi,
      address: EggsContract.address as Address,
      functionName: "balanceOf",
      args: [userAddress],
      enabled: isConnected,
    });

  const { data: ethBalance, refetch: refetchEthBalance } = useBalance({
    address: userAddress,
    enabled: isConnected,
  });

  const {
    writeContract,
    isError,
    isSuccess,
    isConfirming,
    isPending,
    isUserError,
    reset,
  } = useWriteContractAndWaitForConfirm("");
  const { abi, address } = EggsContract;

  const buy = (sonicAmount: string) => {
    writeContract({
      abi,
      address: address as Address,
      functionName: "buy",
      args: [userAddress],
      value: parseEther(sonicAmount),
    });
  };
  const sell = (eggAmount: string) => {
    writeContract({
      abi,
      address: address as Address,
      functionName: "sell",
      args: [userEggsBalance < eggAmount ? userEggsBalance : eggAmount],
    });
  };

  const borrow = (sonicAmount: bigint, days: number) => {
    writeContract({
      abi,
      address: address as Address,
      functionName: "borrow",
      args: [sonicAmount, days],
    });
  };

  const leverage = (sonic, days, _fee) => {
    //// console.log(formatEther(sonic || "0"));
    //// console.log(formatEther(_fee || "0"));
    //// console.log(days);
    writeContract({
      abi,
      address: address as Address,
      functionName: "leverage",
      args: [sonic, days],
      value: _fee,
    });
  };
  const closePosition = () => {
    writeContract({
      abi,
      address: address as Address,
      functionName: "closePosition",
      args: [],
      value: userLoan[1],
    });
  };

  const flashClosePosition = () => {
    writeContract({
      abi,
      address: address as Address,
      functionName: "flashClosePosition",
      args: [],
    });
  };
  const removeCollateral = (amount: string) => {
    const collateral = parseEther(amount.toString());
    writeContract({
      abi,
      address: address as Address,
      functionName: "removeCollateral",
      args: [collateral],
    });
  };
  const extendLoan = (days: number, fee: string) => {
    writeContract({
      abi,
      address: address as Address,
      functionName: "extendLoan",
      args: [days],
      value: parseEther(fee),
    });
  };

  // Set up websocket listener for price events

  const refetchAll = () => {
    // Protocol data
    refetchTotalSupply();
    refetchMaxSupply();
    refetchTotalBorrowed();
    refetchTotalCollateral();
    refetchBacking();
    refetchLastPrice();

    refetchUserLoan();
    refetchUserEggsBalance();
    refetchEthBalance();
  };
  console.log(isSuccess);
  useEffect(() => {
    if (isSuccess) {
      console.log(1);
      refetchAll();
    }
  }, [isSuccess]);

  return (
    <EggsContext.Provider
      value={{
        // Protocol data
        totalSupply,
        maxSupply,
        totalBorrowed,
        totalCollateral,
        backing,
        lastPrice,
        buy,
        sell,
        borrow,
        leverage,
        extendLoan,
        closePosition,
        flashClosePosition,
        removeCollateral,
        isSuccess,
        isConfirming,
        isPending,
        isUserError,
        isError,

        // User data
        userLoan: userLoan as
          | { collateral: bigint; borrowed: bigint; endDate: bigint }
          | undefined,
        userEggsBalance:
          userEggsBalance && userEggsBalance > BigInt(1000)
            ? userEggsBalance
            : undefined,
        userSonicBalance: ethBalance,

        // Actions
        refetch: refetchAll,
      }}
    >
      {children}
    </EggsContext.Provider>
  );
};
