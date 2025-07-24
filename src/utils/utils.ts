import type { DealFormValues, DealResult, Settings } from "../types/dealTypes";
import { createClient } from "@supabase/supabase-js";

const DEFAULT_SETTINGS: Settings = {
  numberOfMonthsCovered: 0,
  percentLastMonthPayment: 0,
  monthsBuffer: 0,
};

export function calculatePRS(
  values: DealFormValues,
  settings: Settings = DEFAULT_SETTINGS
): DealResult["PRS"] {
  const {
    localHousingAllowance = 0,
    incentiveAmount = 0,
    rentStartDate,
    reserveDate,
    referralAmount = 0,
    monthlyRental = 0,
  } = values;

  const dateDifference = calculateDateDifference(rentStartDate, reserveDate);
  const { numberOfMonthsCovered, percentLastMonthPayment } = settings;

  const profitBeforeRiskManagement =
    (localHousingAllowance * 52) / 12 +
    incentiveAmount / 24 -
    monthlyRental +
    (dateDifference * (localHousingAllowance / 7)) / 24 -
    referralAmount / 24;

  const profitAfterRiskManagement =
    profitBeforeRiskManagement -
    Math.max(
      0,
      ((localHousingAllowance * 52) / 12) * (numberOfMonthsCovered / 24) -
        (percentLastMonthPayment * monthlyRental) / 24
    );

  const suggestedPaymentToLandlord = (localHousingAllowance * 52) / 12 + 100;

  const amountToBorrow = 0;

  return {
    profitBeforeRiskManagement,
    profitAfterRiskManagement,
    suggestedPaymentToLandlord,
    amountToBorrow,
  };
}

export function calculateNightlyLet(
  values: DealFormValues,
  settings: Settings = DEFAULT_SETTINGS
): DealResult["Nightly Let"] {
  const { monthsBuffer } = settings;

  const {
    localHousingAllowance = 0,
    rentStartDate,
    reserveDate,
    monthlyRental = 0,
    nightlyLetRate = 0,
  } = values;

  // Calculate days from rent start date to end of month
  const rentStart = new Date(rentStartDate);
  const endOfMonth = new Date(
    rentStart.getFullYear(),
    rentStart.getMonth() + 1,
    0
  );
  const daysToMonthEnd =
    (endOfMonth.getTime() - rentStart.getTime()) / (1000 * 3600 * 24);

  // First borrowing component
  const firstComponent = (daysToMonthEnd / (365 / 12)) * monthlyRental + 300;

  // Calculate days from reserve date to end of month
  const reserve = new Date(reserveDate);
  const daysReserveToMonthEnd =
    (endOfMonth.getTime() - reserve.getTime()) / (1000 * 3600 * 24);

  // Second borrowing component (24th month)
  const secondComponent = Math.max(
    0,
    300 - (daysReserveToMonthEnd * nightlyLetRate - monthlyRental)
  );

  // Total amount to borrow
  const amountToBorrow = firstComponent + secondComponent;

  // Date difference for profit calculation
  const dateDifference = calculateDateDifference(rentStartDate, reserveDate);

  // Profit calculations
  const profitBeforeRiskManagement =
    (nightlyLetRate * 7 * 52) / 12 +
    (dateDifference * nightlyLetRate) / 12 -
    monthlyRental;

  const profitAfterRiskManagement =
    profitBeforeRiskManagement -
    (monthlyRental * monthsBuffer) / 12 - // monthsBuffer = 0.5
    amountToBorrow / 12;

  // Suggested payment to landlord
  const suggestedPaymentToLandlord = (localHousingAllowance * 52) / 12 + 150;

  return {
    profitBeforeRiskManagement,
    profitAfterRiskManagement,
    suggestedPaymentToLandlord,
    amountToBorrow,
  };
}

function calculatePrivateGuaranteedProfit(values: DealFormValues): number {
  const { marketMonthlyRental = 0, managementFee = 0 } = values;
  return marketMonthlyRental * (managementFee / 100);
}

export function calculatePrivateGuaranteed(
  values: DealFormValues
): DealResult["Private Guaranteed"] {
  const profit = calculatePrivateGuaranteedProfit(values);

  return {
    profit,
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

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function fetchSettings(): Promise<Settings> {
  const { data, error } = await supabase.from("settings").select("key, value");

  if (error) {
    console.error("Error fetching settings:", error);
    return DEFAULT_SETTINGS;
  }

  // Convert array to key-value map
  const settings: Settings = DEFAULT_SETTINGS;
  data.forEach((row) => {
    if (row.key in settings) {
      (settings as any)[row.key] = parseFloat(row.value);
    }
  });

  return settings;
}
