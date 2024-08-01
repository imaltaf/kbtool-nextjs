import { useState, useEffect } from 'react';

const AutoSalaryCalculator = () => {
  const [salariesInput, setSalariesInput] = useState('');
  const [averageResult, setAverageResult] = useState('');
  const [autoCopied, setAutoCopied] = useState('');

  useEffect(() => {
    if (averageResult.startsWith('Average Salary: ')) {
      // Auto copy to clipboard
      navigator.clipboard.writeText(averageResult.replace('Average Salary: ', ''))
        .then(() => {
          setAutoCopied('Auto copied!');
          // Clear input and result after 5 seconds
          const timer = setTimeout(() => {
            setSalariesInput('');
            setAverageResult('');
            setAutoCopied('');
          }, 5000);
          return () => clearTimeout(timer);
        })
        .catch(err => console.error('Failed to copy:', err));
    }
  }, [averageResult]);

  const calculateAverage = (input) => {
    const salaries = input.split(/[,\s]+/).map(parseFloat).filter(value => !isNaN(value));
    if (salaries.length === 0) {
      setAverageResult('Please enter valid salaries.');
      return;
    }
    const total = salaries.reduce((acc, current) => acc + current, 0);
    const average = total / salaries.length;
    setAverageResult('Average Salary: ' + average.toFixed(0));
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setSalariesInput(newValue);
    calculateAverage(newValue);
  };

  const handlePaste = (e) => {
    e.preventDefault(); // Prevent the default paste behavior
    const pastedData = e.clipboardData.getData('text');
    const newValue = salariesInput + pastedData; // Append pasted data
    setSalariesInput(newValue);
    calculateAverage(newValue);
  };

  return (
    <div className="p-4 bg-white/30 border-white/20 backdrop-blur-lg dark:bg-neutral-800/30 dark:border-neutral-600/30">
      <h3 className="text-lg text-gray-300 font-bold mb-2">Auto Salary Average Calculator</h3>
      <label htmlFor="salaries" className="block mb-2 text-gray-300">Enter salaries:</label>
      <input
        type="text"
        id="salaries"
        value={salariesInput}
        onChange={handleChange}
        onPaste={handlePaste}
        className="p-2 border rounded w-full mb-4 bg-white/30 border-white/20 backdrop-blur-lg text-white placeholder-white/70 dark:bg-neutral-800/30 dark:border-neutral-600/30 dark:placeholder-neutral-400"
      />
      <div id="auto-copied" className="text-green-500 mb-2">{autoCopied}</div>
      <div id="result" className="text-lg font-bold">{averageResult}</div>
    </div>
  );
};

export default AutoSalaryCalculator;
