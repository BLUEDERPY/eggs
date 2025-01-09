import { useState, useMemo, useContext, useEffect, useCallback } from "react";
import useEggsToSonic from "../../hooks/useEggsToSonic";
import useEggsBalance from "../../hooks/useEggsBalance";
import useBorrow from "../../hooks/useBorrow";
import { GlobalContext } from "../../providers/global-provider";
import useSonicToEggs from "../../hooks/useSonicToEggs";
import useGetLoanFee from "../../hooks/useGetLoanFee";
import { formatEther, parseEther } from "viem";
import useRefresh2 from "../../hooks/useRefresh2";
import useLoanByAddress from "../../hooks/useLoanByAddress";
import { nFormatter } from "../../utils/formatters";
import { getInterestFeeInEggs } from "../../utils/leverageCalculations";
import useRefresh from "../../hooks/useRefresh";

export const useLendingState = () => {
  const { borrow, isPending, isConfirming, isSuccess, isError, isUserError } =
    useBorrow();
  const { status, setStatus } = useContext(GlobalContext);

  const { data: balance, refetch } = useEggsBalance();
  const { data: loan, refetch: refetchLoan } = useLoanByAddress();
  const borrowed = loan ? loan[1] : undefined;
  const minDuration = useMemo(() => {
    if (borrowed) return dateDiff(new Date(Number(loan[2]) * 1000), new Date());
  }, [borrowed, loan]);

  const [duration, _setDuration] = useState(minDuration || 0);
  const { data: covert } = useEggsToSonic();
  const maxEggs =
    balance && covert ? (covert * balance) / parseEther("1") : undefined;
  const max = useMemo(() => {
    if (maxEggs) {
      const maxFee = getInterestFeeInEggs(maxEggs, duration);

      return ((maxEggs - maxFee) * BigInt(99)) / BigInt(100);
    } else {
      return BigInt(0);
    }
  }, [maxEggs, duration]);

  console.log(max);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      refetchLoan();
    }
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

  function dateDiff(date1, date2) {
    const msDiff = date1.getTime() - date2.getTime();
    const days = Math.floor(msDiff / (1000 * 60 * 60 * 24));
    return days;
  }

  const [borrowAmount, _setBorrowAmount] = useState(undefined);
  const setBorrowAmount = (value: string) =>
    useCallback(() => {
      const _val = parseEther(value);
      console.log(max, _val);
      if (max && max > _val) _setBorrowAmount(_val);
      else _setBorrowAmount(parseEther(max));
    }, [max]);
  const { data: _conversionRate, isSuccess: refreshSuccess } = useRefresh2(
    borrowAmount || "0"
  );
  const conversionRate = useMemo(() => {
    if (_conversionRate) {
      return _conversionRate;
    }
  }, [_conversionRate, refreshSuccess]);
  //@ts-expect-error

  const fee = getInterestFeeInEggs(conversionRate || parseEther("0"), duration);
  const additonalFee = getInterestFeeInEggs(
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
      return nFormatter(c, 2); // 120% collateral ratio required
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
    const borrowingFee = fee; // 10% APR
    const protocolFee = conversionRate / BigInt(100); // 0.1% protocol fee
    return {
      borrowingFee: Number(formatEther(borrowingFee)),
      protocolFee: Number(formatEther(protocolFee)),
      total: Number(formatEther(borrowingFee + protocolFee + conversionRate)),
      borrowingFeeRaw: borrowingFee,
      protocolFeeRaw: protocolFee,
      totalRaw: borrowingFee + protocolFee + conversionRate,
    };
  }, [borrowAmount, fee, conversionRate, additonalFee, borrowed]);

  const totalConverted =
    covert && fees?.totalRaw
      ? (covert * fees.totalRaw) / parseEther("1")
      : undefined;

  const maxBorrowAmount = useMemo(() => {
    if (borrowed && borrowed < max) return Number(max - borrowed).toString();
    else if (borrowed && borrowed > max) return "0";
    return Number(max).toString();
  }, [max, borrowed]);

  const isValid = useMemo(() => {
    return Number(borrowAmount) > 0 && duration >= 0 && duration <= 365;
  }, [borrowAmount, max, duration]);

  const errorMessage = useMemo(() => {
    if (Number(borrowAmount) <= 0 && borrowAmount)
      return "Enter a borrow amount";

    if (duration < 0 || duration > 365) {
      return "Duration must be between 0 and 365 days";
    }
    return "";
  }, [borrowAmount, maxBorrowAmount, duration]);

  const handleMaxBorrow = async () => {
    //// console.log(max);
    //// console.log(additonalFee);
    if (additonalFee && additonalFee < max)
      _setBorrowAmount(max - additonalFee);
    else if (additonalFee && additonalFee > max) setBorrowAmount("0");
    else _setBorrowAmount(max);
  };

  const setDuration = (_durattion) => {
    _setDuration(_durattion);
  };

  const handleBorrow = async () => {
    borrow(totalConverted, duration);
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
    borrowAmount: borrowAmount > max ? max : borrowAmount,
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
