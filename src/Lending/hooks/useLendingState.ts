import { useState, useMemo, useContext, useEffect } from "react";
import useEggsToSonic from "../../hooks/useEggsToSonic";
import useEggsBalance from "../../hooks/useEggsBalance";
import useBorrow from "../../hooks/useBorrow";
import { GlobalContext } from "../../providers/global-provider";
import useSonicToEggs from "../../hooks/useSonicToEggs";
import useGetLoanFee from "../../hooks/useGetLoanFee";
import { formatEther, parseEther } from "viem";
import useRefresh2 from "../../hooks/useRefresh2";
import useLoanByAddress from "../../hooks/useLoanByAddress";

export const useLendingState = () => {
  const { borrow, isPending, isConfirming, isSuccess, isError, isUserError } =
    useBorrow();
  const { status, setStatus } = useContext(GlobalContext);

  const { data: balance, refetch } = useEggsBalance();
  const { data: max } = useEggsToSonic(balance);
  const { data: loan, refetch: refetchLoan } = useLoanByAddress();
  useEffect(() => {
    if (isSuccess) {
      refetch();
      refetchLoan();
    }
    /*setStatus(
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
    );*/
  }, [isError, isUserError, isSuccess, isConfirming, isPending]);

  function dateDiff(date1, date2) {
    const msDiff = date1.getTime() - date2.getTime();
    const days = Math.floor(msDiff / (1000 * 60 * 60 * 24));
    return days;
  }

  const borrowed = loan ? loan[1] : undefined;
  const [borrowAmount, _setBorrowAmount] = useState(undefined);
  const setBorrowAmount = (value: string) => {
    _setBorrowAmount(parseEther(value));
  };
  const { data: _conversionRate, isSuccess: refreshSuccess } = useRefresh2(
    borrowAmount || "0"
  );
  const conversionRate = useMemo(() => {
    if (_conversionRate)
      return parseEther(Number(formatEther(_conversionRate)).toFixed(4));
  }, [_conversionRate, refreshSuccess]);
  //@ts-expect-error

  const minDuration = useMemo(() => {
    if (borrowed) return dateDiff(new Date(Number(loan[2]) * 1000), new Date());
  }, [borrowed, loan]);

  const [duration, _setDuration] = useState(minDuration || 0);

  const { data: fee } = useGetLoanFee(conversionRate, duration);
  const { data: additonalFee } = useGetLoanFee(
    borrowed || parseEther("0"),
    borrowed
      ? dateDiff(new Date(Number(loan[2]) * 1000), new Date()) - duration - 1
      : 0
  );
  const isTransactionOccuring = useMemo(() => {
    return status !== "NONE"; // 120% collateral ratio required
  }, [status]);

  const collateralRequired = useMemo(() => {
    if (borrowAmount && conversionRate && fee) {
      const amount = Number(formatEther(borrowAmount));
      const borrowingFee = Number(formatEther(fee)); // 10% APR
      const rate = Number(formatEther(conversionRate));
      const c = rate - amount - borrowingFee;
      return c.toFixed(2); // 120% collateral ratio required
    }
  }, [borrowAmount, conversionRate, fee]);
  1;
  const fees = useMemo(() => {
    if (!borrowAmount || !conversionRate || !fee)
      return {
        borrowingFee: 0,
        protocolFee: 0,
        total: 0,
      };
    const _additonalFee = additonalFee ? Number(formatEther(additonalFee)) : 0;
    const amount = Number(formatEther(borrowAmount));
    const borrowingFee = Number(formatEther(fee)) + _additonalFee; // 10% APR
    const protocolFee = amount * 0.99; // 0.1% protocol fee
    return {
      borrowingFee: borrowingFee.toFixed(4),
      protocolFee: protocolFee.toFixed(4),
      total: Number(formatEther(conversionRate)).toFixed(4),
    };
  }, [borrowAmount, fee, conversionRate, additonalFee]);

  const maxBorrowAmount = useMemo(() => {
    if (borrowed && borrowed < max) return Number(max - borrowed).toString();
    else if (borrowed && borrowed > max) return "0";
    return Number(max).toString();
  }, [max, borrowed]);

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

  const handleMaxBorrow = async () => {
    console.log(max);
    console.log(additonalFee);
    if (additonalFee && additonalFee < max)
      _setBorrowAmount(max - additonalFee);
    else if (additonalFee && additonalFee > max) setBorrowAmount("0");
    else _setBorrowAmount(max);
  };

  const setDuration = (_durattion) => {
    _setDuration(_durattion);
    console.log(max);
    console.log(borrowAmount);
    if (max > borrowAmount) setBorrowAmount(maxBorrowAmount);
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
    minDuration,
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
