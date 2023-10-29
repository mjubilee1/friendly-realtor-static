import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Image, Header, Container } from '../../components/UI';
import { fetchEntries } from '../../utils/contentfulUtil';

const AllBlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 9;

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

  // Calculate the current posts to display
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container
      seoProps={{
        title: 'FriendlyRealtor - Discover Friendly Realtors Blog Post',
        description:
          'Explore our latest blog post to discover valuable insights and tips from friendly realtors.',
      }}
    >
      <Header as="h1" className="pb-8 text-center">
        Discover Friendly Realtors Blog Post
      </Header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentPosts.map((post) => (
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
      <div className="flex justify-center mt-4">
        {blogPosts.length > postsPerPage && (
          <ul className="flex gap-4">
            {Array(Math.ceil(blogPosts.length / postsPerPage))
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

export default AllBlogPage;
