import React, { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

export default function PageSizeToggle({
  sizes,
  style,
  handlePagination,
  pagination,
  totalItems,
}) {
  const pageSizes = useMemo(() => {
    const buttons = sizes.map((size) => {
      const newPagination = { ...pagination };
      newPagination.page_size = size;
      return (
        <Button
          key={uuidv4()}
          onClick={() => handlePagination(newPagination)}
          active={pagination.page_size === size}
          variant="light"
          disabled={totalItems === 0}
        >
          {size}
        </Button>
      );
    });
    return buttons;
  }, [sizes, pagination, totalItems, handlePagination]);

  return (
    <div className="row" style={style}>
      <div className="col-md-12">
        <div className="pull-right">
          <ButtonGroup
            className="mr-2"
            aria-label="Grupa przycisków zmieniających ilość wierszy tabeli wyświtlanych na jednej stronie"
          >
            {pageSizes}
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
}
