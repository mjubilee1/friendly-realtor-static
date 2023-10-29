import React, { useEffect } from 'react';
import { useAppStore } from '../stores';
import { AddLink, Button, Container } from '../components/UI';

export const LandingPage = () => {
  const { openRegisterModal } = useAppStore();

  useEffect(() => {
    setTimeout(() => {
      openRegisterModal();
    }, 3000);
  }, []);

  return (
    <Container
      seoProps={{
        title: 'FriendlyRealtor - Dream Home Awaits',
      }}
      className="bg-white"
    >
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl pt-12 pb-72">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="mt-10 flex items-center justify-center flex-col sm:flex-row gap-6">
              <Button
                onClick={() => openRegisterModal()}
                color="secondary"
                size="large"
                className="rounded-md text-sm font-semibold shadow-sm"
              >
                Get Started
              </Button>
              <AddLink
                to="/blogs/our-20-fee-model-making-homeownership-attainable"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Learn More <span aria-hidden="true">→</span>
              </AddLink>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Your Dream Home Awaits!
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We understand that finding your dream home is more than a transaction; it's about
              finding a place where memories are made and dreams come true. Let us guide you on this
              emotional journey while helping you measure your path to homeownership. Our
              experienced team is here to provide you with the support and expertise you need to
              turn your homeownership dreams into a reality. Together, we'll navigate every step of
              the process, so you can confidently achieve your homeownership goals and create
              lasting memories.
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
          <div className="relative rounded-full mt-8 px-3 py-1 text-sm leading-6 text-gray-600 ring-1 border-black border-2 ring-gray-900/10 hover:ring-gray-900/20">
            Ready to find your dream home?{' '}
            <AddLink
              to="/blogs/our-20-fee-model-making-homeownership-attainable"
              className="font-semibold text-blue-500"
            >
              <span className="absolute inset-0" aria-hidden="true" />
              Learn More <span aria-hidden="true">&rarr;</span>
            </AddLink>
          </div>
        </div>

        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
    </Container>
  );
};

export default LandingPage;
