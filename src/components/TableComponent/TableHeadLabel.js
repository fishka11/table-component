import React from 'react';

export default function TableHeadLabel({
  onClick,
  className,
  style,
  title,
  children,
}) {
  return (
    <th onClick={onClick} className={className} style={style}>
      {title}
      {children}
    </th>
  );
}
