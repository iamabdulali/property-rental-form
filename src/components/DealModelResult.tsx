import { useState } from "react";
import type { DealResult } from "../types/dealTypes";
import BorrowingTableModal from "./BorrowingTable";

interface Props {
  model: keyof DealResult;
  result?: DealResult;
}

export default function DealModelResult({ model, result }: Props) {
  const isNightlyLet = model === "Nightly Let";
  const modelResult = result?.[model];
  const [isOpen, setIsOpen] = useState(false);

  // Type guard for Private Guaranteed
  const isPrivateGuaranteed = (
    data: any
  ): data is DealResult["Private Guaranteed"] => {
    return model === "Private Guaranteed";
  };

  const formatCurrency = (value?: number) => {
    return value?.toFixed ? value.toFixed(2) : "0.00";
  };

  return (
    <div className="bg-[#FAF9F7] p-5 rounded-md shadow-sm border border-gray-200 mb-4">
      <h3 className="sm:text-lg text-base font-bold text-[#112956] mb-2">
        {model}
      </h3>

      {isPrivateGuaranteed(modelResult) ? (
        <>
          <p className="sm:text-base text-sm mb-1 text-[#112956]">
            <strong>Profit:</strong> £{formatCurrency(modelResult.profit)}
          </p>
        </>
      ) : (
        <>
          <p className="sm:text-base text-sm mb-1 text-[#112956]">
            <strong>Profit before risk management:</strong> £
            {formatCurrency(modelResult?.profitBeforeRiskManagement)}
          </p>
          <>
            <p className="sm:text-base text-sm mb-1 text-[#112956]">
              <strong>Profit after risk management:</strong> £
              {formatCurrency(modelResult?.profitAfterRiskManagement)}
            </p>
            <p className="sm:text-base text-sm mb-1 text-[#112956]">
              <strong>Suggested payment to landlord:</strong> £
              {formatCurrency(modelResult?.suggestedPaymentToLandlord)}
            </p>
          </>
          <p className={`sm:text-base text-sm mb-1 text-[#112956] `}>
            <strong>Amount to borrow:</strong>
            <span
              className={`${isNightlyLet ? "font-bold cursor-pointer " : ""}`}
              onClick={isNightlyLet ? () => setIsOpen(true) : undefined}
            >
              £{formatCurrency(modelResult?.amountToBorrow)}
            </span>
          </p>
        </>
      )}
      <BorrowingTableModal isOpen={isOpen} onClose={setIsOpen} />
    </div>
  );
}
