import React from 'react';
import Link from 'next/link';
import { Button } from '..';
import { AddLinkProps } from './AddLinkTypes';

function isExternal(path: string) {
  return /^http/.test(path);
}

export default function AddLink({ ...props }: AddLinkProps) {
  const { to, onClick, children, target } = props;
  if (!to || !to.length) {
    if (onClick) {
      return (
        <Button type="button" color="transparent" {...props}>
          {children}
        </Button>
      );
    }
    return <div {...props}>{children}</div>;
  }

  if (isExternal(to)) {
    return (
      <a href={to} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={to} {...props}>
      {children}
    </Link>
  );
}
