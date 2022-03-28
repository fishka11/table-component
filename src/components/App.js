import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Header from './Header';
import Menu from './Menu';
import TableComponent from './TableComponent/TableComponent';
import Footer from './Footer';

library.add(faEye, faEdit, faTrash);

export default function App(props) {
  return (
    <>
      <Menu />
      <div id="page-wrapper" className="gray-bg">
        <Header />
        <TableComponent dataSet={props} />
        <Footer />
      </div>
    </>
  );
}
