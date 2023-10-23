import React, { useState } from 'react';
import { gtagEvent } from '../utils/analyticsUtil';

export const MortgageCalculator = () => {
  const [income, setIncome] = useState('');
  const [creditScore, setCreditScore] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [buyingPower, setBuyingPower] = useState(null);

  const calculateBuyingPower = () => {
    // Convert input values to numbers
    const yearlyIncomeValue = parseFloat(income);
    const creditScoreValue = parseFloat(creditScore);
    const interestRateValue = parseFloat(interestRate);
    const loanTermValue = parseFloat(loanTerm);

    // Check if any of the input values are invalid (NaN)
    if (
      isNaN(yearlyIncomeValue) ||
      isNaN(creditScoreValue) ||
      isNaN(interestRateValue) ||
      isNaN(loanTermValue)
    ) {
      // Handle invalid input gracefully, e.g., display an error message
      console.error('Invalid input. Please enter valid numbers.');
      return;
    }

    // Calculate Monthly Mortgage Payment Factor
    const monthlyInterestRate = interestRateValue / 12 / 100;
    const totalNumberOfPayments = loanTermValue * 12;
    const monthlyMortgagePaymentFactor =
      (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalNumberOfPayments)) /
      (Math.pow(1 + monthlyInterestRate, totalNumberOfPayments) - 1);

    // Calculate DTI Ratio (assuming a max DTI of 43%)
    const dtiRatio = 0.43;

    // Calculate Buying Power
    const buyingPowerValue = (yearlyIncomeValue * dtiRatio) / 12 / monthlyMortgagePaymentFactor;

    // Update the state with the calculated buying power
    setBuyingPower(buyingPowerValue);
    gtagEvent({
      action: 'calculate_buying_power',
      category: 'financial_calculations',
      label: 'user_buying_power',
      value: 0,
    });
  };

  return (
    <div className="w-full mx-auto p-6 my-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Mortgage Calculator</h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2" htmlFor="income">
          Yearly Income:
        </label>
        <input
          type="number"
          id="income"
          className="w-full border rounded py-2 px-3 text-black"
          placeholder="Enter your yearly income"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2" htmlFor="creditScore">
          Credit Score:
        </label>
        <input
          type="number"
          id="creditScore"
          className="w-full border rounded py-2 px-3 text-black"
          placeholder="Enter your credit score"
          value={creditScore}
          onChange={(e) => setCreditScore(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2" htmlFor="interestRate">
          Interest Rate (in %):
        </label>
        <input
          type="number"
          id="interestRate"
          className="w-full border rounded py-2 px-3 text-black"
          placeholder="Enter the interest rate"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2" htmlFor="loanTerm">
          Loan Term (in years):
        </label>
        <input
          type="number"
          id="loanTerm"
          className="w-full border rounded py-2 px-3 text-black"
          placeholder="Enter the loan term"
          value={loanTerm}
          onChange={(e) => setLoanTerm(e.target.value)}
        />
      </div>

      <button
        className="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600"
        onClick={calculateBuyingPower}
      >
        Calculate Buying Power
      </button>

      {buyingPower !== null && (
        <div className="mt-4">
          <p className="text-green-600 font-semibold">
            Your Potential Buying Power: ${buyingPower}
          </p>
        </div>
      )}
    </div>
  );
};

export default MortgageCalculator;
