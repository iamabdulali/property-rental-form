export interface DealFormValues {
  propertyAddress: string;
  monthlyRental: number;
  managementStartDate: string;
  rentStartDate: string;
  reserveDate: string;
  referralAmount: number;
  model: DealModelType[];
  localHousingAllowance?: number;
  incentiveAmount?: number;
  nightlyLetRate?: number;
  marketMonthlyRental?: number;
  managementFee?: number;
}

export type DealModelType = "PRS" | "Nightly Let" | "Private Guaranteed";

export interface DealResult {
  profitBeforeRiskManagement?: number;
  profitAfterRiskManagement?: number;
  suggestedPaymentToLandlord?: number;
  amountToBorrow?: number;
}
