import React, { useState } from 'react';

export const FinanceTable = () => {
  const [monthlySavings, setMonthlySavings] = useState(200);
  const [years, setYears] = useState(5);
  const totalSavings = monthlySavings * 12 * years;

  const handleMonthlySavingsChange = (value) => {
    setMonthlySavings(value);
  };

  const handleYearsChange = (value) => {
    setYears(value);
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <label className="block text-white">Monthly Savings</label>
        <input
          type="number"
          value={monthlySavings}
          onChange={(e) => handleMonthlySavingsChange(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full text-black"
        />
      </div>
      <div className="mb-4">
        <label className="block text-white">Years</label>
        <input
          type="number"
          value={years}
          onChange={(e) => handleYearsChange(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full text-black"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Total Savings</h3>
        <p className="text-2xl text-green-600">{`$${totalSavings}`}</p>
      </div>
    </div>
  );
};
