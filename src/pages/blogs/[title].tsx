import Link from 'next/link';
import { Container } from '../../components/UI';

const BlogPage = () => {
  return (
    <Container>
      <Link href="/blogs">Go back home</Link>
    </Container>
  );
};

export default BlogPage;
