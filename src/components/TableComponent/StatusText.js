import React from 'react';

export default function StatusText({ name = '' }) {
  return <span className="badge badge-primary">{name}</span>;
}
