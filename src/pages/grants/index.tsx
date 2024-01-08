import { Container, Header } from '../../components/UI';
import { Select } from '../../components/UI/Select';
import Link from 'next/link';
import { fetchEntries } from '../../utils/contentfulUtil';
import Image from 'next/image';
import { useState, useMemo } from 'react';
import { fbEvent, gtagEvent } from '../../utils/analyticsUtil';

const AllGrantsPage = ({ grants }) => {
  const grantFields = grants[0]?.fields;
  const [selectedLocation, setSelectedLocation] = useState<string>('');

  // Memoized filter grants based on selected location
  const filteredGrants = useMemo(() => {
    return selectedLocation
      ? grantFields.allGrants.filter((grant) => grant.fields.location === selectedLocation)
      : grantFields.allGrants;
  }, [selectedLocation, grantFields.allGrants]);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: '8px',
      minHeight: 'unset',
    }),
  };

  return (
    <Container
      seoProps={{
        title: `${grantFields.grantName} - FriendlyRealtor`,
        description:
          'Discover a variety of home buying programs to suit your needs. Learn more about different grants and assistance available for homebuyers.',
      }}
    >
      <div className="pb-8 text-center">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            {grantFields.grantName && (
              <Header as="h3" className="text-2xl font-bold">
                {grantFields.grantName}
              </Header>
            )}
          </div>
          <div className="flex items-center">
            <Select
              id="buyer-program-select"
              options={[
                { value: 'Maryland', label: 'Maryland' },
                { value: 'WashingtonDC', label: 'Washington DC' },
                { value: 'Virginia', label: 'Virginia' },
              ]}
              placeholder="Select Location"
              onChange={(selectedOption) => {
                fbEvent('grant_location', {
                  content_name: `selected location ${selectedOption?.value}`,
                  content_category: 'user_interaction',
                  value: 1,
                });

                gtagEvent({
                  action: 'grant_location',
                  category: 'user_interaction',
                  label: `selected location ${selectedOption?.value}`,
                  value: 1,
                });
                setSelectedLocation(selectedOption.value);
              }}
              styles={customStyles}
            />
          </div>
        </div>
        <div className="my-4 text-left">
          Embark on the journey to your first home with anticipation and excitement. As you navigate
          the path to homeownership, discover the opportunities offered by First-Time Home Buyer
          Programs. These specialized programs are crafted to enhance accessibility to
          homeownership, providing crucial financial assistance along the way. The prospect of
          owning your inaugural home becomes more tangible and real as these programs unfold.
        </div>
        <div className="my-4 text-left">
          Picture a seamless journey guided by support and tailored solutions. Whether it's easing
          financial constraints or facilitating key steps in the home buying process, these programs
          exist to transform the dream of your first home into a fulfilling reality. Take advantage
          of this pivotal moment, where the excitement of a new chapter aligns with the practical
          assistance offered by First-Time Home Buyer Programs. Your pathway to homeownership is
          paved with possibilities, making the prospect of owning your first home an achievable and
          rewarding reality.
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredGrants.map((grant) => (
          <Link href={`/grants/${grant.fields.slug}`} key={grant.sys.id}>
            <div className="max-w-xs mx-auto h-full bg-gray-500 rounded-lg shadow-md overflow-hidden cursor-pointer">
              <Image
                src={grant.fields.mediaOfGrant.fields.file.url}
                alt={grant.fields.mediaOfGrant.fields.title}
                width={500}
                height={100}
                className="cursor-pointer"
              />
              <div className="p-4">
                <Header as="h4" className="font-semibold text-xl mb-2 text-white">
                  {grant.fields.nameOfGrant}
                </Header>
                {grant.fields.location && (
                  <p className="mt-2 text-gray-300">Location: {grant.fields.location}</p>
                )}
                {grant.fields.shortDesciption && (
                  <p className="mt-2 text-gray-300">{grant.fields.shortDesciption}</p>
                )}
                <div className="mt-4 flex justify-end">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
};

export async function getStaticProps() {
  try {
    const entries = await fetchEntries('grants');
    return {
      props: {
        grants: entries,
      },
      revalidate: 1, // In seconds, set to 0 to disable revalidation
    };
  } catch (error) {
    console.log('Error fetching grants:', error);
    return {
      props: {
        grants: [],
      },
    };
  }
}

export default AllGrantsPage;
