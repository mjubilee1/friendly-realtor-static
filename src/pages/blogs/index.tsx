import Link from 'next/link';
import { Container } from '../../components/UI';

const AllBlogPage = () => {
  return (
    <Container>
      <h1>This is going to be the title of the blog page</h1>
      <Link href="/blogs/dssdds">Go to Blog Page</Link>
    </Container>
  );
};

export default AllBlogPage;
