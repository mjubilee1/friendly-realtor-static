import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../context';
import { getServerSideSitemap } from 'next-sitemap';

function generateSiteMap(data) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${data
       .filter((data) => data.userName)
       .map(({ userName }) => {
         return `
       <url>
           <loc>${`https://friendlyrealtor.app/profile/${userName}`}</loc>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

export const getServerSideProps = async (ctx) => {
  const userRef = collection(firestore, 'users');
  const querySnapshot = await getDocs(userRef);
  let profiles = [];
  querySnapshot.forEach((doc) => {
    profiles.push(doc.data());
  });

  const newSitemaps = profiles.map((profile) => ({
    loc: `${process.env.NEXT_PUBLIC_DOMAIN_URL}${profile.userName}`,
    lastmod: new Date().toISOString(),
  }));

  const fields = [...newSitemaps];
  return getServerSideSitemap(fields, ctx);
};

export default function Site() {}
