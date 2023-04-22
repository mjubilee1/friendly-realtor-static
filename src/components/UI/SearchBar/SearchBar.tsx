import React from 'react';
import { Icon } from '..';

export default function SearchBar() {
  return (
    <div className="flex min-w-[20em] px-4 py-2 bg-endeavors-gray-800 rounded-lg border-2 border-bg-gray-100">
      <input type="text" placeholder="Type to search..." className="grow border-none bg-endeavors-gray-800 text-endeavors-gray-100 rounded-lg" />
      <Icon name="search" size="large" color="gray" />
    </div>
  );
}
