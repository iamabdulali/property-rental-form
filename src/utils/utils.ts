import type { DealFormValues, DealResult } from "../types/dealTypes";

export function calculatePRS(values: DealFormValues): DealResult {
  const {
    localHousingAllowance,
    incentiveAmount,
    rentStartDate,
    reserveDate,
    referralAmount,
    monthlyRental,
  } = values;
  const numberOfMonthsCovered = 2;
  const percentLastMonthPayment = 50;
  const amountForLandlordLastPayment = 500;
  const dateDifference = calculateDateDifference(rentStartDate, reserveDate);
  console.log(dateDifference);

  const profitBeforeRiskManagement =
    (localHousingAllowance! * 52) / 12 +
    incentiveAmount! / 24 -
    monthlyRental +
    (dateDifference * (localHousingAllowance! / 7)) / 24 -
    referralAmount! / 24;

  const profitAfterRiskManagement =
    profitBeforeRiskManagement -
    Math.max(
      0,
      (monthlyRental -
        ((localHousingAllowance! * 52) / 12) * numberOfMonthsCovered) /
        24 -
        (percentLastMonthPayment * amountForLandlordLastPayment) / 24
    );

  const suggestedPaymentToLandlord = (localHousingAllowance! * 52) / 12 + 100;

  const amountToBorrow = 0;

  return {
    profitBeforeRiskManagement,
    profitAfterRiskManagement,
    suggestedPaymentToLandlord,
    amountToBorrow,
  };
}

function calculateDateDifference(startDate: string, endDate: string): number {
  // Convert the string dates to Date objects
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Calculate the time difference in milliseconds
  const timeDifference = end.getTime() - start.getTime();

  // Convert milliseconds to days (1 day = 24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
  const daysDifference = timeDifference / (1000 * 3600 * 24);

  return Math.abs(daysDifference);
}
