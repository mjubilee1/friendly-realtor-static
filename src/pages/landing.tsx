import React, { useEffect } from 'react';
import { useAppStore } from '../stores';

const LandingPage = () => {
  const { openLoginModal } = useAppStore();

  useEffect(() => {
    setTimeout(() => {
      openLoginModal();
    }, 3000);
  }, []);

  return (
    <div className="bg-blue-200 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-center mb-6">Welcome to Friendly Realtor</h1>
      <p className="text-lg text-gray-700 text-center mb-8">
        Your partner in finding your dream home.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Testimonial 1 */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-700">
            "Friendly Realtor made our dream home a reality. Their support and expertise are
            unparalleled."
          </p>
          <p className="text-right text-blue-600 mt-2">- John and Jane, Happy Homeowners</p>
        </div>

        {/* Testimonial 2 */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-700">
            "We couldn't have asked for a better team to guide us through the home-buying process."
          </p>
          <p className="text-right text-blue-600 mt-2">- Michael and Sarah, Satisfied Clients</p>
        </div>

        {/* Testimonial 3 */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-700">
            "Friendly Realtor's personalized prompts were a game-changer for us. Highly
            recommended!"
          </p>
          <p className="text-right text-blue-600 mt-2">- Robert and Lisa, New Homeowners</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
