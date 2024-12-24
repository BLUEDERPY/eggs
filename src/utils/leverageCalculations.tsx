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
    (BigInt(2490) * BigInt(numberOfDays)) / BigInt(365) + BigInt(50);
  return (amount * interest) / BigInt(100) / BigInt(FEE_BASE_1000);
}

/**
 * Calculates the maximum EGGS amount that can be borrowed for a given fee
 * @param targetFee Target fee amount in EGGS
 * @param numberOfDays Loan duration in days
 * @returns Maximum EGGS amount that can be borrowed
 */
export function getMaxEggsFromFee(
  leverageAmount: bigint,
  numberOfDays: number
): bigint {
  // Rearranging the formula from getInterestFeeInEggs:
  // fee = (amount * interest) / 100 / FEE_BASE_1000
  // amount = (fee * 100 * FEE_BASE_1000) / interest
  // Solving for eggs where:
  // leverageAmount = mintFee + interest
  // leverageAmount = (eggs * BUY_FEE_REVERSE / FEE_BASE_1000) + (eggs * interest / 100 / FEE_BASE_1000)

  const interest = parseUnits(((2490 * numberOfDays) / 365 + 50).toString(), 1);

  // Combine terms:
  // leverageAmount = eggs * (BUY_FEE_REVERSE + interest) / (100 * FEE_BASE_1000)
  // eggs = leverageAmount * (100 * FEE_BASE_1000) / (BUY_FEE_REVERSE + interest)

  const denominator =
    BigInt(BUY_FEE_REVERSE) * BigInt(FEE_BASE_1000) + interest;
  return (
    (leverageAmount * BigInt(FEE_BASE_1000) * BigInt(FEE_BASE_1000)) /
    denominator
  );
}

/**
 * Calculates the leverage amount in EGGS
 * @param eggs Amount of EGGS
 * @param numberOfDays Loan duration in days
 * @returns Leverage amount in EGGS
 */
export function getLeverageAmount(eggs: bigint, numberOfDays: number): bigint {
  const mintFee =
    (BigInt(eggs) * BigInt(BUY_FEE_REVERSE)) / BigInt(FEE_BASE_1000);
  const interest = getInterestFeeInEggs(eggs, numberOfDays);
  return mintFee + interest;
}
