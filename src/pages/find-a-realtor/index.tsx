import React, { useEffect, useState } from 'react';
import { Image, Header, Container } from '../../components/UI';
import { SendMessageModal } from '../../components';
import Link from 'next/link';
import { firestore } from '../../context';
import { collection, getDocs } from 'firebase/firestore';
import moment from 'moment';
import _ from 'lodash';

const FindARealtorPage = ({ users }) => {
  const [realtors, setRealtors] = useState([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [serviceAreas, setServiceAreas] = useState<string[]>([]);

  const realtorsPerPage = 9;

  // Calculate the current posts to display
  const indexOfLast = currentPage * realtorsPerPage;
  const indexOfFirst = indexOfLast - realtorsPerPage;
  const currentRealtors = realtors.slice(indexOfFirst, indexOfLast);

  // Change page
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (users?.length) {
      // Sort the users array by updatedAt using Moment.js
      const sortedUsers = users.slice().sort((a, b) => {
        const dateA = a.data.updatedAt ? moment(a.data.updatedAt.seconds * 1000) : null;
        const dateB = b.data.updatedAt ? moment(b.data.updatedAt.seconds * 1000) : null;

        // Compare dates
        if (dateA && dateB) {
          return dateB - dateA;
        } else if (dateA) {
          return -1; // Place items without updatedAt towards the end
        } else if (dateB) {
          return 1; // Place items without updatedAt towards the end
        } else {
          return 0; // Both items don't have updatedAt
        }
      });

      setRealtors(sortedUsers);
    }
  }, [users]);

  return (
    <Container
      seoProps={{
        title: 'FriendlyRealtor - Discover a Friendly Realtor in your area',
        description:
          'Discover your ideal real estate agent to navigate the home buying process with confidence. Explore options and find expert guidance today!',
      }}
    >
      <div className="text-center pb-8">
        <Header as="h1">Discover Your Friendly Realtor in the Neighborhood</Header>
        <div className="text-lg mt-2">
          Welcome to FriendlyRealtor, your trusted platform for connecting with top-notch real
          estate professionals in your area. Whether you're buying, selling, or just exploring,
          we're here to make your real estate journey seamless and enjoyable.
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentRealtors.map((realtor) => (
          <div id={realtor.id} className="text-center">
            <div className="max-w-xs mx-auto h-full bg-gray-500 rounded-lg shadow-md overflow-hidden">
              <Link href={`/agent/${realtor.data.username || realtor.data.userName}`}>
                {' '}
                <Image src={realtor.data.photo || ''} size="w-full h-64" />
                <div className="p-4">
                  <Header as="h4" className="font-semibold mb-2">
                    {realtor.data.name}
                  </Header>
                  {realtor.data.serviceZipCodes && realtor.data.serviceZipCodes.length > 0 ? (
                    <p className="mt-2">Service Areas: {realtor.data.serviceZipCodes.join(', ')}</p>
                  ) : (
                    realtor.data.location && (
                      <p className="mt-2">{`Service Areas: ${realtor.data.location}`}</p>
                    )
                  )}
                </div>
              </Link>

              <div className="mb-4">
                <SendMessageModal userID={realtor.id} />
              </div>
            </div>
          </div>
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

export async function getStaticProps() {
  try {
    const userRef = collection(firestore, 'users');
    const querySnapshot = await getDocs(userRef);

    const usersData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
    const results = JSON.parse(JSON.stringify(usersData));

    let filteredRealtors = [];
    if (results?.length) {
      filteredRealtors = results.filter((user) => user.data.username || user.data.userName);
      if (filteredRealtors.length) {
        const updatedRealtors = await Promise.all(
          filteredRealtors.map(async (realtor) => {
            if (realtor.data.serviceZipCodes?.length) {
              const zipcodes = realtor.data.serviceZipCodes.join(',');

              try {
                const response = await fetch(
                  `https://maps.googleapis.com/maps/api/geocode/json?address=${zipcodes}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
                );
                const data = await response.json();

                if (data?.results?.length) {
                  const postcodeLocalities = data.results
                    .map((field) => field.postcode_localities || [])
                    .flat();

                  return {
                    ...realtor,
                    data: {
                      ...realtor.data,
                      serviceZipCodes: postcodeLocalities,
                    },
                  };
                }
              } catch (error) {
                console.log('Error getting zip code data', error);
              }
            }
            return realtor;
          }),
        );

        return {
          props: {
            users: updatedRealtors || [],
          },
        };
      }
    }
  } catch (error) {
    return {
      props: {
        users: [],
      },
    };
  }
}

export default FindARealtorPage;
