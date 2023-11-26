import Link from 'next/link';
import { Header, Image, Icon, Container } from '../../components/UI';
import { useEffect, useState } from 'react';
import { fetchEntries } from '../../utils/contentfulUtil';
import ReactMarkdown from 'react-markdown';

const GrantPage = ({ data }) => {
  const [grant, setGrant] = useState();

  useEffect(() => {
    setGrant(data);
  }, [data]);

  if (!grant) {
    return (
      <div className="container mx-auto px-4">
        <p>Loading...</p>
      </div>
    );
  }

  const imgUrl = grant.fields.mediaOfGrant
    ? grant.fields.mediaOfGrant.fields.file.url
    : '/default-image.png'; // Replace with your default image
  const imgAlt = grant.fields.mediaOfGrant ? grant.fields.mediaOfGrant.fields.title : 'Grant Photo';

  return (
    <Container
      seoProps={{
        title: `${grant.fields.nameOfGrant} - Grants` || '',
        description: grant.fields.shortDesciption || '',
        openGraph: {
          images: [
            {
              url: imgUrl,
              alt: imgAlt,
              width: 850,
              height: 650,
            },
          ],
        },
      }}
      className="markdown-container"
    >
      <Link href="/grants">
        <Icon name="arrow-left" color="white" size="large" />
      </Link>
      <Header as="h1">{grant.fields.nameOfGrant}</Header>
      <p className="mb-2 text-lg italic">Location - {grant.fields.location}</p>
      {grant.fields.shortDesciption && <p>{grant.fields.shortDesciption}</p>}
      <Image src={imgUrl} alt={imgAlt} size="h-96" className="w-full mt-12 mb-20" />
      <ReactMarkdown>{grant.fields.description}</ReactMarkdown>
    </Container>
  );
};

export async function getStaticPaths() {
  const entries = await fetchEntries('grantModel');

  const paths = entries.map((data) => ({
    params: { title: data.fields.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const { params } = context;
  const slug = params.title; // Assuming the parameter is named 'title'
  const entries = await fetchEntries('grantModel');
  const entry = entries.find((entry) => entry.fields.slug === slug);

  return {
    props: {
      data: entry, // Pass the data to the page component
    },
  };
}

export default GrantPage;
