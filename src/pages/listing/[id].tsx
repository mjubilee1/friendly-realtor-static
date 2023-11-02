import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../context';
import type { GetStaticPaths } from 'next';
import { Container } from '../../components/UI';

const ListingPage = () => {
  return (
    <Container
      seoProps={{
        title: 'FriendlyRealtor - Listing(s)',
      }}
    >
      <div id="content-container" />
    </Container>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const propertiesDocRef = doc(firestore, 'properties', 'properties');
  const propertiesDocSnapshot = await getDoc(propertiesDocRef);
  const data = propertiesDocSnapshot.data();
  const paths =
    data?.ids?.map((id: string) => ({
      params: { id },
    })) || [];
  return { paths, fallback: false };
};

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default ListingPage;
