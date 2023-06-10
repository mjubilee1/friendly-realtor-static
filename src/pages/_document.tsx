import { Html, Head, Main, NextScript } from 'next/document';
import { FB_PIXEL_ID } from '../utils/analyticsUtil';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
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
