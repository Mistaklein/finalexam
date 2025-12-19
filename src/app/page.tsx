"use client";

import * as React from "react";
import {
  User,
  Users,
  DollarSign,
  Calculator,
  Heart,
  AlertCircle,
} from "lucide-react";
import clsx from "clsx";

interface FormData {
  employeeName: string;
  maritalStatus: "single" | "married" | "";
  dependents: number | "";
}

interface CalculationResult {
  grossPay: number;
  federalTax: number;
  socialSecurity: number;
  medicare: number;
  netPay: number;
}

export default function PayrollCalculator() {
  const [formData, setFormData] = React.useState<FormData>({
    employeeName: "",
    maritalStatus: "",
    dependents: "",
  });

  const [result, setResult] = React.useState<CalculationResult | null>(null);
  const [hourlyRate, setHourlyRate] = React.useState<number | string>("");
  const [hoursWorked, setHoursWorked] = React.useState<number | string>("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "dependents") {
      setFormData((prev) => ({
        ...prev,
        [name]: value ? parseInt(value) : "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const calculatePayroll = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.employeeName ||
      !formData.maritalStatus ||
      formData.dependents === "" ||
      !hourlyRate ||
      !hoursWorked
    ) {
      alert("Please fill in all fields");
      return;
    }

    const gross = (Number(hourlyRate) * Number(hoursWorked));
    
    // Simplified tax calculation
    let federalTax = gross * 0.12; // 12% federal
    const dependentDeduction = Number(formData.dependents) * 50;
    
    if (formData.maritalStatus === "married") {
      federalTax *= 0.85; // 15% reduction for married
    }
    
    federalTax = Math.max(federalTax - dependentDeduction, 0);
    const socialSecurity = gross * 0.062; // 6.2% SS
    const medicare = gross * 0.0145; // 1.45% Medicare
    const netPay = gross - federalTax - socialSecurity - medicare;

    setResult({
      grossPay: gross,
      federalTax,
      socialSecurity,
      medicare,
      netPay,
    });
  };

  const resetForm = () => {
    setFormData({
      employeeName: "",
      maritalStatus: "",
      dependents: "",
    });
    setHourlyRate("");
    setHoursWorked("");
    setResult(null);
  };

  return (
    <div className="min-h-screen w-full bg-[var(--color-background)] text-[var(--color-text)] py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Calculator
              size={32}
              className="text-[var(--color-primary)]"
            />
            <h1 className="text-4xl font-bold text-[var(--color-primary)]">
              Payroll Calculator
            </h1>
          </div>
          <p className="text-[var(--color-text-secondary)] text-lg">
            Calculate employee payroll with deductions and withholdings
          </p>
        </div>

        {/* Main Container */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Form Section */}
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <User size={20} />
              Employee Information
            </h2>

            <form onSubmit={calculatePayroll} className="space-y-4">
              {/* Employee Name */}
              <div>
                <label className="block text-sm font-medium mb-2 text-[var(--color-text)]">
                  Employee Name
                </label>
                <input
                  type="text"
                  name="employeeName"
                  value={formData.employeeName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-2 rounded-md border border-[var(--color-border)] bg-white text-[var(--color-text)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition"
                />
              </div>

              {/* Hourly Rate */}
              <div>
                <label className="block text-sm font-medium mb-2 text-[var(--color-text)]">
                  Hourly Rate ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  placeholder="25.00"
                  className="w-full px-4 py-2 rounded-md border border-[var(--color-border)] bg-white text-[var(--color-text)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition"
                />
              </div>

              {/* Hours Worked */}
              <div>
                <label className="block text-sm font-medium mb-2 text-[var(--color-text)]">
                  Hours Worked
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={hoursWorked}
                  onChange={(e) => setHoursWorked(e.target.value)}
                  placeholder="40"
                  className="w-full px-4 py-2 rounded-md border border-[var(--color-border)] bg-white text-[var(--color-text)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition"
                />
              </div>

              {/* Marital Status */}
              <div>
                <label className="block text-sm font-medium mb-2 text-[var(--color-text)]">
                  Marital Status
                </label>
                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md border border-[var(--color-border)] bg-white text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition"
                >
                  <option value="">Select Status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                </select>
              </div>

              {/* Dependents */}
              <div>
                <label className="block text-sm font-medium mb-2 text-[var(--color-text)] flex items-center gap-1">
                  <Heart size={16} />
                  Number of Dependents
                </label>
                <input
                  type="number"
                  name="dependents"
                  min="0"
                  max="10"
                  value={formData.dependents}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="w-full px-4 py-2 rounded-md border border-[var(--color-border)] bg-white text-[var(--color-text)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2"
                >
                  <Calculator size={18} />
                  Calculate
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-[var(--color-border)] hover:bg-gray-300 text-[var(--color-text)] font-semibold py-2 px-4 rounded-md transition-colors"
                >
                  Reset
                </button>
              </div>
            </form>

            {/* Info Box */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md flex gap-2">
              <AlertCircle size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-700">
                This is a simplified payroll calculation for educational purposes.
              </p>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <DollarSign size={20} className="text-green-600" />
              Payroll Summary
            </h2>

            {result ? (
              <div className="space-y-4">
                {/* Gross Pay */}
                <div className="bg-green-50 p-4 rounded-md border border-green-200">
                  <div className="text-sm text-green-700 font-medium">
                    Gross Pay
                  </div>
                  <div className="text-3xl font-bold text-green-700">
                    ${result.grossPay.toFixed(2)}
                  </div>
                </div>

                {/* Deductions */}
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-[var(--color-text)] mb-3">
                    Deductions:
                  </div>

                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-md border border-red-200">
                    <span className="text-red-700 font-medium">Federal Tax</span>
                    <span className="text-red-700 font-bold">
                      ${result.federalTax.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-md border border-orange-200">
                    <span className="text-orange-700 font-medium">
                      Social Security (6.2%)
                    </span>
                    <span className="text-orange-700 font-bold">
                      ${result.socialSecurity.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-md border border-yellow-200">
                    <span className="text-yellow-700 font-medium">
                      Medicare (1.45%)
                    </span>
                    <span className="text-yellow-700 font-bold">
                      ${result.medicare.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Net Pay */}
                <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] p-4 rounded-md text-white mt-6">
                  <div className="text-sm font-medium opacity-90">Net Pay</div>
                  <div className="text-4xl font-bold">
                    ${result.netPay.toFixed(2)}
                  </div>
                </div>

                {/* Employee Info Summary */}
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mt-6">
                  <div className="text-sm font-semibold mb-2 text-gray-700">
                    Employee Details:
                  </div>
                  <div className="space-y-1 text-sm text-gray-700">
                    <p>
                      <span className="font-medium">Name:</span>{" "}
                      {formData.employeeName}
                    </p>
                    <p>
                      <span className="font-medium">Status:</span>{" "}
                      {formData.maritalStatus?.charAt(0).toUpperCase()}
                      {formData.maritalStatus?.slice(1)}
                    </p>
                    <p>
                      <span className="font-medium">Dependents:</span>{" "}
                      {formData.dependents}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <Calculator
                    size={48}
                    className="text-[var(--color-primary)] opacity-20 mx-auto mb-4"
                  />
                  <p className="text-[var(--color-text-secondary)]">
                    Fill out the form and click Calculate to see results here
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-[var(--color-text-secondary)] text-sm">
          <p>ACCT 343 - Microcomputers | Payroll Calculator Project</p>
        </div>
      </div>
    </div>
  );
}
