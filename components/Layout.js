import React, { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import AutoSalaryCalculator from './AutoSalaryCalculator';
import CompanySearch from './CompanySearch';
import Footer from './Footer';
import Button from './Button';
import ResetButton from './ResetButton';
import PurpleButton from './PurpleButton';
import ZaubaButton from './ZaubaButton';

const Layout = ({ children }) => {
  const [copied, setCopied] = useState(false);
  const [loanId, setLoanId] = useState('');
  const [ids, setIds] = useState('');
  const [output, setOutput] = useState('Result will be displayed here');
  const [resetCounter, setResetCounter] = useState(0);
  const [customButtons, setCustomButtons] = useState([]);
  const [ButtonName, setButtonName] = useState('');
  const [ButtonContent, setButtonContent] = useState('');
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);

  useEffect(() => {
    showTab('approved');
    const storedButtons = JSON.parse(localStorage.getItem('customButtons')) || [];
    setCustomButtons(storedButtons);
  }, []);

  useEffect(() => {
    localStorage.setItem('customButtons', JSON.stringify(customButtons));
  }, [customButtons]);

  const showTab = (tabId) => {
    document.getElementById('approved').style.display = 'none';
    document.getElementById('reject').style.display = 'none';
    document.getElementById('pending').style.display = 'none';
    document.getElementById(tabId).style.display = 'block';
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const copyResult = () => {
    const idsArray = ids.trim().split(" ");
    const idsCount = idsArray.length;
    const idsOutput = idsArray.join(",");
    
    let result = "";
    if (idsCount > 0) {
      if (loanId) {
        result = `${loanId}:${idsCount}:${idsOutput}`;
      } else {
        result = `${idsCount}:${idsOutput}`;
      }
    }

    setOutput(result);
    handleCopy();

    setResetCounter(prev => prev + 1);

    setTimeout(() => {
      resetFields();
    }, 5000);
  };

  const resetFields = () => {
    setLoanId('');
    setIds('');
    setOutput('Result will be displayed here');
  };

  const checkEnter = (event) => {
    if (event.keyCode === 13) {
      copyResult();
    }
  };

  const addCustomButton = () => {
    if (ButtonName && ButtonContent) {
      const newButtons = [...customButtons, { name: ButtonName, content: ButtonContent }];
      setCustomButtons(newButtons);
      setButtonName('');
      setButtonContent('');
    }
  };

  const handleDeleteButton = () => {
    if (selectedButtonIndex !== null) {
      const newButtons = customButtons.filter((_, index) => index !== selectedButtonIndex);
      setCustomButtons(newButtons);
      setSelectedButtonIndex(null);
    }
  };

  return (
    <div className="min-h-screen dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex flex-col">
      <div className="flex flex-col lg:flex-row flex-grow">
        <div className="w-full lg:w-1/4 p-4 dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] border-b lg:border-r lg:border-b-0">
          <div className="flex flex-col h-full">
            <div className="flex justify-around p-2 rounded-3xl bg-white/30 border-white/20 backdrop-blur-lg dark:bg-neutral-800/30 dark:border-neutral-600/30 mb-4">
              <ZaubaButton onClick={() => showTab('approved')}>Approved</ZaubaButton>
              <ZaubaButton onClick={() => showTab('reject')}>Reject</ZaubaButton>
              <ZaubaButton onClick={() => showTab('pending')}>Comments</ZaubaButton>
            </div>

            <div id="approved" className="flex flex-wrap gap-2">
              {/* Approved buttons */}
              <h5 className="font-bold">QID_109</h5>
              <CopyToClipboard text="salary_slip" onCopy={handleCopy}>
                <Button>salary_slip</Button>
              </CopyToClipboard>
              <CopyToClipboard text="bank_narration" onCopy={handleCopy}>
                <Button>bank_narration</Button>
              </CopyToClipboard>
              <CopyToClipboard text="company_id" onCopy={handleCopy}>
                <Button>company_id</Button>
              </CopyToClipboard>
              <h5 className="font-bold">QID_101</h5>
              <CopyToClipboard text="not found" onCopy={handleCopy}>
                <Button>not found</Button>
              </CopyToClipboard>
              <h5 className="font-bold">QID_061</h5>
              <CopyToClipboard text="Approved" onCopy={handleCopy}>
                <Button>Approved</Button>
              </CopyToClipboard>
              <h5 className="font-bold">QID_102</h5>
              <CopyToClipboard text="KYC documents are proper" onCopy={handleCopy}>
                <Button>KYC</Button>
              </CopyToClipboard>
              <CopyToClipboard text="selfie" onCopy={handleCopy}>
                <Button>selfie</Button>
              </CopyToClipboard>
              <CopyToClipboard text="pan" onCopy={handleCopy}>
                <Button>pan</Button>
              </CopyToClipboard>
              <CopyToClipboard text="aadhaar" onCopy={handleCopy}>
                <Button>aadhaar</Button>
              </CopyToClipboard>
            </div>

            <div id="reject" className="flex flex-wrap gap-2">
              {/* Reject buttons */}
              <h5 className="font-bold">QID_108</h5>
              <CopyToClipboard text="NOT APPROVED" onCopy={handleCopy}>
                <Button>NOT APPROVED</Button>
              </CopyToClipboard>
              <h5 className="font-bold">QID_109</h5>
              <CopyToClipboard text="NOT MATCH" onCopy={handleCopy}>
                <Button>NOT MATCH</Button>
              </CopyToClipboard>
              <h5 className="font-bold">QID_101</h5>
              <CopyToClipboard text="not found" onCopy={handleCopy}>
                <Button>not found</Button>
              </CopyToClipboard>
              <h5 className="font-bold">QID_061</h5>
              <CopyToClipboard text="Salary Mode is cash" onCopy={handleCopy}>
                <Button>cash</Button>
              </CopyToClipboard>
              <CopyToClipboard text="Salary Mode is Cheque" onCopy={handleCopy}>
                <Button>Cheque</Button>
              </CopyToClipboard>
              <CopyToClipboard text="Govt Employee" onCopy={handleCopy}>
                <Button>Govt Employee</Button>
              </CopyToClipboard>
              <CopyToClipboard text="Self Employed" onCopy={handleCopy}>
                <Button>Self Employed</Button>
              </CopyToClipboard>
              <CopyToClipboard text="Not a Salaried Employee" onCopy={handleCopy}>
                <Button>NOT-Sal</Button>
              </CopyToClipboard>
              <CopyToClipboard text="Salary Irregular" onCopy={handleCopy}>
                <Button>Salary Irregular</Button>
              </CopyToClipboard>
              <h5 className="font-bold">QID_102</h5>
              <CopyToClipboard text="KYC documents are proper" onCopy={handleCopy}>
                <Button>KYC</Button>
              </CopyToClipboard>
              <CopyToClipboard text="selfie" onCopy={handleCopy}>
                <Button>selfie</Button>
              </CopyToClipboard>
              <CopyToClipboard text="pan" onCopy={handleCopy}>
                <Button>pan</Button>
              </CopyToClipboard>
              <CopyToClipboard text="aadhaar" onCopy={handleCopy}>
                <Button>aadhaar</Button>
              </CopyToClipboard>
            </div>

            <div id="pending" className="flex flex-col space-y-4">
              {/* Pending buttons and custom button management */}
              <h5 className="font-bold">Pending review</h5>
              <div>
                <input
                  type="text"
                  value={ButtonName}
                  onChange={(e) => setButtonName(e.target.value)}
                  placeholder="Button Name"
                  className="p-2 border rounded w-full mb-2 bg-white/30 border-white/20 backdrop-blur-lg text-white placeholder-white/70 dark:bg-neutral-800/30 dark:border-neutral-600/30 dark:placeholder-neutral-400"
                />
                <input
                  type="text"
                  value={ButtonContent}
                  onChange={(e) => setButtonContent(e.target.value)}
                  placeholder="Button Content"
                  className="p-2 border rounded w-full mb-2 bg-white/30 border-white/20 backdrop-blur-lg text-white placeholder-white/70 dark:bg-neutral-800/30 dark:border-neutral-600/30 dark:placeholder-neutral-400"
                />
                <PurpleButton onClick={addCustomButton}>Add Button</PurpleButton>
              </div>

              <div className="mt-4">
                <select
                  value={selectedButtonIndex ?? ''}
                  onChange={(e) => setSelectedButtonIndex(Number(e.target.value))}
                  className="p-2 border rounded w-full bg-white/30 border-white/20 backdrop-blur-lg text-white dark:bg-neutral-800/30 dark:border-neutral-600/30"
                >
                  <option value="">Select a button to delete</option>
                  {customButtons.map((btn, index) => (
                    <option key={index} value={index}>
                      {btn.name}
                    </option>
                  ))}
                </select>
                <PurpleButton onClick={handleDeleteButton} className="mt-2">Delete Selected Button</PurpleButton>
              </div>

              <div className="mt-4 flex space-x-4">
                {customButtons.map((btn, index) => (
                  <CopyToClipboard key={index} text={btn.content} onCopy={handleCopy}>
                    <Button>{btn.name}</Button>
                  </CopyToClipboard>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-3/4 p-4">
          <div className="p-4 border rounded-3xl bg-white/30 border-white/20 backdrop-blur-lg dark:bg-neutral-800/30 dark:border-neutral-600/30 mb-4">
            <div className="mb-4">
              <input
                type="text"
                value={loanId}
                onChange={(e) => setLoanId(e.target.value)}
                placeholder="QID 106 and 117"
                onKeyUp={checkEnter}
                className="p-2 border rounded-lg bg-white/30 border-white/20 backdrop-blur-lg text-white placeholder-white/70 dark:bg-neutral-800/30 dark:border-neutral-600/30 dark:placeholder-neutral-400 w-full mb-2"
              />
              <input
                type="text"
                value={ids}
                onChange={(e) => setIds(e.target.value)}
                placeholder="Enter transactions_id"
                onKeyUp={checkEnter}
                className="p-2 border rounded-lg bg-white/30 border-white/20 backdrop-blur-lg text-white placeholder-white/70 dark:bg-neutral-800/30 dark:border-neutral-600/30 dark:placeholder-neutral-400 w-full mb-2"
              />
              <Button onClick={copyResult} className="mr-4">
                <i className="fas fa-copy"></i> Copy
              </Button>
              <ResetButton onClick={resetFields}>
                <i className="fas fa-redo"></i> Reset <span>{resetCounter}</span>
              </ResetButton>
            </div>
            <div id="output" className="p-2 border rounded-lg bg-white/30 border-white/20 backdrop-blur-lg text-white placeholder-white/70 dark:bg-neutral-800/30 dark:border-neutral-600/30 dark:placeholder-neutral-400 w-full mb-4">
              {output}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="w-full lg:w-1/2 rounded-3xl bg-white/30 border-white/20 backdrop-blur-lg dark:bg-neutral-800/30 dark:border-neutral-600/30 p-4 mb-4">
              <AutoSalaryCalculator />
            </div>
            <div className="w-full lg:w-1/2 rounded-3xl bg-white/30 border-white/20 backdrop-blur-lg dark:bg-neutral-800/30 dark:border-neutral-600/30 p-4 mb-4">
              <CompanySearch />
            </div>
          </div>
        </div>
      </div>

      {copied && (
        <div className="fixed bottom-20 left-4 via-purple-400/90 text-white py-2 px-4 rounded">
          Copied to clipboard!
        </div>
      )}

      <Footer />
      
      {children}
    </div>
  );
};

export default Layout;
