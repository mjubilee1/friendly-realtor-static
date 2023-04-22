import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../context';

function generateSiteMap(data) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	 		<url>
				<loc>https://friendlyrealtor.app</loc>
			</url>
     ${data.filter((data) => data.userName)
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

function SiteMap() {}

export async function getServerSideProps({ res }) {
	const userRef = collection(firestore, "users");
	const querySnapshot = await getDocs(userRef);
	let profiles = [];
	querySnapshot.forEach((doc) => {
		profiles.push(doc.data())
	});

  const sitemap = generateSiteMap(profiles);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
