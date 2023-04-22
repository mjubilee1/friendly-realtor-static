import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';

// Memoize the function (similar to pure components), so it never re-renders
// when props change since it is prop-less 404 page. Re-render will only
// happen when "history" changes

export const NotFound404 = memo(() => {
  const history = useNavigate();

  return (
    <div className="text-white text-5xl text-center py-40 h-screen">
      <h1>404: Page not found</h1>
      <p>Oops! Looks like the page you&apos;re looking for doesn&apos;t exist.</p>
      <button type="button" onClick={() => history(-1)} className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Go Back
      </button>
    </div>
  );
});

export default NotFound404;
