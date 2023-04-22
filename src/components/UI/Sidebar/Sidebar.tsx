import React, { useState } from 'react';
import { Button } from '..';
import { SidebarProps } from './SidebarTypes';

export default function Sidebar({ children }: SidebarProps) {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <aside aria-hidden={!showSidebar} className={`${showSidebar ? 'w-60' : 'w-12'} shrink-0 p-4 bg-endeavors-blue-600 transition-all ease-in-out duration-300`}>
      <Button
        type="button"
        color="transparent"
        className="flex justify-end"
        iconOnly
        icon={{
          name: 'arrow-right',
          color: 'white',
          size: 'large',
          className: `${showSidebar ? 'translate-x-44' : 'translate-x-0'} duration-300`
        }}
        onClick={() => setShowSidebar(!showSidebar)}
      />
      {showSidebar ? <div className="overflow-y-scroll relative top-0 w-full">{children}</div> : null}
    </aside>
  );
}
