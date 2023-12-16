import React, { useEffect } from 'react';
import { useAppStore } from '../../stores';
import { AddLink, Container, Header } from '../../components/UI';
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
        description:
          'Explore first-time homebuyer programs, read informative blogs, and discover your dream home with FriendlyRealtor. Sign up for our newsletter for valuable tips and trends in home management.',
      }}
      className="text-white"
    >
      <div className="flex flex-col px-6 lg:px-8">
        <AddLink
          to="/grants"
          className="rounded-md text-sm font-semibold shadow-sm bg-blue-500 p-4 mb-4"
        >
          Search Buyer Programs <span aria-hidden="true">→</span>
        </AddLink>
        <AddLink
          to="/blogs"
          className="rounded-md text-sm font-semibold shadow-sm bg-black text-white p-4 mb-4"
        >
          Explore Blogs <span aria-hidden="true">→</span>
        </AddLink>

        <div className="text-center">
          <Header as="h1">Discover Your Dream Home with FriendlyRealtor!</Header>
          <p className="mt-4 text-sm sm:text-lg leading-6">
            Welcome to FriendlyRealtor, your gateway to homeownership dreams. Let us guide you
            through the journey, offering resources, home listings, and personalized tools. Register
            today to turn your dreams into reality with expert support every step of the way!
          </p>

          <div className="mt-8 space-y-6">
            {/* Newsletter Section */}
            <p className="text-lg font-semibold mb-2">Sign up for our Newsletter!</p>
            <p className="text-sm leading-6">
              Stay informed on home management tips, trends, and issues. From tax information to
              mortgages, the newsletter covers it all for free. Unsubscribe anytime, and your
              contact information is safe with us.
            </p>
            <div className="mb-6" />
            <AddLink
              className="bg-green-500 text-white py-2 px-4 rounded-md transition-transform transform hover:-translate-y-2"
              to="https://join.homeactions.net/signup/MontrellJubilee"
              target="_blank"
            >
              Subscribe Now <span aria-hidden="true">→</span>
            </AddLink>
            {/* Testimonial Cards */}
            <div className="space-y-8">
              {/* Testimonial Card 1 */}
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
                <blockquote className="text-sm sm:text-lg font-medium text-gray-800">
                  "Finding our dream home in Baltimore seemed like an impossible task, but with the
                  help of FriendlyRealtor, our dream became a reality. They didn't just help us buy
                  a house; they helped us measure our journey to homeownership. We're forever
                  grateful!"
                </blockquote>
                <p className="mt-2 text-gray-600">- Sarah and Mark D.</p>
              </div>

              {/* Testimonial Card 2 */}
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
                <blockquote className="text-sm sm:text-lg font-medium text-gray-800">
                  "FriendlyRealtor made our experience of finding a home in Baltimore so much
                  smoother. They not only understood our emotional journey but also provided
                  valuable guidance on measuring our path to homeownership. Thanks to them, we now
                  have a place where beautiful memories are created."
                </blockquote>
                <p className="mt-2 text-gray-600">- Lisa and John S.</p>
              </div>

              {/* Testimonial Card 3 */}
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
                <blockquote className="text-sm sm:text-lg font-medium text-gray-800">
                  "We never thought owning a home in Baltimore could be so wonderful.
                  FriendlyRealtor helped us not only find our dream home but also guided us in
                  understanding the path to homeownership. With their support, we've made memories
                  that will last a lifetime."
                </blockquote>
                <p className="mt-2 text-gray-600">- Michael and Emily G.</p>
              </div>
            </div>
          </div>
        </div>

        <AddLink
          className="text-center transition-transform transform hover:-translate-y-2 mt-6"
          to="/grants/maryland-smartbuy-program"
        >
          <Header as="h3" className="mb-4">
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
