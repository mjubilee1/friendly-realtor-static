import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Image, Header, Container } from '../../components/UI';
import { fetchEntries } from '../../utils/contentfulUtil';
import Head from 'next/head';

const AllBlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const entries = await fetchEntries('blogPost');
        setBlogPosts(entries);
      } catch (error) {
        console.log('Error fetching blog posts:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <Container>
      <Head>
        <title> Discover Friendly Realtors Blog Post</title>
        <meta
          name="description"
          content="Explore our latest blog post to discover valuable insights and tips from friendly realtors."
        />
        <meta property="og:title" content="Discover Friendly Realtors Blog Post" />
        <meta
          property="og:description"
          content="Explore our latest blog post to discover valuable insights and tips from friendly realtors."
        />
      </Head>
      <Header as="h1" className="pb-8">
        Discover Friendly Realtors Blog Post
      </Header>
      <div className="grid grid-cols-3 gap-24">
        {blogPosts.map((post) => (
          <Link href={`/blogs/${post.fields.slug}`} key={post.sys.id} className="text-center">
            <Header as="h4" className="font-semibold mb-2">
              {post.fields.title}
            </Header>
            <Image
              src={post.fields.featureImage.fields.file.url}
              alt={post.fields.featureImage.fields.title}
              size="w-full h-64"
            />
            <p className="mt-2">Author: {post.fields.author.fields.name}</p>
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default AllBlogPage;
