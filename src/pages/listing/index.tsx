import React, { useEffect } from 'react';
import { Container } from '../../components/UI';

const ListingPage = () => {
  useEffect(() => {
    const removeElement = () => {
      const element = document.querySelector('[data-react-helmet="true"]');
      if (element) {
        element.remove();
      } else {
        setTimeout(removeElement, 100); // Retry after 100 milliseconds
      }
    };

    removeElement();
  }, []);

  return (
    <Container
      seoProps={{
        title: 'FriendlyRealtor - Listing(s)',
      }}
    >
      <div id="content-container" />
    </Container>
  );
};

export default ListingPage;
