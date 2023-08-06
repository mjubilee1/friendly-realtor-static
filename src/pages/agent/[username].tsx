import React from 'react';
import { Container, Header, AddLink, Icon } from '../../components/UI';
import { collection, getDocs, where, query } from 'firebase/firestore';
import Image from 'next/image';
import { firestore } from '../../context';

const ProfilePage = ({ data }) => {
  if (!data || !data.name) {
    return <p className="text-white text-4xl flex justify-center">No Profile Found!</p>;
  }

  const defaultBio = `Experienced realtor ${data.name} dedicated to helping home buyers find their dream homes. Trustworthy guidance and exceptional service for a seamless home buying experience. Let's make your homeownership dreams a reality.`;
  const defaultSeoBio = `Experienced realtor ${
    data.name
  } dedicated to helping home buyers find their dream homes${
    data.serviceZipCodes && data.serviceZipCodes.length > 0
      ? ` in ${data.serviceZipCodes.join(', ')}`
      : data.location
      ? ` in ${data.location}`
      : ''
  }. Trustworthy guidance and exceptional service for a seamless home buying experience. Let's make your homeownership dreams a reality.`;

  return (
    <Container
      seoProps={{ title: `${data.name} - My Profile`, description: `${data.bio || defaultSeoBio}` }}
    >
      <div className="h-[32rem] flex">
        <div className="bg-white overflow-auto rounded-lg w-full">
          <div className="p-10">
            <Header as="h3" className="uppercase text-gray-500">
              Real Estate Agent
            </Header>
            {data.socials && (
              <div className="flex justify-center mt-3 mb-6 flex-col">
                <Header as="h5" className=" text-gray-500">
                  Get Connected
                </Header>
                <div className="text-black flex mt-2 gap-4">
                  {Object.keys(data.socials[0]).map((social) => {
                    const socialLink = data.socials[0][social];
                    return (
                      <AddLink to={socialLink} target="_blank" key={socialLink}>
                        <Icon name={social} size="large" color="black" />
                      </AddLink>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col-reverse md:flex-row justify-between px-4 pt-10 pb-6 md:pb-10 items-center gap-6">
            <div className="max-w-3xl">
              <Header as="h3" className="text-black text-center mt-5">
                {data.name}
              </Header>
              {data.serviceZipCodes && data.serviceZipCodes.length > 0 ? (
                <div className="text-gray-500 text-center text-md mt-4">
                  Serving the following locations: {data.serviceZipCodes.join(', ')}
                </div>
              ) : (
                data.location && (
                  <div className="text-gray-500 text-center text-md">
                    Serving the following locations: {data.location}
                  </div>
                )
              )}
              <div className="text-gray-500 text-sm p-4 text-center max-sm overflow-hidden">
                {data.bio || defaultBio}
              </div>
            </div>
            <Image src={data.photo} width={300} height={300} alt="" className="p-4" />
          </div>
        </div>
      </div>
    </Container>
  );
};

export async function getStaticPaths() {
  const userRef = collection(firestore, 'users');
  const querySnapshot = await getDocs(userRef);
  let data = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });

  const paths = data
    .filter((user) => user.userName)
    .map((user) => ({
      params: { username: user.userName },
    }));

  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  try {
    const userRef = collection(firestore, 'users');
    const q = query(userRef, where('userName', '==', context.params.username));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Get the first document from the query snapshot
      const userDocRef = querySnapshot.docs[0];

      const result = JSON.parse(JSON.stringify(userDocRef.data()));

      if (result.serviceZipCodes?.length) {
        const zipcodes = result.serviceZipCodes.join(',');

        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${zipcodes}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
          );
          const data = await response.json();

          if (data?.results?.length) {
            const postcodeLocalities = data.results
              .map((field) => field.postcode_localities || [])
              .flat();

            result.serviceZipCodes = postcodeLocalities;
          }
        } catch (error) {
          console.log('Error getting zip code data', error);
        }
      }
      return {
        props: {
          data: result,
        },
      };
    } else {
      return {
        props: {
          data: {},
        },
      };
    }
  } catch (error) {
    console.log('error was caused', error);
    return {
      props: {
        data: {},
      },
    };
  }
}

export default ProfilePage;
