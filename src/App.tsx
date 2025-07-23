import { useState } from "react";
import DealForm from "./components/DealForm";
import type { DealFormValues, DealResult } from "./types/dealTypes";
import ResultsDisplay from "./components/Results";
import { logo } from "./assets/index.ts";
import { calculatePRS } from "./utils/utils.ts";

function App() {
  const [results, setResults] = useState<any>();
  const [values, setValues] = useState<DealFormValues>();

  const handleCalculate = (values: DealFormValues) => {
    setValues(values);
    let calculatedResults: DealResult = {
      profitBeforeRiskManagement: 0,
      profitAfterRiskManagement: 0,
      suggestedPaymentToLandlord: 0,
      amountToBorrow: 0,
    };

    // Assuming 'values.model' specifies the type of model (PRS, Nightly Let, etc.)
    if (values.model.includes("PRS")) {
      calculatedResults = calculatePRS(values);
    }
    // You can add more model calculations here (for Nightly Let, Private Guaranteed, etc.)

    setResults(calculatedResults);

    console.log(calculatedResults);
  };

  return (
    <div className="min-h-screen bg-[#FDF9F6] p-8">
      <div className="flex mb-6 items-center justify-center gap-3">
        <img src={logo} alt="logo" />
        <p className="text-3xl font-bold  text-center text-[#112956]">
          Clearstone Homes Property Deal
        </p>
      </div>
      <div className="flex flex-col items-start md:flex-row gap-6 justify-center">
        <DealForm onCalculate={handleCalculate} />
        <ResultsDisplay values={values!} results={results} />
      </div>
    </div>
  );
}

export default App;
