/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import useFetchData from '../../utils/useFetchData';
import PageSizeToggle from './PageSizeToggle';
import TableAll from './TableAll';
import Error from '../Error';
import SearchForm from './SearchForm';

export default function TableComponent({ dataUrl, configUrl }) {
  const {
    sortedData,
    sortConfig,
    handleSorting,
    handlePagination,
    handleSearch,
    handleButtonGroupFilter,
    isLoading,
    error,
  } = useFetchData(dataUrl, configUrl);

  const [checkList, setCheckList] = useState([]);
  const [allChecked, setAllChecked] = useState(false);

  useEffect(() => {
    const list = [];
    if (sortedData && sortedData.results) {
      sortedData.results.forEach((item) => {
        const obj = {};
        obj.id = item.id.toString();
        obj.isChecked = false;
        list.push(obj);
      });
      setCheckList([...list]);
      setAllChecked(false);
    }
  }, [sortedData, sortConfig]);

  const handleChecked = (e) => {
    const { checked } = e.target;
    const { name } = e.target;
    let newCheckList = [...checkList];
    let newAllChecked = allChecked;
    if (name === 'allChecked') {
      newAllChecked = checked;
      newCheckList = newCheckList.map((item) => ({
        ...item,
        isChecked: checked,
      }));
    } else {
      newCheckList = newCheckList.map((item) =>
        item.id.toString() === name.toString()
          ? { ...item, isChecked: checked }
          : item
      );
      newAllChecked = newCheckList.every((item) => item.isChecked);
    }
    setCheckList([...newCheckList]);
    setAllChecked(newAllChecked);
  };

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

  if (error) {
    return <Error error={error} />;
  }

  return (
    <>
      {/* <div className="row wrapper border-bottom white-bg page-heading">
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
      </div> */}

      {sortedData && sortConfig && (
        <div className="wrapper wrapper-content">
          <div className="ibox">
            <div className="ibox-content">
              <SearchForm
                sortConfig={sortConfig}
                handleSearch={handleSearch}
                handleButtonGroupFilter={handleButtonGroupFilter}
              />
              <div className="clear" />
              <PageSizeToggle
                totalItems={sortedData.count}
                pagination={sortConfig.pagination}
                handlePagination={handlePagination}
                sizes={[10, 20, 50, 100]}
                style={rowTopMargin}
              />
              <TableAll
                handleSorting={handleSorting}
                sortConfig={sortConfig}
                tableStyle={tableStyle}
                tableCellStyle={tableCellStyle}
                sortedData={sortedData}
                handlePagination={handlePagination}
                handleChecked={handleChecked}
                checkList={checkList}
                allChecked={allChecked}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
