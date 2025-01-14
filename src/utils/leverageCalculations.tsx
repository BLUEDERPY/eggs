import { parseEther, parseUnits } from "viem";

export const FEE_BASE_1000 = 1000;
export const BUY_FEE_REVERSE = 10;
/**
 * Calculates the interest fee in EGGS for a given amount and duration
 * @param amount Amount in EGGS
 * @param numberOfDays Loan duration in days
 * @returns Interest fee in EGGS
 */
export function getInterestFeeInEggs(
  amount: bigint,
  numberOfDays: number
): bigint {
  const interest =
    (BigInt(3900) * BigInt(numberOfDays)) / BigInt(365) + BigInt(100);
  return (amount * interest) / BigInt(100) / BigInt(FEE_BASE_1000);
}

/**
 * Calculates the maximum EGGS amount that can be borrowed for a given fee
 * @param targetFee Target fee amount in EGGS
 * @param numberOfDays Loan duration in days
 * @returns Maximum EGGS amount that can be borrowed
 */
export function getMaxEggsFromFee(
  leverageFee: bigint,
  numberOfDays: number
): bigint {
  // Rearranging the formula from getInterestFeeInEggs:
  // fee = (amount * interest) / 100 / FEE_BASE_1000
  // amount = (fee * 100 * FEE_BASE_1000) / interest
  // Solving for eggs where:
  // leverageFee = mintFee + interest
  // leverageFee = (eggs * BUY_FEE_REVERSE / FEE_BASE_1000) + (eggs * interest / 100 / FEE_BASE_1000)

  const interest = parseUnits(
    ((3900 * numberOfDays) / 365 + 100).toString(),
    1
  );

  // Combine terms:
  // leverageFee = eggs * (BUY_FEE_REVERSE + interest) / (100 * FEE_BASE_1000)
  // eggs = leverageFee * (100 * FEE_BASE_1000) / (BUY_FEE_REVERSE + interest)

  const denominator =
    BigInt(BUY_FEE_REVERSE) * BigInt(FEE_BASE_1000) + interest;
  return (
    ((leverageFee - parseEther("0.001")) *
      BigInt(FEE_BASE_1000) *
      BigInt(FEE_BASE_1000)) /
    denominator
  );
}

/**
 * Calculates the leverage amount in EGGS
 * @param eggs Amount of EGGS
 * @param numberOfDays Loan duration in days
 * @returns Leverage amount in EGGS
 */
export function getleverageFee(eggs: bigint, numberOfDays: number): bigint {
  const mintFee =
    (BigInt(eggs) * BigInt(BUY_FEE_REVERSE)) / BigInt(FEE_BASE_1000);
  const interest = getInterestFeeInEggs(eggs, numberOfDays);
  return mintFee + interest;
}
