/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Col,
  Form,
  Row,
  InputGroup,
  Button,
  DropdownButton,
  Dropdown,
} from 'react-bootstrap';
import ButtonGroupWidget from './ButtonGroupWidget';
import { ButtonGroupWidgetName } from '../../data/data';

export default function SearchForm({
  sortConfig,
  handleSearch,
  handleButtonGroupFilter,
}) {
  const [searchValue, setSearchValue] = useState('');

  const buttonWidgetConfig = sortConfig.filters.find(
    (filter) => filter.widget === ButtonGroupWidgetName
  );

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(searchValue);
  };
  const handleReset = (event) => {
    event.preventDefault();
    setSearchValue('');
    handleSearch('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col sm={6} id="filter-status-div" className="bottom1em">
          <ButtonGroupWidget
            config={buttonWidgetConfig}
            handleButtonGroupFilter={handleButtonGroupFilter}
          />
        </Col>
        <Col sm={6} id="footable-search-div">
          <Form.Group className="footable-filtering-search full-width">
            <Form.Label className="sr-only">Search</Form.Label>
            <InputGroup className="full-width">
              <Form.Control
                type="text"
                name="search"
                placeholder="Szukaj"
                onChange={handleChange}
                value={searchValue}
              />
              <InputGroup.Append>
                {searchValue.length > 0 ? (
                  <Button onClick={handleReset}>
                    <span className="fooicon fooicon-remove" />
                  </Button>
                ) : (
                  <Button>
                    <span className="fooicon fooicon-search" />
                  </Button>
                )}
                {/* <DropdownButton variant="light" title="" size="lg">
                  <Dropdown.Item>
                    <Form.Check type="checkbox" label="Nazwa" checked />
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Form.Check type="checkbox" label="Rodzaj" checked />
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Form.Check
                      type="checkbox"
                      label="Osoba odpowiedzialna"
                      checked
                    />
                  </Dropdown.Item>
                </DropdownButton> */}
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
}
