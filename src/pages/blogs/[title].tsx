import Link from 'next/link';
import { Image, Icon, Container } from '../../components/UI';
import { useEffect, useState } from 'react';
import { fetchEntries } from '../../utils/contentfulUtil';
import ReactMarkdown from 'react-markdown';
import Head from 'next/head';

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
      <Container>
        <p>Loading...</p>
      </Container>
    );
  }

  const imgUrl = blogPost.fields.featureImage
    ? blogPost.fields.featureImage.fields.file.url
    : '/logo.png';
  const imgAlt = blogPost.fields.featureImage
    ? blogPost.fields.featureImage.fields.title
    : 'Friendly Realtor Photo';

  return (
    <div className="post-container">
      <Head>
        <title>{blogPost.fields.title} - Blog</title>
        <meta name="description" content={blogPost.fields.seoDescription} />
        <meta property="og:title" content={blogPost.fields.title} />
        <meta property="og:description" content={blogPost.fields.seoDescription} />
        <meta property="og:image" content={imgUrl} />
        <meta property="og:image:alt" content={imgAlt} />
      </Head>
      <Link href="/blogs">
        <Icon name="arrow-left" color="white" size="large" />
      </Link>
      <Container>
        <h1>{blogPost.fields.title}</h1>
        <p>Author: {blogPost.fields.author.fields.name}</p>
        <Image src={imgUrl} alt={imgAlt} size="w-full h-72" className="mt-12 mb-20" />
        <ReactMarkdown>{blogPost.fields.excerpt}</ReactMarkdown>
      </Container>
    </div>
  );
};

export async function getStaticPaths() {
  const entries = await fetchEntries('blogPost');

  const paths = entries
    .map((data) => ({
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
