import { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
  title: 'Friendly Realtor',
  description:
    'Discover your dream home with our platform! We specialize in assisting first-time buyers, providing expert guidance and making the home buying process seamless. Find your perfect match while gaining a comprehensive understanding of the journey.',
  openGraph: {
    type: 'website',
    title: 'Friendly Realtor',
    url: 'https://jubileespace.com/',
    siteName: 'Friendly Realtor',
    description:
      'Discover your dream home with our platform! We specialize in assisting first-time buyers, providing expert guidance and making the home buying process seamless. Find your perfect match while gaining a comprehensive understanding of the journey.',
    images: [
      {
        url: 'https://images.ctfassets.net/v3wxyl8kvdve/1BO3nXdFLRWPp3SxPyFNtJ/859fc196236bde439457257ec5206a4d/icon.png',
        width: 850,
        height: 650,
        alt: 'Friendly Realtor Logo',
      },
    ],
  },
  twitter: {
    handle: '@FRealtorApp',
    site: '@FRealtorApp',
    cardType: 'summary_large_image',
  },
  facebook: {
    appId: '1339976196848860',
  },
};

export default config;
