import React, { useState } from 'react';
import { user } from '../../agents';
import { Button, Header, Container } from '../../components/UI';
import MortageCalculator from '../../components/MortgageCalculator';
import { gtagEvent } from '../../utils/analyticsUtil';

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
          gtagEvent({
            action: 'credit_assistance_submit',
            category: 'ai_assistance',
            label: 'credit_prompt_submission',
            value: 0,
          });
        }
      } else if (selectedTool === 'buyerAssistance') {
        const response = await user.prompt({
          prompt: `I have $ ${downPayment} for a down payment, and I am buying a home in ${areaText} . What are my steps to home buying?`,
        });
        if (response.message && response.message.content) {
          setResponse(response.message.content);
          gtagEvent({
            action: 'buyer_assistance_submit',
            category: 'ai_assistance',
            label: 'buyer_prompt_submission',
            value: 0,
          });
        }
      } else if (selectedTool === 'customAssistance') {
        const response = await user.prompt({
          prompt: textArea,
        });
        if (response.message && response.message.content) {
          setResponse(response.message.content);
          gtagEvent({
            action: 'custom_assistance_submit',
            category: 'ai_assistance',
            label: 'custom_prompt_submission',
            value: 0,
          });
        }
      }
    } catch (error) {
      console.log('Error completing prompt for user.', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      seoProps={{
        title: 'FriendlyRealtor - AI-Powered Home Buying Guidance',
      }}
      className="min-h-screen"
    >
      <Header as="h1" className="text-white mb-12">
        Discover the Essence of Home Buying: Uncover Your Buying Power and Navigate with Confidence
      </Header>

      <Header as="h5" className="text-white mb-4">
        As a home buyer, your journey begins with understanding your buying power. Explore the tools
        below to gain insights and make informed decisions for a seamless home buying experience.
      </Header>

      <p className="text-white mb-4">
        Embark on your home buying journey with our AI-powered tools designed to empower and guide
        you through the process. At the core of a successful home purchase is a clear understanding
        of your buying power. Begin by exploring our intuitive tools, meticulously crafted to
        unravel the complexities of real estate transactions.
      </p>

      <p className="text-white mb-4">
        Delve into the Credit Repair Tool, tailored to assist you in boosting your credit score.
        Whether your credit stands at a specific number or you're seeking advice on enhancement, our
        tool provides personalized insights and actionable strategies for credit improvement.
      </p>

      <p className="text-white mb-4">
        Navigate the home buying landscape with the Buyer Assistance Tool. If you have a specific
        down payment budget and a chosen area in mind, input the details and receive tailored
        guidance on the steps involved in purchasing your dream home. Uncover the secrets to a
        smooth home buying process.
      </p>

      <p className="text-white mb-4">
        For a personalized touch, engage our Custom Home Buying Tool. Share your unique questions,
        concerns, or messages related to home buying, and receive expert responses to guide you in
        your decision-making journey.
      </p>

      <p className="text-white mb-4">
        Your home buying experience should be informed, transparent, and stress-free. Explore these
        tools, discover your buying power, and embark on the path to homeownership with confidence.
      </p>

      <MortageCalculator />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <div
          className={`bg-blue-500 p-6 rounded-md cursor-pointer transition transform hover:scale-105 ${
            selectedTool === 'creditRepair' ? 'shadow-lg' : ''
          }`}
          onClick={() => handleCardClick('creditRepair')}
        >
          <h3 className="text-2xl font-semibold">Credit Repair</h3>
          <p className="text-white">Click here for credit repair tool(s)</p>
        </div>

        <div
          className={`bg-blue-500 p-6 rounded-md cursor-pointer transition transform hover:scale-105 ${
            selectedTool === 'buyerAssistance' ? 'shadow-lg' : ''
          }`}
          onClick={() => handleCardClick('buyerAssistance')}
        >
          <h3 className="text-2xl font-semibold">Buyer Assistance</h3>
          <p className="text-white">Click here for buyer assistance tool(s)</p>
        </div>
        <div
          className={`bg-blue-500 p-6 rounded-md cursor-pointer transition transform hover:scale-105 ${
            selectedTool === 'customAssistance' ? 'shadow-lg' : ''
          }`}
          onClick={() => handleCardClick('customAssistance')}
        >
          <h3 className="text-2xl font-semibold">Custom Prompt For Home Buying Assistance</h3>
          <p className="text-white">Click here for custom prompt</p>
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
                  className="border text-black mx-2 pl-2"
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
                  className="border text-black mx-2 pl-2"
                  placeholder="amount"
                  value={downPayment}
                  onChange={handleDownPaymentChange}
                />{' '}
                for a down payment, and I am buying a home in{' '}
                <input
                  type="text"
                  className="border text-black mx-2 pl-2"
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
              <ul className="text-white">
                {response.split('\n').map((item, index) => {
                  const formattedItem = item.trim().replace(/^- /, '• ');
                  return (
                    <li key={index} className="mt-2">
                      {formattedItem}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      )}
    </Container>
  );
};

export default Tools;
