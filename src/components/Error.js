import React from 'react';

export default function Error({ error }) {
  return (
    <div className="alert alert-danger" role="alert">
      Coś poszło nie tak.
      <br />
      {`${error}`}
    </div>
  );
}
