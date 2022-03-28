/* eslint-disable no-plusplus */
import React, { useMemo, useEffect, useState, useCallback } from 'react';
import Pagination from 'react-bootstrap/Pagination';

export default function PageToggle({
  totalItems,
  handlePagination,
  pagination,
}) {
  const [totalPages, setTotalPages] = useState(0);

  const pagesCount = Math.ceil(totalItems / pagination.page_size);

  useEffect(() => {
    setTotalPages(pagesCount);
  }, [pagesCount]);

  const handleCurrentPage = useCallback(
    (num) => {
      const newPagination = { ...pagination };
      newPagination.page = num;
      handlePagination(newPagination);
    },
    [handlePagination, pagination]
  );

  const paginationItems = useMemo(() => {
    const pages = [];

    for (let index = 1; index <= totalPages; index++) {
      pages.push(
        <Pagination.Item
          key={index}
          active={pagination.page === index}
          onClick={() => handleCurrentPage(index)}
        >
          {index}
        </Pagination.Item>
      );
    }
    return pages;
  }, [totalPages, pagination, handleCurrentPage]);

  if (totalPages === 0) {
    return null;
  }
  return (
    <>
      {totalItems > pagination.page_size ? (
        <Pagination>
          <Pagination.First
            onClick={() => handleCurrentPage(1)}
            disabled={pagination.page === 1}
          />
          <Pagination.Prev
            onClick={() => handleCurrentPage(pagination.page - 1)}
            disabled={pagination.page === 1}
          />
          {paginationItems}
          <Pagination.Next
            onClick={() => handleCurrentPage(pagination.page + 1)}
            disabled={pagination.page === totalPages}
          />
          <Pagination.Last
            onClick={() => handleCurrentPage(totalPages)}
            disabled={pagination.page === totalPages}
          />
        </Pagination>
      ) : null}
      <div className="divider" />
      <span className="label label-default">
        Strona {pagination.page} z {totalPages}. Liczba rekordów: {totalItems}.
      </span>
    </>
  );
}
