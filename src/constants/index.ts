import {
  people01,
  people02,
  people03,
  facebook,
  instagram,
  linkedin,
  twitter,
  airbnb,
  binance,
  coinbase,
  dropbox,
  send,
  shield,
  star,
  quotes,
  youtube,
  twitch,
} from '../assets';

export const communities = [
  {
    title: 'Washington D.C.',
    id: 'idx?path=/listing-report&id=2576362',
  },
  {
    title: 'Virginia',
    id: 'idx?path=/listing-report&id=2576365',
  },
  {
    title: 'Maryland',
    id: 'idx?path=/listing-report&id=2576364',
  },
  {
    title: 'New Jersey',
    id: 'idx?path=/listing-report&id=2576370',
  },
  {
    title: 'Pennsylvania',
    id: 'idx?path=/listing-report&id=2576367',
  },
  {
    title: 'West Virginia',
    id: 'idx?path=/listing-report&id=2576369',
  },
  {
    title: 'Delaware',
    id: 'idx?path=/listing-report&id=2576368',
  },
];

export const navLinks = [
  {
    id: '/find-a-realtor',
    title: 'Find A Realtor',
  },
  {
    id: '/find-homes',
    title: 'Search Homes',
  },
  {
    id: '/grants',
    title: 'Find Loan Programs',
  },
  {
    id: '/event-center',
    title: 'Find Nearby Events',
  },
  /*{
    id: '/tools',
    title: 'AI Tools',
  },*/
  {
    id: '/resources',
    title: 'Resources',
    dropdown: [
      {
        id: '/blogs',
        title: 'Blogs',
      },
      {
        id: '/valuation',
        title: 'Free Home Valuation',
      },
      {
        id: '/mortgage-calculator',
        title: 'Mortgage Calculator',
      },
    ],
  },
  {
    id: '/mission',
    title: 'Mission Statement',
  },
];

export const features = [
  {
    id: 'feature-0',
    icon: star,
    title: 'Seamless Realtor Events',
    content: `Experience the benefits of our event hosting feature – it's free to download and use! Host and promote your events, allowing attendees to connect with you directly. Agents can acquire leads in real-time through our mobile app, making event management a breeze.`,
  },
  {
    id: 'feature-1',
    icon: quotes,
    title: 'Building Community Trust',
    content:
      'Facilitate community trust by simplifying event coordination. Strategically plan and manage gatherings, prioritizing local connections to enhance realtor engagement—all through the Event Center.',
  },
  {
    id: 'feature-2',
    icon: shield,
    title: 'Instant Networking Boost',
    content:
      'Boost your networking and lead generation efforts with the Event Center. Connect with potential clients, share insights, and enhance your real estate success with this powerful tool.',
  },
];

export const feedback = [
  {
    id: 'feedback-1',
    content:
      'Money is only a tool. It will take you wherever you wish, but it will not replace you as the driver.',
    name: 'Herman Jensen',
    title: 'Founder & Leader',
    img: people01,
  },
  {
    id: 'feedback-2',
    content: "Money makes your life easier. If you're lucky to have it, you're lucky.",
    name: 'Steve Mark',
    title: 'Founder & Leader',
    img: people02,
  },
  {
    id: 'feedback-3',
    content:
      'It is usually people in the money business, finance, and international trade that are really rich.',
    name: 'Kenn Gallagher',
    title: 'Founder & Leader',
    img: people03,
  },
];

export const stats = [
  {
    id: 'stats-1',
    title: 'User Active',
    value: '3800+',
  },
  {
    id: 'stats-2',
    title: 'Trusted by Company',
    value: '230+',
  },
  {
    id: 'stats-3',
    title: 'Transaction',
    value: '$230M+',
  },
];

export const footerLinks = [
  {
    title: 'Useful Links',
    links: [
      {
        name: 'Terms & Services',
        href: 'https://app.termly.io/document/terms-and-conditions/22db5147-f672-4e1a-8ce9-0568d1c88332',
      },
      {
        name: 'Privacy Policy',
        href: 'https://app.termly.io/document/privacy-policy/73841773-0c89-4160-9269-9bc3ba0a4dbd',
      },
      {
        name: 'Sitemap',
        href: '/sitemap.xml',
      },
      {
        name: 'Blogs',
        href: '/blogs',
      },
      {
        name: 'Contact',
        href: '/contact',
      },
      {
        href: '/services',
        name: 'For Realtors',
      },
      {
        href: 'https://join.homeactions.net/signup/MontrellJubilee',
        name: 'Newsletter',
      },
    ],
  },
];

export const socialMedia = [
  {
    id: 'social-media-1',
    icon: instagram,
    link: 'https://www.instagram.com/friendlyrealtor.app/',
  },
  {
    id: 'social-media-2',
    icon: facebook,
    link: 'https://www.facebook.com/profile.php?id=100091290482188',
  },
  {
    id: 'social-media-3',
    icon: twitter,
    link: 'https://twitter.com/FRealtorApp',
  },
  {
    id: 'social-media-5',
    icon: twitch,
    link: 'https://www.twitch.tv/friendlyrealtor',
  },
  {
    id: 'social-media-4',
    icon: linkedin,
    link: 'https://www.linkedin.com/in/friendly-realtor-427a4727a/',
  },
  {
    id: 'social-media-6',
    icon: youtube,
    link: 'https://www.youtube.com/channel/UCp4zJrVV5VpRQm9eW8K0dug',
  },
];

export const clients = [
  {
    id: 'client-1',
    logo: airbnb,
  },
  {
    id: 'client-2',
    logo: binance,
  },
  {
    id: 'client-3',
    logo: coinbase,
  },
  {
    id: 'client-4',
    logo: dropbox,
  },
];
