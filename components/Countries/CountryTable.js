import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import moment from 'moment';

import Toggle from 'components/Custom/Toggle';
import Icon from 'components/Icon';
import styles from './country-table.module.sass';

const CountryTable = ({ countries, onShow }) => {
  return (
    <Table hover responsive="lg" className={styles.root}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Slug</th>
          <th>Created</th>
          <th>Updated</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {countries.map((country) => (
          <tr key={country.id}>
            <td>{country.name}</td>
            <td>{country.slug}</td>
            <td>{moment(country.createdAt).fromNow()}</td>
            <td>{moment(country.updatedAt).fromNow()}</td>
            <td className="text-center">
              <Dropdown alignRight>
                <Dropdown.Toggle as={Toggle} id={country.id}>
                  <Icon name="ellipsis-h" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={onShow(country)}>Edit</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CountryTable;
