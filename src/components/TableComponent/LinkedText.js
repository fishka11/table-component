import React from 'react';

export default function LinkedText({ name = '', url = '/' }) {
  return (
    <a href={url} title="">
      {name}
    </a>
  );
}
