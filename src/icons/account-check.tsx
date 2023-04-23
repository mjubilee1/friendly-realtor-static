import React from 'react';

export default function AccountCheck({ formattedClassName }: { formattedClassName: string }) {
  return (
    <svg
      className={`${formattedClassName}`}
      viewBox="0 0 110 110"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M55 0C24.6243 0 0 24.6243 0 55C0 85.3757 24.6243 110 55 110C85.3757 110 110 85.3757 110 55C110 24.6243 85.3757 0 55 0ZM55 10.6452C79.5131 10.6452 99.3548 30.4831 99.3548 55C99.3548 79.5131 79.5169 99.3548 55 99.3548C30.4869 99.3548 10.6452 79.5169 10.6452 55C10.6452 30.4869 30.4831 10.6452 55 10.6452Z"
        fill="#2AA2C6"
      />
    </svg>
  );
}
