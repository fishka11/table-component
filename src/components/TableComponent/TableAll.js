import React from 'react';
import { Table } from 'react-bootstrap';
import TableFoot from './TableFoot';
import TableHead from './TableHead';
import TableBody from './TableBody';
import Loader from '../Loader';

export default function TableAll({
  tableStyle,
  tableCellStyle,
  handleSorting,
  sortConfig,
  sortedData,
  handlePagination,
  handleChecked,
  checkList,
  allChecked,
  isLoading,
}) {
  return (
    <Table
      hover
      responsive="lg"
      style={tableStyle}
      id="main-table"
      data-state="true"
      className="footable footable-1 footable-filtering footable-filtering-right footable-paging footable-paging-center"
    >
      <TableHead
        style={tableCellStyle}
        handleSorting={handleSorting}
        sortConfig={sortConfig}
        sortedData={sortedData}
        handleChecked={handleChecked}
        allChecked={allChecked}
      />
      <TableFoot
        totalItems={sortedData.count}
        pagination={sortConfig.pagination}
        handlePagination={handlePagination}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <TableBody
          sortedData={sortedData}
          tableCellStyle={tableCellStyle}
          handleChecked={handleChecked}
          checkList={checkList}
        />
      )}
    </Table>
  );
}
