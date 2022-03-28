import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

export default function ButtonGroupWidget({ config, handleButtonGroupFilter }) {
  const handleClick = (value) => {
    handleButtonGroupFilter(value);
  };
  return (
    <ButtonGroup>
      {config.options.map((option) => (
        <Button
          key={uuidv4()}
          variant="light"
          active={option.selected === true}
          onClick={() => handleClick(option.value)}
        >
          {option.name}
        </Button>
      ))}
    </ButtonGroup>
  );
}
