import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../context';
import { getServerSideSitemap } from 'next-sitemap';
import { fetchEntries } from '../../utils/contentfulUtil';

export const getServerSideProps = async (ctx) => {
  const userRef = collection(firestore, 'users');
  const querySnapshot = await getDocs(userRef);
  let profiles = [];
  querySnapshot.forEach((doc) => {
    profiles.push(doc.data());
  });

  const blogPosts = await fetchEntries('blogPost');

  const blogPostSitemaps = blogPosts.items.map((blogPost) => ({
    loc: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/blog/${blogPost.fields.slug}`,
    lastmod: new Date(blogPost.sys.updatedAt).toISOString(),
  }));

  const fields = [...blogPostSitemaps];
  return getServerSideSitemap(fields, ctx);
};

export default function Site() {}
