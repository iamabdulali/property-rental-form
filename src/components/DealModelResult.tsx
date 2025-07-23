import type { DealResult } from "../types/dealTypes";

interface Props {
  model: string;
  result?: DealResult;
}

export default function DealModelResult({ model, result }: Props) {
  return (
    <div className="bg-[#FAF9F7] p-5 rounded-md shadow-sm  border border-gray-200 mb-4">
      <h3 className="text-lg font-bold text-[#112956] mb-2">{model}</h3>
      <p className=" text-base mb-1 text-[#112956]">
        <strong>Profit before risk management:</strong> £
        {result?.profitBeforeRiskManagement?.toFixed(2) || 0}
      </p>
      {model != "Private Guaranteed" ? (
        <>
          {" "}
          <p className=" text-base mb-1 text-[#112956]">
            <strong>Profit after risk management:</strong> £
            {result?.profitAfterRiskManagement?.toFixed(2) || 0}
          </p>
          <p className=" text-base mb-1 text-[#112956]">
            <strong>Suggested payment to landlord:</strong> £
            {result?.suggestedPaymentToLandlord?.toFixed(2) || 0}
          </p>
        </>
      ) : (
        ""
      )}

      <p className=" text-base mb-1 text-[#112956]">
        <strong>Amount to borrow:</strong>£{result?.amountToBorrow || 0}
      </p>
    </div>
  );
}
