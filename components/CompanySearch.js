import { useState } from 'react';
import ZaubaButton from './ZaubaButton';
import ResetButton from './ResetButton';

const CompanySearch = () => {
  const [companyName, setCompanyName] = useState('');

  const handleSearch = (query) => {
    const urlMap = {
      zauba: `https://www.google.com/search?q=zauba+${companyName}`,
      companyCheck: `https://www.google.com/search?q=thecompanycheck.com+${companyName}`,
      tofler: `https://www.google.com/search?q=tofler.in+${companyName}`,
      site: `https://www.google.com/search?q=site:+${companyName}`
    };
    window.open(urlMap[query], "_blank");
  };

  const handleReset = () => {
    setCompanyName('');
  };

  return (
    <div className="p-6 bg-white/30 border-white/20 backdrop-blur-lg dark:bg-neutral-800/30 dark:border-neutral-600/30 flex flex-col items-center">
      <h1 className="text-gray-300 text-2xl font-bold mb-4">Company Search Engine</h1>
      <input
        type="text"
        id="companyName"
        className="p-2 w-full mb-4 rounded bg-white/30 border-white/20 backdrop-blur-lg text-white placeholder-white/70 dark:bg-neutral-800/30 dark:border-neutral-600/30 dark:placeholder-neutral-400"
        placeholder="Enter Company Name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />
      <div className="flex flex-wrap justify-center gap-2">
        <ResetButton onClick={handleReset}>&#x2716;</ResetButton>
        <ZaubaButton onClick={() => handleSearch('zauba')}>Zauba</ZaubaButton>
        <ZaubaButton onClick={() => handleSearch('companyCheck')}>Company Check</ZaubaButton>
        <ZaubaButton onClick={() => handleSearch('tofler')}>Tofler</ZaubaButton>
        <ZaubaButton onClick={() => handleSearch('site')}>WebSite</ZaubaButton>
      </div>
    </div>
  );
};

export default CompanySearch;
