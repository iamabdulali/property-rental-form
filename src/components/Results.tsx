import type { DealFormValues, DealResult } from "../types/dealTypes";
import DealModelResult from "./DealModelResult";

interface Props {
  values: DealFormValues;
  results: DealResult;
}

export default function ResultsDisplay({ values, results }: Props) {
  if (!values) return <></>;
  return values.model.length == 0 ? (
    <></>
  ) : (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4 w-4/12">
      <h2 className="text-2xl font-semibold text-[#112956]">Results</h2>
      <div className=" mt-6">
        {values?.model.includes("PRS") && (
          <DealModelResult model="PRS" result={results} />
        )}

        {values?.model.includes("Nightly Let") && (
          <DealModelResult model="Nightly Let" />
        )}

        {values?.model.includes("Private Guaranteed") && (
          <DealModelResult model="Private Guaranteed" />
        )}
      </div>
    </div>
  );
}
