import React from 'react';

function Sleepless({ formattedClassName }: { formattedClassName: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className={`${formattedClassName}`}
      viewBox="0 0 24 24"
    >
      <g transform="translate(0.000000,32.000000) scale(0.100000,-0.100000)">
        <path
          d="M122 308 c-45 -12 -72 -59 -72 -124 0 -73 16 -84 119 -84 80 0 82 -1
79 -23 -3 -19 -10 -22 -55 -25 -38 -2 -53 -7 -53 -18 0 -20 79 -19 108 2 18
12 22 24 20 52 l-3 37 -95 5 -95 5 -3 34 c-8 77 25 121 88 121 46 0 76 -24 86
-67 11 -51 18 -59 22 -26 9 79 -64 135 -146 111z"
        />
        <path
          d="M26 257 c-21 -15 -25 -62 -7 -80 8 -8 11 -4 11 15 0 15 4 38 10 52
11 30 10 31 -14 13z"
        />
        <path
          d="M275 260 c3 -5 10 -29 14 -52 l8 -43 11 28 c13 31 3 60 -23 71 -9 3
-13 2 -10 -4z"
        />
        <path
          d="M120 206 c0 -14 5 -26 10 -26 6 0 10 9 10 19 0 11 -4 23 -10 26 -6 4
-10 -5 -10 -19z"
        />
        <path
          d="M190 206 c0 -14 5 -26 10 -26 6 0 10 9 10 19 0 11 -4 23 -10 26 -6 4
-10 -5 -10 -19z"
        />
        <path
          d="M44 56 c-13 -33 0 -51 36 -51 32 0 35 2 35 30 0 27 -4 30 -33 33 -22
2 -34 -2 -38 -12z"
        />
      </g>
    </svg>
  );
}

export default Sleepless;
