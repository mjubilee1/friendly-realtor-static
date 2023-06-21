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
        <title>Discover Friendly Realtors Blog Post</title>
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
      <Header as="h1" className="pb-8 text-center">
        Discover Friendly Realtors Blog Post
      </Header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Link href={`/blogs/${post.fields.slug}`} key={post.sys.id} className="text-center">
            <div className="max-w-xs mx-auto h-full bg-gray-500 rounded-lg shadow-md overflow-hidden">
              <Image
                src={post.fields.featureImage.fields.file.url}
                alt={post.fields.featureImage.fields.title}
                size="w-full h-64"
              />
              <div className="p-4">
                <Header as="h4" className="font-semibold mb-2">
                  {post.fields.title}
                </Header>
                <p className="mt-2">Author: {post.fields.author.fields.name}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default AllBlogPage;
