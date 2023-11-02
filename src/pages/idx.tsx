import React, { useEffect } from 'react';

import { Container } from '../components/UI';
import Head from 'next/head';

const InternalPage = () => {
  useEffect(() => {
    setTimeout(() => {
      const doc = document.querySelector('[data-client-id="177088"]');

      if (doc) {
        const shadowRoot = doc.shadowRoot;
        if (shadowRoot) {
          const paragraphs = shadowRoot.querySelectorAll('p');

          paragraphs.forEach((paragraph) => {
            // Check if the text content of the paragraph matches the desired text
            if (paragraph.textContent === 'Get new listing alerts delivered to your inbox.') {
              // Remove the paragraph element
              paragraph.remove();
            }
          });

          // Find all button elements on the page
          const buttons = shadowRoot.querySelectorAll('button');
          buttons.forEach((button) => {
            if (button.getAttribute('aria-label') === 'sign up') {
              button.remove();
            }
            const buttonText = button.querySelector('.ui-button-label')?.textContent;
            if (buttonText === 'Save Search') {
              button.remove();
            }
          });
        }
      } else {
        console.log('Element not found.');
      }
    }, 2000);
  }, []);

  return (
    <Container
      seoProps={{
        title: 'FriendlyRealtor - Idx',
      }}
    >
      <div id="content-container" />
    </Container>
  );
};

export default InternalPage;
