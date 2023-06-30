import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../context';
import { getServerSideSitemap } from 'next-sitemap';
import { fetchEntries } from '../../utils/contentfulUtil';

export const getServerSideProps = async (ctx) => {
  const userRef = collection(firestore, 'users');
  const querySnapshot = await getDocs(userRef);
  let profilesSitemaps = [];
  querySnapshot.forEach((doc) => {
    profilesSitemaps.push({
      loc: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/users/${doc.data().username || doc.data().userName}`,
      lastmod: new Date(doc.data().updatedAt).toISOString(),
    });
  });

  const blogPosts = await fetchEntries('blogPost');

  const blogPostSitemaps = blogPosts.items.map((blogPost) => ({
    loc: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/blog/${blogPost.fields.slug}`,
    lastmod: new Date(blogPost.sys.updatedAt).toISOString(),
  }));

  // Add properties document to sitemap
  const propertiesDocRef = doc(firestore, 'properties', 'properties');
  const propertiesDocSnapshot = await getDoc(propertiesDocRef);
	const properties = propertiesDocSnapshot.data()
	
	let propertiesSitemaps = []
	properties.ids?.map((prop) => {
		propertiesSitemaps.push({
			loc: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/listings?id=${prop}`,
			lastmod: new Date(properties.updatedAt).toISOString(),
		})
	})

  const fields = [...blogPostSitemaps, ...profilesSitemaps, ...propertiesSitemaps];
  return getServerSideSitemap(fields, ctx);
};

export default function Site() {}
