import Link from 'next/link';
import { Image, Icon, Container } from '../../components/UI';
import { useEffect, useState } from 'react';
import { fetchEntries } from '../../utils/contentfulUtil';
import ReactMarkdown from 'react-markdown';

const BlogPage = () => {
  const [blogPost, setBlogPost] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const entries = await fetchEntries('blogPost');
        const currentSlug = window.location.pathname.replace('/blogs/', '');
        const entry = entries.find((entry) => entry.fields.slug === currentSlug);
        setBlogPost(entry);
      } catch (error) {
        console.log('Error fetching blog posts:', error);
      }
    }

    fetchData();
  }, []);

  if (!blogPost) {
    return (
      <div className="container mx-auto px-4">
        <p>Loading...</p>
      </div>
    );
  }

  const imgUrl = blogPost.fields.featureImage
    ? blogPost.fields.featureImage.fields.file.url
    : '/logo.png';
  const imgAlt = blogPost.fields.featureImage
    ? blogPost.fields.featureImage.fields.title
    : 'Friendly Realtor Photo';

  return (
    <Container
      seoProps={{
        title: `${blogPost.fields.title} - Blog` || '',
        description: blogPost.fields.seoDescription || '',
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
      className="post-container"
    >
      <Link href="/blogs">
        <Icon name="arrow-left" color="white" size="large" />
      </Link>
			<h1>{blogPost.fields.title}</h1>
			<p>Author: {blogPost.fields.author.fields.name}</p>
			<Image src={imgUrl} alt={imgAlt} size="h-96" className="w-full mt-12 mb-20" />
			<ReactMarkdown>{blogPost.fields.excerpt}</ReactMarkdown>
    </Container>
  );
};

export async function getStaticPaths() {
  const entries = await fetchEntries('blogPost');

  const paths = entries.map((data) => ({
    params: { title: data.fields.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const { params } = context;
  const slug = params.title; // Assuming the parameter is named 'title'

  const entries = await fetchEntries('blogPost');
  const entry = entries.find((entry) => entry.fields.slug === slug);

  return {
    props: {
      data: entry, // Pass the data to the page component
    },
  };
}

export default BlogPage;
