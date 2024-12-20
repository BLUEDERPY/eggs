import { useState, useMemo, useContext, useEffect } from "react";
import useEggsToSonic from "../../hooks/useEggsToSonic";
import useEggsBalance from "../../hooks/useEggsBalance";
import useBorrow from "../../hooks/useBorrow";
import { GlobalContext } from "../../providers/global-provider";
import useSonicToEggs from "../../hooks/useSonicToEggs";
import useGetLoanFee from "../../hooks/useGetLoanFee";
import { formatEther, parseEther } from "viem";

export const useLendingState = () => {
  const [duration, setDuration] = useState(0);
  const { borrow, isPending, isConfirming, isSuccess, isError, isUserError } =
    useBorrow();
  const { status, setStatus } = useContext(GlobalContext);

  useEffect(() => {
    if (isSuccess) refetch();
    setStatus(
      isError
        ? "ERROR"
        : isUserError
        ? "ERROR"
        : isSuccess
        ? "SUCCESS"
        : isConfirming
        ? "CONFIRMING"
        : isPending
        ? "PENDING"
        : "NONE",
      isError
        ? `There was an error with your transaction on the blockchain`
        : isUserError
        ? "There was an error with your transaction. "
        : isSuccess
        ? `Success`
        : isConfirming
        ? `Blockchain transaction is confirming`
        : isPending
        ? `Your transaction is pending`
        : ""
    );
  }, [isError, isUserError, isSuccess, isConfirming, isPending]);

  const { data: balance, refetch } = useEggsBalance();
  const { data: max } = useEggsToSonic(balance);
  const [borrowAmount, _setBorrowAmount] = useState(undefined);
  const setBorrowAmount = (value: string) => {
    _setBorrowAmount(parseEther(value));
  };
  const { data: conversionRate } = useSonicToEggs(borrowAmount || "0");

  //@ts-expect-error
  const { data: fee } = useGetLoanFee(conversionRate, duration);

  const isTransactionOccuring = useMemo(() => {
    return status !== "NONE"; // 120% collateral ratio required
  }, [status]);

  const collateralRequired = useMemo(() => {
    if (!borrowAmount || !conversionRate || !fee) return 0;
    const amount = Number(formatEther(borrowAmount));
    const borrowingFee = Number(formatEther(fee)); // 10% APR
    const rate = Number(formatEther(conversionRate));
    return rate - amount - borrowingFee; // 120% collateral ratio required
  }, [borrowAmount, conversionRate, fee]);
  1;
  const fees = useMemo(() => {
    if (!borrowAmount || !fee || !conversionRate)
      return { borrowingFee: 0, protocolFee: 0, total: 0 };
    const amount = Number(formatEther(borrowAmount));
    const borrowingFee = Number(formatEther(fee)); // 10% APR
    const protocolFee = amount * 0.99; // 0.1% protocol fee
    return {
      borrowingFee,
      protocolFee,
      total: Number(formatEther(conversionRate)),
    };
  }, [borrowAmount, fee, conversionRate]);

  const maxBorrowAmount = useMemo(() => {
    return Number(max).toString();
  }, [max]);

  const isValid = useMemo(() => {
    return (
      Number(borrowAmount) > 0 &&
      Number(borrowAmount) <= Number(maxBorrowAmount) &&
      duration >= 0 &&
      duration <= 365
    );
  }, [borrowAmount, maxBorrowAmount, duration]);

  const errorMessage = useMemo(() => {
    if (Number(borrowAmount) <= 0 && borrowAmount)
      return "Enter a borrow amount";
    if (Number(borrowAmount) > Number(maxBorrowAmount)) {
      return "Borrow amount exceeds maximum allowed";
    }
    if (duration < 0 || duration > 365) {
      return "Duration must be between 0 and 365 days";
    }
    return "";
  }, [borrowAmount, maxBorrowAmount, duration]);

  const handleMaxBorrow = () => {
    _setBorrowAmount(max);
  };

  const handleBorrow = async () => {
    borrow(borrowAmount, duration);
  };
  const onRepay = async () => {
    borrow(borrowAmount, duration);
  };
  const onExtend = async () => {
    borrow(borrowAmount, duration);
  };
  const onClose = async () => {
    borrow(borrowAmount, duration);
  };
  return {
    borrowAmount,
    setBorrowAmount,
    duration,
    setDuration,
    collateralRequired,
    fees,
    isValid,
    errorMessage,
    handleMaxBorrow,
    handleBorrow,
    isTransactionOccuring,
    balance,
    onRepay,
    onExtend,
    onClose,
  };
};
