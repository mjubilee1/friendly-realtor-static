import React, { useEffect } from 'react';

const IdxPage = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.innerHTML = `
      document.currentScript.replaceWith(ihfKestrel.render());
    `;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div>IDX Page</div>;
};

export default IdxPage;