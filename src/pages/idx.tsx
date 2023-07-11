import React, { useEffect } from 'react';
import Head from 'next/head';
import { Container } from '../components/UI';

const InternalPage = () => {
  useEffect(() => {
    /*setTimeout(() => {
			const doc = document.querySelector('[data-client-id="177088"]');
		
			if (doc) {
				const shadowRoot = doc.shadowRoot;

				if (shadowRoot) {
					const found = shadowRoot.querySelector('div')
					const found1 = found?.querySelector('div');
					const found2 = found1?.querySelector('div');
					const found3 = found2?.querySelector('div');
					const found4 = found3?.querySelector('div');

					console.log(found2)
					if (found4) {
						//found4.remove()
					}
				}
			} else {
				console.log("Element not found.");
			}
		}, 2000);*/
  }, []);

  return (
    <Container>
      <div id="content-container" />
    </Container>
  );
};

export default InternalPage;
