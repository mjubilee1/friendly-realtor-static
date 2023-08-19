import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../context';
import {
  getServerSideSitemapIndexLegacy,
  getServerSideSitemap,
  GetServerSideProps,
} from 'next-sitemap';
import { fetchEntries } from '../../utils/contentfulUtil';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const userRef = collection(firestore, 'users');
  const querySnapshot = await getDocs(userRef);
  let profilesSitemaps = [];
  querySnapshot.forEach((doc) => {
    profilesSitemaps.push({
      loc: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/agent/${
        doc.data().username || doc.data().userName
      }`,
      lastmod: new Date().toISOString(),
    });
  });

  const blogPosts = await fetchEntries('blogPost');
  const blogPostSitemaps = blogPosts.map((blogPost) => ({
    loc: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/blog/${blogPost.fields.slug}`,
    lastmod: new Date(blogPost.sys.updatedAt).toISOString(),
  }));

  // Add properties document to sitemap
  const propertiesDocRef = doc(firestore, 'properties', 'properties');
  const propertiesDocSnapshot = await getDoc(propertiesDocRef);
  const properties = propertiesDocSnapshot.data();

  let propertiesSitemaps = [];
  properties?.ids?.map((id) => {
    propertiesSitemaps.push({
      loc: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/listing/${id}`,
      lastmod: new Date().toISOString(),
    });
  });

  const fields = [...blogPostSitemaps, ...profilesSitemaps, ...propertiesSitemaps];
  return getServerSideSitemapIndexLegacy(ctx, fields);
};

export default function SitemapIndex() {}
