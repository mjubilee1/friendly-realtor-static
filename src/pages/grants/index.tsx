import { Container, Header } from '../../components/UI';
import Link from 'next/link';
import { fetchEntries } from '../../utils/contentfulUtil';
import Image from 'next/image';

const AllGrantsPage = ({ grants }) => {
  const grantFields = grants[0]?.fields;
  return (
    <Container
      seoProps={{
        title: `Explore ${grantFields.grantName} Programs - FriendlyRealtor`,
        description:
          'Discover a variety of home buying programs to suit your needs. Learn more about different grants and assistance available for homebuyers.',
      }}
    >
      <Header as="h1" className="pb-8 text-center">
        {grantFields.grantName}
      </Header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {grantFields.allGrants.map((grant) => {
          return (
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
          );
        })}
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
