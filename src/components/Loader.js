import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

export default function Loader() {
  return (
    <Spinner animation="border" variant="success">
      <span className="sr-only">Ładuję dane...</span>
    </Spinner>
  );
}
