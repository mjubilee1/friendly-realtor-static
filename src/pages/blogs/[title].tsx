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
      <Container>
        <p>Loading...</p>
      </Container>
    );
  }

  const imgUrl = blogPost.fields.featuredImage
    ? blogPost.fields.featuredImage.fields.file.url
    : '/logo.png';
  const imgAlt = blogPost.fields.featuredImage
    ? blogPost.fields.featuredImage.fields.title
    : 'Friendly Realtor Photo';

  return (
    <div className="post-container">
      <Link href="/blogs">
        <Icon name="arrow-left" color="white" size="large" />
      </Link>
      <Container>
        <h1>{blogPost.fields.title}</h1>
        <p>Author: {blogPost.fields.author.fields.name}</p>
        <Image src={imgUrl} alt={imgAlt} />
        <ReactMarkdown>{blogPost.fields.excerpt}</ReactMarkdown>
      </Container>
    </div>
  );
};

export default BlogPage;
