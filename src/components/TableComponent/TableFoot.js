/* eslint-disable no-plusplus */
import React from 'react';
import PageToggle from './PageToogle';

export default function TableFoot({
  totalItems,
  handlePagination,
  pagination,
}) {
  return (
    <tfoot>
      <tr className="footable-paging">
        <td colSpan="6">
          <div className="footable-pagination-wrapper">
            <PageToggle
              totalItems={totalItems}
              handlePagination={handlePagination}
              pagination={pagination}
            />
          </div>
        </td>
      </tr>
    </tfoot>
  );
}
