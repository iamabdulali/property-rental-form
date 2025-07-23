import { Controller, useForm } from "react-hook-form";
import type { DealFormValues, DealModelType } from "../types/dealTypes";
import Select from "react-select";

interface Props {
  onCalculate: (values: DealFormValues) => void;
}

interface Option {
  value: string;
  label: string;
}

const options: Option[] = [
  { value: "PRS", label: "PRS" },
  { value: "Nightly Let", label: "Nightly Let" },
  { value: "Private Guaranteed", label: "Private Guaranteed" },
];

export default function DealForm({ onCalculate }: Props) {
  const { control, register, handleSubmit, watch } = useForm<DealFormValues>({
    defaultValues: {
      model: [],
    },
  });
  const model: DealModelType[] = watch("model").map((o) => o) || [];

  const labelStyle = "block text-base mb-1 font-medium text-[#112956]";
  const inputStyle =
    "w-full px-4 py-2 border border-gray-300 rounded-md  text-[#112956]";

  return (
    <>
      <form
        onSubmit={handleSubmit(onCalculate)}
        className="bg-white p-6 rounded-lg shadow-md space-y-4 w-6/12"
      >
        <h2 className="text-2xl font-semibold text-[#112956]">Inputs</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="propertyAddress" className={labelStyle}>
              Property Address
            </label>
            <input
              {...register("propertyAddress", { required: true })}
              className={inputStyle}
              autoComplete="address"
              id="propertyAddress"
            />
          </div>

          <div>
            <label htmlFor="monthlyRental" className={labelStyle}>
              Monthly Rental Payment to Landlord
            </label>
            <input
              {...register("monthlyRental", { required: true })}
              type="number"
              className={inputStyle}
              id="monthlyRental"
            />
          </div>

          <div>
            <label htmlFor="managementStartDate" className={labelStyle}>
              Management Start Date
            </label>
            <input
              {...register("managementStartDate", { required: true })}
              type="date"
              className={inputStyle}
              id="managementStartDate"
            />
          </div>

          <div>
            <label htmlFor="rentStartDate" className={labelStyle}>
              Rent Start Date
            </label>
            <input
              {...register("rentStartDate", { required: true })}
              type="date"
              className={inputStyle}
              id="rentStartDate"
            />
          </div>

          <div>
            <label htmlFor="reserveDate" className={labelStyle}>
              Reserve Date
            </label>
            <input
              {...register("reserveDate", { required: true })}
              type="date"
              className={inputStyle}
              id="reserveDate"
            />
          </div>

          <div>
            <label htmlFor="referralAmount" className={labelStyle}>
              Referral Amount
            </label>
            <input
              {...register("referralAmount", { required: true })}
              type="number"
              className={inputStyle}
              id="referralAmount"
            />
          </div>

          <div>
            <label htmlFor="model" className={labelStyle}>
              Deal Model
            </label>
            <Controller
              name="model"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  isMulti
                  options={options}
                  value={options.filter((opt) =>
                    field.value.includes(opt.value as DealModelType)
                  )}
                  onChange={(selected) => {
                    field.onChange(selected.map((opt) => opt.value));
                  }}
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              )}
            />
          </div>

          {model.includes("PRS") && (
            <>
              <div>
                <label htmlFor="localHousingAllowance" className={labelStyle}>
                  Local Housing Allowance
                </label>
                <input
                  {...register("localHousingAllowance", { required: true })}
                  type="number"
                  className={inputStyle}
                  id="localHousingAllowance"
                />
              </div>

              <div>
                <label htmlFor="incentiveAmount" className={labelStyle}>
                  Incentive Amount
                </label>
                <input
                  {...register("incentiveAmount", { required: true })}
                  type="number"
                  className={inputStyle}
                  id="incentiveAmount"
                />
              </div>
            </>
          )}

          {model.includes("Nightly Let") && (
            <div>
              <label htmlFor="nightlyLetRate" className={labelStyle}>
                Nightly Let Rate
              </label>
              <input
                {...register("nightlyLetRate", { required: true })}
                type="number"
                className={inputStyle}
                id="nightlyLetRate"
              />
            </div>
          )}

          {model.includes("Private Guaranteed") && (
            <>
              <div>
                <label htmlFor="marketMonthlyRental" className={labelStyle}>
                  Market Monthly Rental
                </label>
                <input
                  {...register("marketMonthlyRental", { required: true })}
                  type="number"
                  className={inputStyle}
                  id="marketMonthlyRental"
                />
              </div>

              <div>
                <label htmlFor="managementFee" className={labelStyle}>
                  Management Fee
                </label>
                <input
                  {...register("managementFee", { required: true })}
                  type="number"
                  className={inputStyle}
                  id="managementFee"
                />
              </div>
            </>
          )}
        </div>

        <button
          type="submit"
          className=" ml-auto block bg-[#053158] hover:bg-[#0759a2] text-white font-medium py-2 px-4 rounded-md transition"
        >
          Calculate
        </button>
      </form>
    </>
  );
}
