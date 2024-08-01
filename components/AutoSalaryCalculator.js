// components/AutoSalaryCalculator.js
import { useState, useEffect } from 'react';

const AutoSalaryCalculator = () => {
  const [salariesInput, setSalariesInput] = useState('');
  const [averageResult, setAverageResult] = useState('');
  const [autoCopied, setAutoCopied] = useState('');

  useEffect(() => {
    if (averageResult) {
      // Auto copy to clipboard
      navigator.clipboard.writeText(averageResult);
      setAutoCopied('Auto copied!');

      // Clear input after 5 seconds
      const timer = setTimeout(() => {
        setSalariesInput('');
        setAverageResult('');
        setAutoCopied('');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [averageResult]);

  const calculateAverage = () => {
    const salaries = salariesInput.split(/[,\s]+/).map(parseFloat).filter(value => !isNaN(value));

    if (salaries.length === 0) {
      setAverageResult('Please enter valid salaries.');
      return;
    }

    const total = salaries.reduce((acc, current) => acc + current, 0);
    const average = total / salaries.length;
    setAverageResult('Average Salary: ' + average.toFixed(0));
  };

  return (
    <div className="p-4 bg-white/30 border-white/20 backdrop-blur-lg dark:bg-neutral-800/30 dark:border-neutral-600/30 px-4">
      <h3 className="text-lg text-gray-300 font-bold">Auto Salary Average Calculator</h3>
      <label htmlFor="salaries" className="block mb-2 text-gray-300">Enter salaries:</label>
      <input
        type="text"
        id="salaries"
        value={salariesInput}
        onChange={(e) => setSalariesInput(e.target.value)}
        onInput={calculateAverage}
        className="p-2 border rounded w-full mb-4 p-2 border rounded-lg bg-white/30 border-white/20 backdrop-blur-lg text-white placeholder-white/70 dark:bg-neutral-800/30 dark:border-neutral-600/30 dark:placeholder-neutral-400"
      />
      <div id="auto-copied" className="text-green-500">{autoCopied}</div>
      <div id="result" className="text-lg font-bold">{averageResult}</div>
    </div>
  );
};

export default AutoSalaryCalculator;
