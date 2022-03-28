/* eslint-disable no-unused-vars */

/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Form } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import TableHeadLabel from './TableHeadLabel';

export default function TableHead({
  sortConfig,
  handleSorting,
  handleChecked,
  allChecked,
  style,
}) {
  const getClassNamesForHeader = (name) => {
    let headerClass = '';
    const header = sortConfig.columns.find((column) => column.name === name);
    const headerIndex = sortConfig.columns.indexOf(header);
    if (!sortConfig) {
      return;
    }
    if (headerIndex === 0) {
      headerClass += 'footable-first-visible';
    }
    if ('sort_by' in header && header.sort_by) {
      headerClass += ' footable-sortable';
    }
    if ('sorted' in header && header.sorted && header.direction === 'ASC') {
      headerClass += ' footable-asc';
    }
    if ('sorted' in header && header.sorted && header.direction === 'DESC') {
      headerClass += ' footable-desc';
    }
    // eslint-disable-next-line consistent-return
    return headerClass;
  };

  const getClassNamesForIcons = (name) => {
    let iconClass = '';
    const header = sortConfig.columns.find((column) => column.name === name);
    if (!sortConfig) {
      return;
    }
    if ('sort_by' in header && header.sort_by) {
      iconClass = 'fooicon fooicon-sort';
    }
    if ('sorted' in header && header.sorted && header.direction === 'ASC') {
      iconClass = 'fooicon fooicon-sort-asc';
    }
    if ('sorted' in header && header.sorted && header.direction === 'DESC') {
      iconClass = 'fooicon fooicon-sort-desc';
    }
    // eslint-disable-next-line consistent-return
    return iconClass;
  };

  return (
    <thead>
      <tr className="footable-filtering">
        <th colSpan="6">
          <form className="form-inline" />
        </th>
      </tr>
      <tr className="footable-header">
        <th>
          <Form.Check
            onChange={handleChecked}
            type="checkbox"
            name="allChecked"
            aria-label="option checkAll"
            checked={allChecked}
          />
        </th>
        {sortConfig.columns.map((column) =>
          'sort_by' in column && column.sort_by ? (
            <TableHeadLabel
              onClick={() => handleSorting(column.sort_by)}
              key={uuidv4()}
              className={getClassNamesForHeader(column.name)}
              style={style}
              title={column.title}
            >
              <span className={getClassNamesForIcons(column.name)} />
            </TableHeadLabel>
          ) : (
            <TableHeadLabel
              key={uuidv4()}
              className={getClassNamesForHeader(column.name)}
              style={style}
              title={column.title}
            >
              <span className={getClassNamesForIcons(column.name)} />
            </TableHeadLabel>
          )
        )}
        <th className="text-right footable-last-visible" />
      </tr>
    </thead>
  );
}
