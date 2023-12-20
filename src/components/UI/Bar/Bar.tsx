import React from 'react';
import { BarProps } from './BarTypes';

const Bar = (props: BarProps) => {
  const { number } = props;

  const formattedScore = Math.min(Math.max(number, 300), 850);
  const percentage = ((formattedScore - 300) / (850 - 300)) * 100;

  const getBarColor = () => {
    if (formattedScore >= 800) return 'bg-green-500';
    if (formattedScore >= 740) return 'bg-green-300';
    if (formattedScore >= 670) return 'bg-yellow-500';
    if (formattedScore >= 580) return 'bg-yellow-300';
    return 'bg-red-500';
  };

  return (
    <div className="bar-container bg-gray-200 w-full h-8 rounded-md">
      <div
        className={`bar h-full rounded-md ${getBarColor()}`}
        style={{ width: `${percentage}%` }}
      />
      <div className="labels flex flex-row-reverse mt-1 justify-between text-xs px-2">
        <span className="label-excellent">Excellent</span>
        <span className="label-very-good">Very Good</span>
        <span className="label-good">Good</span>
        <span className="label-fair">Fair</span>
        <span className="label-poor">Poor</span>
      </div>
      <div className="indicator absolute hidden top-1/2 left-full transform -translate-y-1/2 bg-white px-2 rounded-md text-xs">
        {formattedScore}
      </div>
    </div>
  );
};

export default Bar;
