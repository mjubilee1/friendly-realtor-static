import React, { useState } from 'react';
import { user } from '../../agents';
import { Button } from '../../components/UI';
import { FinanceTable } from '../../components';

const Tools = () => {
  const [selectedTool, setSelectedTool] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState('');
  const [textArea, setTextArea] = useState('');
  const [areaText, setAreaText] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [response, setResponse] = useState('');

  const handleCardClick = (tool) => {
    setSelectedTool(tool);
    // Clear the response when a new tool is selected
    setResponse('');
  };

  const handleAreaChange = (event) => {
    setAreaText(event.target.value);
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleTextAreaChange = (event) => {
    setTextArea(event.target.value);
  };

  const handleDownPaymentChange = (event) => {
    setDownPayment(event.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      if (selectedTool === 'creditRepair') {
        const response = await user.prompt({
          prompt: `I'm looking to boost my credit score, which is currently at ${inputText} and I'm seeking advice on how to enhance it.`,
        });

        if (response.message && response.message.content) {
          setResponse(response.message.content);
        }
      } else if (selectedTool === 'buyerAssistance') {
        const response = await user.prompt({
          prompt: `I have $ ${downPayment} for a down payment, and I am buying a home in ${areaText} . What are my steps to home buying?`,
        });
        if (response.message && response.message.content) {
          setResponse(response.message.content);
        }
      } else if (selectedTool === 'customAssistance') {
        const response = await user.prompt({
          prompt: textArea,
        });
        if (response.message && response.message.content) {
          setResponse(response.message.content);
        }
      }
    } catch (error) {
      console.log('Error completing prompt for user.', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <div
          className={`bg-white p-6 rounded-md cursor-pointer transition transform hover:scale-105 ${
            selectedTool === 'creditRepair' ? 'shadow-lg' : ''
          }`}
          onClick={() => handleCardClick('creditRepair')}
        >
          <h3 className="text-2xl font-semibold">Credit Repair</h3>
          <p className="text-gray-600">Click here for credit repair tool(s)</p>
        </div>

        <div
          className={`bg-white p-6 rounded-md cursor-pointer transition transform hover:scale-105 ${
            selectedTool === 'buyerAssistance' ? 'shadow-lg' : ''
          }`}
          onClick={() => handleCardClick('buyerAssistance')}
        >
          <h3 className="text-2xl font-semibold">Buyer Assistance</h3>
          <p className="text-gray-600">Click here for buyer assistance tool(s)</p>
        </div>
        <div
          className={`bg-white p-6 rounded-md cursor-pointer transition transform hover:scale-105 ${
            selectedTool === 'customAssistance' ? 'shadow-lg' : ''
          }`}
          onClick={() => handleCardClick('customAssistance')}
        >
          <h3 className="text-2xl font-semibold">Custom Prompt For Home Buying Assistance</h3>
          <p className="text-gray-600">Click here for custom prompt</p>
        </div>
      </div>

      {selectedTool && (
        <div className="mt-4 p-4">
          {selectedTool === 'creditRepair' && (
            <div>
              <h3 className="text-2xl font-semibold">Credit Repair Tool</h3>
              <p className="text-white">
                I'm looking to boost my credit score, which is currently at{' '}
                <input
                  type="number"
                  className="border p-2 text-black"
                  placeholder="your credit score"
                  value={inputText}
                  onChange={handleInputChange}
                />{' '}
                and I'm seeking advice on how to enhance it.
              </p>
            </div>
          )}

          {selectedTool === 'buyerAssistance' && (
            <div>
              <h3 className="text-2xl font-semibold">Buyer Assistance Tool</h3>
              <p className="text-white">
                I have $
                <input
                  type="text"
                  className="border p-2 text-black"
                  placeholder="amount"
                  value={downPayment}
                  onChange={handleDownPaymentChange}
                />{' '}
                for a down payment, and I am buying a home in{' '}
                <input
                  type="text"
                  className="border p-2 text-black"
                  placeholder="area"
                  value={areaText}
                  onChange={handleAreaChange}
                />
                . What are my steps to home buying?
              </p>
            </div>
          )}
          {selectedTool === 'customAssistance' && (
            <div>
              <h3 className="text-2xl font-semibold">Custom Home Buying Tool</h3>
              <textarea
                className="border p-2 text-black w-full"
                placeholder="Enter your message or questions here..."
                value={textArea}
                onChange={handleTextAreaChange}
              ></textarea>
            </div>
          )}

          <Button color="secondary" size="large" onClick={handleSubmit} loading={loading}>
            Submit
          </Button>
          {response && (
            <div className="mt-4">
              <h3 className="text-2xl font-semibold">Response</h3>
              <p className="text-white">{response}</p>
            </div>
          )}
        </div>
      )}
      <div className="pt-8">
        <FinanceTable />
      </div>
    </div>
  );
};

export default Tools;
