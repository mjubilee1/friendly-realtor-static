import React from 'react';
import { Link } from 'react-router-dom';
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
    const newWindowSrText = target && target === '_blank' ? <span className="sr-only">This link opens a new window</span> : null;
    return (
      <a href={to} {...props}>
        {children} {newWindowSrText}
      </a>
    );
  }

  return (
    <Link to={to} {...props}>
      {children}
    </Link>
  );
}
