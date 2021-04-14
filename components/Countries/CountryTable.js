import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import moment from 'moment';

import Toggle from 'components/Custom/Toggle';
import Icon from 'components/Icon';
import useAuth from 'hooks/useAuth';
import { canVerify } from 'utils/roles';
import styles from './country-table.module.sass';

const CountryTable = ({ countries, onShow }) => {
  const { role } = useAuth();

  return (
    <Table hover responsive="lg" className={styles.root}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Slug</th>
          <th>Created</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {countries.map((country) => (
          <tr key={country.id}>
            <td>{country.name}</td>
            <td>{country.slug}</td>
            <td>{moment(country.createdAt).format('MMM D, YYYY')}</td>
            <td className="text-center">
              {canVerify(role) && (
                <Dropdown alignRight>
                  <Dropdown.Toggle as={Toggle} id={country.id}>
                    <Icon name="ellipsis-h" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={onShow(country)}>
                      Edit
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CountryTable;
