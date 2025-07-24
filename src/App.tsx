import { useEffect, useState } from "react";
import DealForm from "./components/DealForm";
import type { DealFormValues, DealResult, Settings } from "./types/dealTypes";
import ResultsDisplay from "./components/Results";
import { logo } from "./assets/index.ts";
import {
  calculateNightlyLet,
  calculatePrivateGuaranteed,
  calculatePRS,
  fetchSettings,
} from "./utils/utils.ts";

function App() {
  const [results, setResults] = useState<DealResult>();
  const [values, setValues] = useState<DealFormValues>();
  const [settings, setSettings] = useState<Settings>();

  const handleCalculate = (values: DealFormValues) => {
    setValues(values);

    const results: DealResult = {
      PRS: calculatePRS(values, settings),
      "Nightly Let": calculateNightlyLet(values, settings),
      "Private Guaranteed": calculatePrivateGuaranteed(values),
    };

    setResults(results);
  };

  async function fetchSetting() {
    const tableData = await fetchSettings();
    setSettings(tableData);
  }

  useEffect(() => {
    fetchSetting();
  }, [settings]);

  return (
    <div className="min-h-screen bg-[#FDF9F6] sm:p-8 p-4">
      <div className="flex mb-6 items-center justify-center gap-3">
        <img src={logo} alt="logo" className="w-[350px] mb-4" />
      </div>
      <div className="flex lg:flex-row flex-col items-start gap-6 justify-center">
        <DealForm onCalculate={handleCalculate} />
        <ResultsDisplay values={values!} results={results!} />
      </div>
    </div>
  );
}

export default App;
