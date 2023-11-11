import React, { useEffect } from 'react';
import { useAppStore } from '../stores';
import { AddLink, Container, Header } from '../components/UI';
import Image from 'next/image';

const LandingPage = () => {
  const { openRegisterModal } = useAppStore();

  useEffect(() => {
    setTimeout(() => {
      openRegisterModal();
    }, 9000);
  }, []);

  return (
    <Container
      seoProps={{
        title: 'FriendlyRealtor - Dream Home Awaits',
      }}
      className="text-white"
    >
      <div className="flex flex-row gap-8 flew-wrap relative px-6 lg:px-8">
        <div className="pb-20 flex-1">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="flex items-center justify-center flex-col sm:flex-row gap-6">
              <AddLink
                to="/grants"
                className="rounded-md text-sm font-semibold shadow-sm bg-blue-500 p-4"
              >
                Find Home Buying Programs <span aria-hidden="true">→</span>
              </AddLink>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Discover Your Dream Home with FriendlyRealtor!
            </h1>
            <p className="mt-6 text-lg leading-8">
              Welcome to FriendlyRealtor, your gateway to homeownership dreams. Let us guide you
              through the journey, offering resources, home listings, and personalized tools.
              Register today to turn your dreams into reality with expert support every step of the
              way!
            </p>
            {/* Testimonial Cards */}
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Testimonial Card 1 */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <blockquote className="text-lg font-medium text-gray-800">
                  "Finding our dream home in Baltimore seemed like an impossible task, but with the
                  help of FriendlyRealtor, our dream became a reality. They didn't just help us buy
                  a house; they helped us measure our journey to homeownership. We're forever
                  grateful!"
                </blockquote>
                <p className="mt-4 text-gray-600">- Sarah and Mark D.</p>
              </div>

              {/* Testimonial Card 2 */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <blockquote className="text-lg font-medium text-gray-800">
                  "FriendlyRealtor made our experience of finding a home in Baltimore so much
                  smoother. They not only understood our emotional journey but also provided
                  valuable guidance on measuring our path to homeownership. Thanks to them, we now
                  have a place where beautiful memories are created."
                </blockquote>
                <p className="mt-4 text-gray-600">- Lisa and John S.</p>
              </div>

              {/* Testimonial Card 3 */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <blockquote className="text-lg font-medium text-gray-800">
                  "We never thought owning a home in Baltimore could be so wonderful.
                  FriendlyRealtor helped us not only find our dream home but also guided us in
                  understanding the path to homeownership. With their support, we've made memories
                  that will last a lifetime."
                </blockquote>
                <p className="mt-4 text-gray-600">- Michael and Emily G.</p>
              </div>
            </div>
          </div>
        </div>
        <AddLink
          className="text-center transition-transform transform hover:-translate-y-2"
          to="/grants/maryland-smartbuy-program"
        >
          <Header as="h3" className="mb-8">
            Maryland SmartBuy Program
          </Header>
          <Image
            width={500}
            height={500}
            src="https://images.ctfassets.net/v3wxyl8kvdve/3e4nrqrsn1ZinOk95n6dA9/2d72c227fd013b90d03babd869d83e41/Banner.png"
            alt="Maryland SmartBuy Program"
          />
        </AddLink>
      </div>
    </Container>
  );
};

export default LandingPage;
