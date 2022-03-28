/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from 'react';
import { Table } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import useSortableData from '../../utils/useSortableData';
import PageSizeToggle from './PageSizeToggle';
import TableFoot from './TableFoot';
import TableHeader from './TableHeader';

export default function TableComponent({ data, config }) {
  // const [currentUserSettings, setCurrentUserSettings] = useState(userSettings);
  // const [userSortSettings, setUserSortSettings] = useState(null);
  const { sortedData, sortConfig, handleSorting } = useSortableData(
    data,
    config
  );
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const dataResults = useMemo(() => {
    const computedDataResults = { ...sortedData };
    setTotalItems(computedDataResults.results.length);

    // Wycina aktualną stronę
    return computedDataResults.results.slice(
      (currentPage - 1) * pageSize,
      (currentPage - 1) * pageSize + pageSize
    );
  }, [sortedData, currentPage, pageSize]);

  // Zapisywanie ustawień użytkownika (do zrobienia)

  // const setUserSettings = (key, dir) => {
  //   const newSettings = { ...currentUserSettings };
  //   newSettings.organizations
  //     .find((organization) => organization.organizationId === organizationId)
  //     .tables.find(
  //       (table) => table.tableId === contentId
  //     ).sort.columnName = key;
  //   newSettings.organizations
  //     .find((organization) => organization.organizationId === organizationId)
  //     .tables.find((table) => table.tableId === contentId).sort.direction = dir;
  //   return newSettings;
  // };

  // Definicje stylów in-line
  const tableStyle = {
    display: 'table',
  };
  const tableCellStyle = {
    display: 'table-cell',
  };
  const rowTopMargin = {
    marginTop: '10px',
  };

  const getClassNamesForHeader = (name) => {
    let headerClass = '';
    const header = config.columns.find((column) => column.name === name);
    const headerIndex = config.columns.indexOf(header);
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
    const header = config.columns.find((column) => column.name === name);
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
    <>
      <div className="row wrapper border-bottom white-bg page-heading">
        <div className="col-lg-7">
          <h2>
            Ewidencja Nośników <span className="object_data" />
          </h2>
          <div className="hidden-lg">
            <ul className="breadcrumb">
              <li>
                <a href="/dashboard">Start</a>
              </li>
              <li className="active">Ewidencja Nośników</li>
            </ul>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="title-action">
            <a href="/aktywa/nosnik/nowy" className="btn btn-primary">
              <i className="fa fa-plus" /> Dodaj Nośnik
            </a>
          </div>
        </div>
        <div className="col-lg-12 visible-lg">
          <ul className="breadcrumb">
            <li>
              <a href="/dashboard">Start</a>
            </li>
            <li className="active">Ewidencja Nośników</li>
          </ul>
        </div>
      </div>

      <div className="wrapper wrapper-content">
        <div className="ibox">
          <div className="ibox-content">
            <form className="form-inline">
              <div className="row">
                <div className="col-sm-6 bottom1em" id="filter-status-div">
                  <div className="btn-group" role="group">
                    <div>
                      <button
                        type="button"
                        className="btn btn-default select-status"
                        data-status="a"
                      >
                        Wszystkie
                      </button>
                      <button
                        type="button"
                        className="btn btn-default select-status active"
                        data-status={1}
                      >
                        Aktywne
                      </button>
                      <button
                        type="button"
                        className="btn btn-default select-status"
                        data-status={2}
                      >
                        Robocze
                      </button>
                      <button
                        type="button"
                        className="btn btn-default select-status"
                        data-status={3}
                      >
                        Archiwalne
                      </button>
                    </div>
                  </div>
                  <div className="col-sm-6" id="footable-search-div">
                    <div className="form-group footable-filtering-search full-width">
                      <label htmlFor="search" className="sr-only">
                        Search
                      </label>
                      <div className="input-group full-width">
                        <input
                          name="search"
                          type="text"
                          className="form-control"
                          placeholder="Szukaj"
                        />
                        <div className="input-group-btn">
                          <button type="button" className="btn btn-primary">
                            <span className="fooicon fooicon-search" />
                          </button>
                          <button
                            type="button"
                            className="btn btn-default dropdown-toggle"
                          >
                            <span className="caret" />
                          </button>
                          <ul className="dropdown-menu dropdown-menu-right">
                            <li>
                              <a className="checkbox">
                                <label>
                                  <input type="checkbox" checked="checked" />
                                  Nazwa
                                </label>
                              </a>
                            </li>
                            <li>
                              <a className="checkbox">
                                <label>
                                  <input type="checkbox" checked="checked" />
                                  Rodzaj
                                </label>
                              </a>
                            </li>
                            <li>
                              <a className="checkbox">
                                <label>
                                  <input type="checkbox" checked="checked" />
                                  Osoba Odpowiedzialna
                                </label>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <div className="clear" />
            <div className="row" style={rowTopMargin}>
              <div className="col-md-12">
                <div className="pull-right">
                  <PageSizeToggle
                    pageSize={pageSize}
                    onPageSizeChange={(size) => setPageSize(size)}
                  />
                </div>
              </div>
            </div>
            <Table
              hover
              responsive="lg"
              style={tableStyle}
              id="main-table"
              data-state="true"
              className="footable footable-1 footable-filtering footable-filtering-right footable-paging footable-paging-center"
            >
              <thead>
                <tr className="footable-filtering">
                  <th colSpan="5">
                    <form className="form-inline" />
                  </th>
                </tr>
                <tr className="footable-header">
                  {config.columns.map((column) =>
                    'sort_by' in column && column.sort_by ? (
                      <TableHeader
                        onClick={() => handleSorting(column.sort_by)}
                        key={uuidv4()}
                        className={getClassNamesForHeader(column.name)}
                        style={tableCellStyle}
                        title={column.title}
                      >
                        <span className={getClassNamesForIcons(column.name)} />
                      </TableHeader>
                    ) : (
                      <TableHeader
                        key={uuidv4()}
                        className={getClassNamesForHeader(column.name)}
                        style={tableCellStyle}
                        title={column.title}
                      >
                        <span className={getClassNamesForIcons(column.name)} />
                      </TableHeader>
                    )
                  )}
                  <th className="text-right footable-last-visible" />
                </tr>
              </thead>
              <TableFoot
                total={totalItems}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
              <tbody>
                {dataResults &&
                  dataResults.map((device) => (
                    <tr key={device.id}>
                      <td
                        style={tableCellStyle}
                        className="footable-first-visible"
                      >
                        <b>
                          <a href="/">{device.nazwa || ''}</a>
                        </b>
                      </td>
                      <td style={tableCellStyle}>
                        <span className="badge badge-primary">
                          {device.status_display || ''}
                        </span>
                      </td>
                      <td style={tableCellStyle}>
                        {(device.rodzaj_nosnika &&
                          device.rodzaj_nosnika.nazwa) ||
                          ''}
                      </td>
                      <td style={tableCellStyle}>
                        {`
                        ${
                          (device.odpowiedzialny &&
                            device.odpowiedzialny.imie) ||
                          ''
                        } ${
                          (device.odpowiedzialny &&
                            device.odpowiedzialny.nazwisko) ||
                          ''
                        }
                      `}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
