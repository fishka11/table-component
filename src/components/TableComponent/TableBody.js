/* eslint-disable no-unused-expressions */
import React from 'react';
import { DropdownButton, ButtonGroup, Dropdown, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LinkedBoldText from './LinkedBoldText';
import StatusText from './StatusText';
import Text from './Text';
import LinkedText from './LinkedText';

export default function TableBody({
  sortedData,
  tableCellStyle,
  handleChecked,
  checkList,
}) {
  return (
    <tbody>
      {sortedData &&
        sortedData.results &&
        sortedData.results.map((result, index) => (
          <tr key={result.id}>
            <td style={tableCellStyle} className="footable-first-visible">
              <Form.Check
                onChange={handleChecked}
                type="checkbox"
                name={result.id}
                aria-label={`option ${index}`}
                checked={checkList.find(
                  (item) => item.id === result.id.toString() && item.isChecked
                )}
              />
            </td>
            <td style={tableCellStyle}>
              <LinkedBoldText
                url={`https://app.abionline.pl/aktywa/nosnik/${result.id}/`}
                name={result.nazwa}
              />
            </td>
            <td style={tableCellStyle}>
              <StatusText name={result.status_display} />
            </td>
            <td style={tableCellStyle}>
              <Text
                name={result.rodzaj_nosnika && result.rodzaj_nosnika.nazwa}
              />
            </td>
            <td style={tableCellStyle}>
              <LinkedText
                url={
                  result.odpowiedzialny &&
                  `https://app.abionline.pl${result.odpowiedzialny.url}`
                }
                name={
                  result.odpowiedzialny && result.odpowiedzialny.imie_nazwisko
                }
              />
            </td>
            <td style={tableCellStyle}>
              <DropdownButton as={ButtonGroup} title="" size="sm">
                <Dropdown.Item
                  eventKey="1"
                  href={`https://app.abionline.pl/aktywa/nosnik/${result.id}/`}
                >
                  <FontAwesomeIcon icon="eye" />
                  &nbsp;Szczegóły
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="2"
                  href={`https://app.abionline.pl/aktywa/nosnik/${result.id}/edycja`}
                >
                  <FontAwesomeIcon icon="edit" />
                  &nbsp;Edycja
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="3"
                  href=""
                  data-toggle="modal"
                  data-target="#modalUsun"
                  data-object-id={result.id}
                >
                  <FontAwesomeIcon icon="trash" />
                  &nbsp;Usuń
                </Dropdown.Item>
              </DropdownButton>
            </td>
          </tr>
        ))}
      {sortedData && sortedData.count === 0 && (
        <tr className="footable-empty">
          <td colSpan="5">Nie znaleziono żadnych rekordów</td>
        </tr>
      )}
    </tbody>
  );
}
