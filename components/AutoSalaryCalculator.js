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

  const inputStyle = `
  bg-transparent
  border border-purple-300/20
  text-white
  placeholder-purple-200/40
  rounded-lg
  px-4 py-3
  w-full
  focus:outline-none
  focus:ring-2
  focus:ring-purple-500/50
  focus:border-transparent
  transition-all duration-300 ease-in-out
  backdrop-blur-sm
  shadow-inner
  text-sm
  font-medium
  hover:border-purple-400/30
`;
  return (
    <div className="p-4">
      
      <h3 className="text-lg text-gray-300 font-bold mb-2">Auto Salary Average Calculator</h3>
      <label htmlFor="salaries" className="block mb-2 text-gray-300">Enter salaries:</label>
      <input
        type="text"
        id="salaries"
        value={salariesInput}
        onChange={handleChange}
        onPaste={handlePaste}
        className={inputStyle}
      />
      <div id="auto-copied" className="text-purple-500 mb-2">{autoCopied}</div>
      <div id="result" className="text-lg font-bold">{averageResult}</div>
      <span className="absolute bottom-0 left-4 h-px w-[calc(100%-2rem)] bg-gradient-to-r from-purple-400/0 via-purple-400/90 to-purple-400/0 transition-opacity duration-500" />
    </div>
  );
};

export default AutoSalaryCalculator;
