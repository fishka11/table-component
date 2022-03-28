/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Menu from './Menu';
import TableContainer from './Table/TableContainer';
import Footer from './Footer';
import Error from './Error';
import { DATA_URL, CONFIG_URL } from '../data/constans';
import useFetch from '../utils/useFetch';
import Loader from './Loader';

export default function App() {
  const [data, config, isLoading, error] = useFetch(DATA_URL, CONFIG_URL);

  return (
    <>
      <Menu />
      <div id="page-wrapper" className="gray-bg">
        <Header />
        {error ? (
          <Error error={error} />
        ) : isLoading ? (
          <Loader />
        ) : (
          data && config && <TableContainer data={data} config={config} />
        )}
        <Footer />
      </div>
    </>
  );
}
