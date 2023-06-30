import React, { useState } from 'react';
import { Image, Header, Container } from '../../components/UI';
import Link from 'next/link';

const FindARealtorPage = () => {
  const [realtors, setRealtors] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const realtorsPerPage = 9;

  // Change page
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  console.log(currentPage);
  return (
    <Container
      seoProps={{
        title: ' Discover a Friendly Realtor in your area',
        description:
          'Discover your ideal real estate agent to navigate the home buying process with confidence. Explore options and find expert guidance today!',
      }}
    >
      <Header as="h1" className="pb-8 text-center">
        Discover a Friendly Realtor in your area
      </Header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {realtors.map((realtor) => (
          <Link href="" className="text-center">
            <div className="max-w-xs mx-auto h-full bg-gray-500 rounded-lg shadow-md overflow-hidden">
              <Image src="" size="w-full h-64" />
              <div className="p-4">
                <Header as="h4" className="font-semibold mb-2">
                  testing
                </Header>
                <p className="mt-2">Service Areas: </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {realtors.length > realtorsPerPage && (
          <ul className="flex gap-4">
            {Array(Math.ceil(realtors.length / realtorsPerPage))
              .fill()
              .map((_, index) => (
                <li
                  key={index}
                  className={`px-2 bg-white rounded-xl ${
                    currentPage === index + 1 ? '!bg-blue-500 !text-white' : ''
                  }`}
                  onClick={() => paginate(index + 1)}
                >
                  <button className={`focus:outline-none`}>
                    <p className="text-black">{index + 1}</p>
                  </button>
                </li>
              ))}
          </ul>
        )}
      </div>
    </Container>
  );
};

export default FindARealtorPage;
