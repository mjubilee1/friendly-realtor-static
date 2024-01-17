import { Html, Head, Main, NextScript } from 'next/document';
import { FB_PIXEL_ID } from '../utils/analyticsUtil';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
              {
                "@context": "http://www.schema.org",
                "@type": "WebSite",
                "name": "Jubilee Investments LLC",
                "alternateName": "Jubilee Investments LLC",
                "url": "https://jubileespace.com/"
              }
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
              {
                "@context": "http://schema.org",
                "@type": "WebPage",
                "name": "Jubilee Investments LLC",
                "description": "FriendlyRealtor platform streamlines the process of matching home buyers with top-producing agents, ensuring you find the best fit for your needs.",
                "publisher": {
                  "@type": "service",
                  "name": "Jubilee Investments LLC"
                },
                "license": "https://jubileespace.com/"
              }
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
              {
                "@context": "http://www.schema.org",
                "@type": "localbusiness",
                "name": "Jubilee Investments LLC",
                "telephone": "2409064819",
                "url": "https://jubileespace.com/",
                "logo": "https://jubileespace.com/_next/static/media/logo.0d1f047c.png",
                "image": "https://images.ctfassets.net/v3wxyl8kvdve/3e4nrqrsn1ZinOk95n6dA9/2d72c227fd013b90d03babd869d83e41/Banner.png",
                "pricerange": "$$$",
                "description": "Assisting Buyers in Discovering Their Dream Home Our platform simplifies the path to homeownership for first-time buyers with expert guidance, comprehensive listings, and transparent financial assistance. Connecting Home Buyers with Top-Producing Agents in Your Area Our platform streamlines the process of matching home buyers with top-producing agents, ensuring you find the best fit for your needs.",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Alexandria",
                  "addressRegion": "VA",
                  "postalCode": "22303",
                  "addressCountry": "USA"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "longitude": "-77.0470229",
                  "latitude": "38.8051095"
                },
                "contactPoint": {
                  "@type": "PostalAddress",
                  "contactType": "Customer Service",
                  "telephone": "2409064819"
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "5",
                  "bestRating": "5",
                  "worstRating": "0",
                  "reviewCount": "10"
                },
                "review": {
                  "@type": "Review",
                  "author": {
                    "@type": "Person",
                    "name": "Fred B"
                  },
                  "datePublished": "2023-05-15",
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5",
                    "worstRating": "0"
                  },
                  "reviewBody": "I'm glad. So easy to use. 100% Recommended"
                },
                "sameAs": [
                  "https://www.instagram.com/friendlyrealtor.app/",
                  "https://www.facebook.com/profile.php?id=100091290482188",
                  "https://twitter.com/FRealtorApp",
                  "https://www.twitch.tv/friendlyrealtor",
                  "https://www.linkedin.com/in/friendly-realtor-427a4727a/",
                  "https://www.youtube.com/channel/UCp4zJrVV5VpRQm9eW8K0dug"
                ]
              }
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
              {
                "@context": "http://www.schema.org",
                "@type": "professionalService",
                "name": "Jubilee Investments LLC",
                "url": "https://jubileespace.com/",
                "logo": "https://jubileespace.com/_next/static/media/logo.0d1f047c.png",
                "image": "https://images.ctfassets.net/v3wxyl8kvdve/3e4nrqrsn1ZinOk95n6dA9/2d72c227fd013b90d03babd869d83e41/Banner.png",
                "priceRange": "Affordable",
                "telephone": "2409064819",
                "description": "Assisting Buyers in Discovering Their Dream Home Our platform simplifies the path to homeownership for first-time buyers with expert guidance, comprehensive listings, and transparent financial assistance. Connecting Home Buyers with Top-Producing Agents in Your Area Our platform streamlines the process of matching home buyers with top-producing agents, ensuring you find the best fit for your needs",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Alexandria",
                  "addressRegion": "VA",
                  "postalCode": "22303",
                  "addressCountry": "USA"
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "5",
                  "bestRating": "5",
                  "worstRating": "0",
                  "reviewCount": "10"
                },
                "openingHoursSpecification": [
                  {
                    "@context": "https://schema.org",
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": "Saturday",
                    "opens": "24 hours"
                  },
                  {
                    "@context": "https://schema.org",
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": "Sunday",
                    "opens": "24 hours"
                  },
                  {
                    "@context": "https://schema.org",
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": "Monday",
                    "opens": "24 hours"
                  },
                  {
                    "@context": "https://schema.org",
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": "Tuesday",
                    "opens": "24 hours"
                  },
                  {
                    "@context": "https://schema.org",
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": "Wednesday",
                    "opens": "24 hours"
                  },
                  {
                    "@context": "https://schema.org",
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": "Thursday",
                    "opens": "24 hours"
                  },
                  {
                    "@context": "https://schema.org",
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": "Friday",
                    "opens": "24 hours"
                  }
                ],
                "sameAs": [
                  "https://www.instagram.com/friendlyrealtor.app/",
                  "https://www.facebook.com/profile.php?id=100091290482188",
                  "https://twitter.com/FRealtorApp",
                  "https://www.twitch.tv/friendlyrealtor",
                  "https://www.linkedin.com/in/friendly-realtor-427a4727a/",
                  "https://www.youtube.com/channel/UCp4zJrVV5VpRQm9eW8K0dug"
                ],
                "geo": {
                  "@type": "GeoCoordinates",
                  "longitude": "-77.0470229",
                  "latitude": "38.8051095"
                }
              }
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
              {
                "@context": "http://schema.org",
                "@type": "Organization",
                "name": "JubileeInvestments LLC",
                "url": "https://jubileespace.com/",
                "sameAs": [
                  "https://www.instagram.com/friendlyrealtor.app/",
                  "https://www.facebook.com/profile.php?id=100091290482188",
                  "https://twitter.com/FRealtorApp",
                  "https://www.twitch.tv/friendlyrealtor",
                  "https://www.linkedin.com/in/friendly-realtor-427a4727a/",
                  "https://www.youtube.com/channel/UCp4zJrVV5VpRQm9eW8K0dug"
                ]
              }
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
              {
                "@context": "http://schema.org",
                "@type": "Organization",
                "url": "https://jubileespace.com/contact",
                "contactPoint": [
                  {
                    "@type": "ContactPoint",
                    "telephone": "2409064819",
                    "contactType": "customer service"
                  }
                ]
              }
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
              {
                "@context": "http://schema.org",
                "@type": "Organization",
                "url": "https://jubileespace.com/",
                "logo": "https://jubileespace.com/_next/static/media/logo.0d1f047c.png"
              }
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
              {
                "@context": "http://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "item": {
                      "@id": "https://jubileespace.com/",
                      "name": "Home"
                    }
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "item": {
                      "@id": "https://jubileespace.com/find-a-realtor",
                      "name": "Find A Realtor"
                    }
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "item": {
                      "@id": "https://jubileespace.com/find-homes",
                      "name": "Search Homes"
                    }
                  },
                  {
                    "@type": "ListItem",
                    "position": 4,
                    "item": {
                      "@id": "https://jubileespace.com/grants",
                      "name": "Find Home Buying Program(s)"
                    }
                  },
                  {
                    "@type": "ListItem",
                    "position": 5,
                    "item": {
                      "@id": "https://jubileespace.com/event-center",
                      "name": "Event Center"
                    }
                  },
                  {
                    "@type": "ListItem",
                    "position": 6,
                    "item": {
                      "@id": "https://jubileespace.com/tools",
                      "name": "AI Tools"
                    }
                  },
                  {
                    "@type": "ListItem",
                    "position": 7,
                    "item": {
                      "@id": "https://jubileespace.com/mission",
                      "name": "Our Mission"
                    }
                  }
                ]
              }
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
              {
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": "Our Mission",
                "description": "At FriendlyRealtor, we're your trusted partner on the path to homeownership. Our dedication is to help individuals and families turn their homeownership dreams into reality within the next 3-5 years. Friendly Realtor Montrell Montrell Jubilee, Founder & CEO Montrell's remarkable journey began on the scenic Eastern Shore of Virginia and Maryland, where he spent his formative years surrounded by the beauty of nature and the warmth of close-knit communities. With an unwavering passion for technology and innovation, he embarked on his educational path, ultimately finding his way to Towson University, where he delved deep into the world of computer science. His academic pursuits not only honed his technical skills but also instilled in him a profound appreciation for the possibilities of the digital age. Upon graduating, Montrell made a deliberate choice to immerse himself in the bustling and diverse landscape of Baltimore and Towson. Over the past four years, he has cultivated a rich tapestry of relationships and professional connections that have contributed to both his personal and career growth. His experiences have been instrumental in shaping FriendlyRealtor into the trusted entity it is today.",
                "image": ["https://jubileespace.com/_next/static/media/montrell.695da4c3.jpg"],
                "datePublished": "2023-01-01T08:00:00+08:00",
                "dateModified": "2023-11-11T09:20:00+08:00",
                "author": [{
                  "@type": "Person",
                  "name": "Jubilee Investments LLC",
                  "url": "https://jubileespace.com/mission"
                }]
              }
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
              {
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": "Maryland Mortgage Program 1st Time Advantage",
                "description": "1st Time Advantage Program 1. 1st Time Advantage Direct: No down payment assistance available. Competitive interest rates. External DPA sources can be used. 2. 1st Time Advantage 6000: $6,000 loan for down payment/closing costs. Zero percent interest. Repayment when the first mortgage ends. 3. 1st Time Advantage 3%, 4%, 5% Loans: DPA loan equals 3%, 4%, 5% of the first mortgage. Zero percent deferred second lien. 4. HomeStart: For borrowers with ≤50% AMI. 0% interest, 30-year deferred DPA loan equals 6% of MMP total loan amount. Targeted Areas in Maryland Designated by the U.S. Census Bureau, Targeted Areas in Maryland provide fewer restrictions for homebuyers through the Maryland Mortgage Program. The state's counties fall into three categories: Full Counties: Allegany County Baltimore City Caroline County Dorchester County Garrett County Kent County Somerset County Partial Counties: Anne Arundel County Baltimore County Frederick County Harford County Montgomery County Prince George's County Washington County Wicomico County",
                "image": ["https://images.ctfassets.net/v3wxyl8kvdve/5o8bQDDvyk8QsnP1aczu75/e27b4e20805bd6a70b4ac7a1f4c00057/header.jpg"],
                "datePublished": "2023-01-01T08:00:00+08:00",
                "dateModified": "2023-11-11T09:20:00+08:00",
                "author": [{
                  "@type": "Person",
                  "name": "Jubilee Investments LLC",
                  "url": "https://jubileespace.com/grants/mmp-1st-time-advantage"
                }]
              }
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
              {
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": "Maryland Mortgage Program Flex",
                "description": "Flex Direct Flex Direct is a Maryland loan program that offers competitive interest rates for repeat homebuyers. While there is no down payment assistance (DPA), you can use external sources for DPA. Flex 5000 Flex 5000 gives you a $5,000 loan for down payment and closing costs. This second lien has zero interest, and you don't need to make payments during the first mortgage period. Repayment is required when the first mortgage ends (repayment, refinance, transfer, sale, etc.). The 5000 line is eligible for Partner Match funds, if applicable. Flex 3% Loan Flex 3% Loan is a Maryland loan program that provides a DPA loan equal to 3% of the first mortgage in a zero percent deferred second lien. Talk to an approved MMP lender to determine which loan is best for you!",
                "image": ["https://images.ctfassets.net/v3wxyl8kvdve/7gDzE7rCe80Lhr5vioP30e/e7649b3aa4d01ba54ed2e9f07826f78b/special-initiatives_sm.jpg"],
                "datePublished": "2023-01-01T08:00:00+08:00",
                "dateModified": "2023-11-11T09:20:00+08:00",
                "author": [{
                  "@type": "Person",
                  "name": "Jubilee Investments LLC",
                  "url": "https://jubileespace.com/grants/maryland-mortgage-program-flex"
                }]
              }
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
              {
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": "Maryland Partner Match Programs",
                "description": "Programs to Support Homebuyers Various organizations offer programs to assist homebuyers, including: Employers: Investing in the long-term sustainability of their workforce. Home builders and real estate developers: Providing financial incentives for property purchase. Community organizations: Encouraging homeownership to build sustainable neighborhoods. Local governments: Attracting new residents to their community. These programs may include grants, loans, and other helpful assistance. Research early in the homebuying process to discover available programs. If you're using the 1st Time Advantage 6000 or the Flex 6000 loan products, any financial assistance received from Partners is matched (up to $2,500) as additional down payment assistance. This additional funding is available as a no-interest, deferred loan from the state, payable when the first mortgage is fully paid off. Certified Partners, including Employers, Homebuilders, Community Organizations, and Local Governments, can be found in our database. Search for Partners. Special Information for State of Maryland Employees: Contact a state-approved mortgage lenders to learn how you can add Partner Match assistance to your Maryland Mortgage Program home loan.",
                "image": ["https://images.ctfassets.net/v3wxyl8kvdve/6fh27NMFtI1E21zaLPeiVh/0b060ab8e16a3ee5aac05617db782c5c/partner-match_sm.jpg"],
                "datePublished": "2023-01-01T08:00:00+08:00",
                "dateModified": "2023-11-11T09:20:00+08:00",
                "author": [{
                  "@type": "Person",
                  "name": "Jubilee Investments LLC",
                  "url": "https://jubileespace.com/grants/maryland-partner-match-programs"
                }]
              }
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
              {
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": "Montgomery County Specialty Products",
                "description": "The Montgomery Homeownership Program VIII and the Montgomery Employee Down Payment Assistance Loan (MEDPAL) are initiatives of the Maryland Mortgage Program (MMP) in partnership with Montgomery County, providing down payment and closing cost assistance loans for eligible homebuyers purchasing in Montgomery County. Talk to your loan officer to check eligibility. Montgomery Homeownership Program Available to any MMP-eligible borrower in Montgomery County. MMP first mortgage comes with a second mortgage equal to 40% of the qualifying borrower income, with a maximum of $25,000 for down payment and closing cost assistance. Second mortgage has a zero percent interest rate and repayment is deferred until sale, refinance, transfer, or 30 years, whichever comes first. Minimum down payment set by the insurer, and second mortgage funds can be used for the borrower contribution. MHP Fact Sheet Montgomery Employee DPA Loan Available to approved Montgomery County employees purchasing in Montgomery County. MMP first mortgage comes with a $25,000 second mortgage. Second mortgage has a zero percent interest rate and can be re-subordinated in the event of a non-cash out refinance. Repayment required in case of cash-out refinance or property sale/transfer, forgiven after 30 years. Minimum down payment set by the insurer, and borrower must provide at least 1% of the purchase price with their own funds in addition to the second mortgage.",
                "image": ["https://images.ctfassets.net/v3wxyl8kvdve/6NFBQQVm9ezxchvrIvRjf1/8aec474fe9ee53f9b06804a8cb93a49c/image1.jpg"],
                "datePublished": "2023-01-01T08:00:00+08:00",
                "dateModified": "2023-11-11T09:20:00+08:00",
                "author": [{
                  "@type": "Person",
                  "name": "Jubilee Investments LLC",
                  "url": "https://jubileespace.com/grants/montgomery-county-specialty-products"
                }]
              }
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
              {
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": "Greenbelt, Maryland Home Advantage",
                "description": "Greenbelt Home Advantage Program Make the switch to homeownership with the Greenbelt Home Advantage program. In collaboration with the Maryland Department of Housing and Community Development and the City of Greenbelt, eligible first-time homebuyers in zip code 20770 can receive a $15,000 grant for down payment and closing cost assistance when purchasing a home in Greenbelt. Download Resources: Greenbelt Home Advantage Fact Sheet Greenbelt Home Advantage Flyer Getting Started If you're ready to benefit from this special program: Talk to a Lender: Confirm your eligibility and meet requirements with the help of a lender. Ensure attendance in the right Homebuyer Education Class. Check Your Eligibility: Verify your eligibility for a Maryland Mortgage Program loan. Note that eligibility doesn't guarantee approval, and factors like income, credit history, and employment will be considered. Complete a Homebuyer Education Class: Be prepared to make informed decisions by completing a Homebuyer Education class, available throughout Maryland.",
                "image": ["https://images.ctfassets.net/v3wxyl8kvdve/5AloKg35qBLmKqWR05E3Pg/d05f6ebf8f1847fd56fa8e5b72ec4999/GHA-header.jpg"],
                "datePublished": "2023-01-01T08:00:00+08:00",
                "dateModified": "2023-11-11T09:20:00+08:00",
                "author": [{
                  "@type": "Person",
                  "name": "Jubilee Investments LLC",
                  "url": "https://jubileespace.com/grants/greenbelt-home-advantage"
                }]
              }
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
              {
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": "Maryland Home Ability Program",
                "description": "HomeAbility Program HomeAbility helps Maryland homebuyers with disabilities. It offers loans for up to 95% of the home value and extra money for down payment and closing costs. The interest rate is low, and some of the money doesn't need to be paid back until you sell or refinance the home. Who Can Apply? Anyone with a disability or taking care of a disabled family member. You must show proof of disability and have an income less than 80% of the average. Learn more about HomeAbility | Get the Disability Certificate Important: Only certain lenders can offer HomeAbility. See the list of lenders.",
                "image": ["https://images.ctfassets.net/v3wxyl8kvdve/7gDzE7rCe80Lhr5vioP30e/e7649b3aa4d01ba54ed2e9f07826f78b/special-initiatives_sm.jpg"],
                "datePublished": "2023-11-01T08:00:00+08:00",
                "dateModified": "2023-11-11T09:20:00+08:00",
                "author": [{
                  "@type": "Person",
                  "name": "Jubilee Investments LLC",
                  "url": "https://jubileespace.com/grants/maryland-home-ability-program"
                }]
              }
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
              {
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": "Maryland SmartBuy Program",
                "description": "Maryland SmartBuy 3.0 Program Maryland SmartBuy 3.0 offers homebuyers the chance to purchase a Maryland home while addressing their student debt. Program Eligibility: To qualify, homebuyers need existing student debt (min. $1,000). The program provides up to 15% of the home purchase price (max. $20,000) to pay off student debt. Full debt for one borrower must be paid off during the home purchase, meeting Maryland Mortgage program requirements. Approved Lenders: Explore financing through approved SmartBuy lenders. They assist in confirming eligibility and meeting program requirements. SmartBuy 3.0 Fact Sheet",
                "image": ["https://images.ctfassets.net/v3wxyl8kvdve/3e4nrqrsn1ZinOk95n6dA9/2d72c227fd013b90d03babd869d83e41/Banner.png"],
                "datePublished": "2023-11-01T08:00:00+08:00",
                "dateModified": "2023-11-11T09:20:00+08:00",
                "author": [{
                  "@type": "Person",
                  "name": "Jubilee Investments LLC",
                  "url": "https://jubileespace.com/grants/maryland-smartbuy-program"
                }]
              }
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
              {
                "@context": "https://schema.org",
                "@type": "Blogposting",
                "headline": "Homes By Friendly Realtor",
                "description": "HomesByFriendlyRealtor - Find Your Dream Home Here FriendlyRealtor Real Estate Corporation Official Newsletter Are you looking for some tips on home buying? If so, you've come to the right place! We are a team of experts who help home buyers measure their success towards homeownership. We know how challenging and rewarding it can be to buy your own home, and we want to share our knowledge and experience with you. That's why we created this newsletter, where we will send you weekly tips, advice, and resources on topics such as: How to assess your financial readiness for homeownership? How to find the best mortgage option for your situation? How to negotiate with sellers and agents? How to prepare for the closing process? How to maintain and improve your home value? Your Path to Homeownership Assessing Your Financial Readiness for Homeownership Ready to buy a home? It starts with ensuring financial stability. Check for: A stable income A solid credit score A manageable debt-to-income ratio Savings for a down payment and closing costs Don't forget to consider ongoing expenses like property taxes, insurance, maintenance, repairs, and utilities. Seek expert guidance from financial planners or mortgage lenders for a comprehensive assessment.",
                "image": ["https://images.ctfassets.net/v3wxyl8kvdve/2knFMjLoad34BBwrDHLsPr/344ea6165326586215ce5e4b7d5f6cea/home__real_estate__home_design_logo.png"],
                "datePublished": "2023-11-01T08:00:00+08:00",
                "dateModified": "2023-11-11T09:20:00+08:00",
                "author": [{
                  "@type": "Person",
                  "name": "Friendly Realtor",
                  "url": "https://jubileespace.com/blogs/homes-by-friendly-realtor"
                }]
              }
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
              {
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": "Montgomery County Specialty Products",
                "description": "The Montgomery Homeownership Program VIII and the Montgomery Employee Down Payment Assistance Loan (MEDPAL) are initiatives of the Maryland Mortgage Program (MMP) in partnership with Montgomery County, providing down payment and closing cost assistance loans for eligible homebuyers purchasing in Montgomery County. Talk to your loan officer to check eligibility. Montgomery Homeownership Program Available to any MMP-eligible borrower in Montgomery County. MMP first mortgage comes with a second mortgage equal to 40% of the qualifying borrower income, with a maximum of $25,000 for down payment and closing cost assistance. Second mortgage has a zero percent interest rate and repayment is deferred until sale, refinance, transfer, or 30 years, whichever comes first. Minimum down payment set by the insurer, and second mortgage funds can be used for the borrower contribution. MHP Fact Sheet Montgomery Employee DPA Loan Available to approved Montgomery County employees purchasing in Montgomery County. MMP first mortgage comes with a $25,000 second mortgage. Second mortgage has a zero percent interest rate and can be re-subordinated in the event of a non-cash out refinance. Repayment required in case of cash-out refinance or property sale/transfer, forgiven after 30 years. Minimum down payment set by the insurer, and borrower must provide at least 1% of the purchase price with their own funds in addition to the second mortgage.",
                "image": ["https://images.ctfassets.net/v3wxyl8kvdve/6NFBQQVm9ezxchvrIvRjf1/8aec474fe9ee53f9b06804a8cb93a49c/image1.jpg"],
                "datePublished": "2023-01-01T08:00:00+08:00",
                "dateModified": "2023-11-11T09:20:00+08:00",
                "author": [{
                  "@type": "Person",
                  "name": "Jubilee Investments LLC",
                  "url": "https://jubileespace.com/grants/montgomery-county-specialty-products"
                }]
              }
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
              {
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": "Greenbelt, Maryland Home Advantage",
                "description": "Greenbelt Home Advantage Program Make the switch to homeownership with the Greenbelt Home Advantage program. In collaboration with the Maryland Department of Housing and Community Development and the City of Greenbelt, eligible first-time homebuyers in zip code 20770 can receive a $15,000 grant for down payment and closing cost assistance when purchasing a home in Greenbelt. Download Resources: Greenbelt Home Advantage Fact Sheet Greenbelt Home Advantage Flyer Getting Started If you're ready to benefit from this special program: Talk to a Lender: Confirm your eligibility and meet requirements with the help of a lender. Ensure attendance in the right Homebuyer Education Class. Check Your Eligibility: Verify your eligibility for a Maryland Mortgage Program loan. Note that eligibility doesn't guarantee approval, and factors like income, credit history, and employment will be considered. Complete a Homebuyer Education Class: Be prepared to make informed decisions by completing a Homebuyer Education class, available throughout Maryland.",
                "image": ["https://images.ctfassets.net/v3wxyl8kvdve/5AloKg35qBLmKqWR05E3Pg/d05f6ebf8f1847fd56fa8e5b72ec4999/GHA-header.jpg"],
                "datePublished": "2023-01-01T08:00:00+08:00",
                "dateModified": "2023-11-11T09:20:00+08:00",
                "author": [{
                  "@type": "Person",
                  "name": "Jubilee Investments LLC",
                  "url": "https://jubileespace.com/grants/greenbelt-home-advantage"
                }]
              }
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
              {
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": "Maryland Home Ability Program",
                "description": "HomeAbility Program HomeAbility helps Maryland homebuyers with disabilities. It offers loans for up to 95% of the home value and extra money for down payment and closing costs. The interest rate is low, and some of the money doesn't need to be paid back until you sell or refinance the home. Who Can Apply? Anyone with a disability or taking care of a disabled family member. You must show proof of disability and have an income less than 80% of the average. Learn more about HomeAbility | Get the Disability Certificate Important: Only certain lenders can offer HomeAbility. See the list of lenders.",
                "image": ["https://images.ctfassets.net/v3wxyl8kvdve/7gDzE7rCe80Lhr5vioP30e/e7649b3aa4d01ba54ed2e9f07826f78b/special-initiatives_sm.jpg"],
                "datePublished": "2023-11-01T08:00:00+08:00",
                "dateModified": "2023-11-11T09:20:00+08:00",
                "author": [{
                  "@type": "Person",
                  "name": "Jubilee Investments LLC",
                  "url": "https://jubileespace.com/grants/maryland-home-ability-program"
                }]
              }
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
              {
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": "Maryland SmartBuy Program",
                "description": "Maryland SmartBuy 3.0 Program Maryland SmartBuy 3.0 offers homebuyers the chance to purchase a Maryland home while addressing their student debt. Program Eligibility: To qualify, homebuyers need existing student debt (min. $1,000). The program provides up to 15% of the home purchase price (max. $20,000) to pay off student debt. Full debt for one borrower must be paid off during the home purchase, meeting Maryland Mortgage program requirements. Approved Lenders: Explore financing through approved SmartBuy lenders. They assist in confirming eligibility and meeting program requirements. SmartBuy 3.0 Fact Sheet",
                "image": ["https://images.ctfassets.net/v3wxyl8kvdve/3e4nrqrsn1ZinOk95n6dA9/2d72c227fd013b90d03babd869d83e41/Banner.png"],
                "datePublished": "2023-11-01T08:00:00+08:00",
                "dateModified": "2023-11-11T09:20:00+08:00",
                "author": [{
                  "@type": "Person",
                  "name": "Jubilee Investments LLC",
                  "url": "https://jubileespace.com/grants/maryland-smartbuy-program"
                }]
              }
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
              {
                "@context": "https://schema.org",
                "@type": "Blogposting",
                "headline": "Homes By Friendly Realtor",
                "description": "HomesByFriendlyRealtor - Find Your Dream Home Here FriendlyRealtor Real Estate Corporation Official Newsletter Are you looking for some tips on home buying? If so, you've come to the right place! We are a team of experts who help home buyers measure their success towards homeownership. We know how challenging and rewarding it can be to buy your own home, and we want to share our knowledge and experience with you. That's why we created this newsletter, where we will send you weekly tips, advice, and resources on topics such as: How to assess your financial readiness for homeownership? How to find the best mortgage option for your situation? How to negotiate with sellers and agents? How to prepare for the closing process? How to maintain and improve your home value? Your Path to Homeownership Assessing Your Financial Readiness for Homeownership Ready to buy a home? It starts with ensuring financial stability. Check for: A stable income A solid credit score A manageable debt-to-income ratio Savings for a down payment and closing costs Don't forget to consider ongoing expenses like property taxes, insurance, maintenance, repairs, and utilities. Seek expert guidance from financial planners or mortgage lenders for a comprehensive assessment.",
                "image": ["https://images.ctfassets.net/v3wxyl8kvdve/2knFMjLoad34BBwrDHLsPr/344ea6165326586215ce5e4b7d5f6cea/home__real_estate__home_design_logo.png"],
                "datePublished": "2023-11-01T08:00:00+08:00",
                "dateModified": "2023-11-11T09:20:00+08:00",
                "author": [{
                  "@type": "Person",
                  "name": "Friendly Realtor",
                  "url": "https://jubileespace.com/blogs/homes-by-friendly-realtor"
                }]
              }
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1673135175963452"
          crossOrigin="anonymous"
        />
        <script src="https://kestrel.idxhome.com/ihf-kestrel.js" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
        window.ihfKestrel = window.ihfKestrel || {};
        ihfKestrel.config = {
          platform: "custom",
          activationToken: "181d746c-b8b6-4783-962d-3482beb50109",
        };
      `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
