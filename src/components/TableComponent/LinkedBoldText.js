import React from 'react';

export default function LinkedBoldText({ name = '', url = '/' }) {
  return (
    <b>
      <a href={url} title="">
        {name}
      </a>
    </b>
  );
}
