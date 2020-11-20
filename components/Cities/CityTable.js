import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import moment from 'moment';

import Toggle from 'components/Custom/Toggle';
import Icon from 'components/Icon';
import styles from './city-table.module.sass';

const CityTable = ({ cities, onShow }) => {
  return (
    <Table hover responsive="lg" className={styles.root}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Slug</th>
          <th>Country</th>
          <th>Created</th>
          <th>Updated</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {cities.map((city) => (
          <tr key={city.id}>
            <td>{city.name}</td>
            <td>{city.slug}</td>
            <td>{city.country.name}</td>
            <td>{moment(city.createdAt).fromNow()}</td>
            <td>{moment(city.updatedAt).fromNow()}</td>
            <td className="text-center">
              <Dropdown alignRight>
                <Dropdown.Toggle as={Toggle} id={city.id}>
                  <Icon name="ellipsis-h" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={onShow(city)}>Edit</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CityTable;
