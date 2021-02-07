import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import moment from 'moment';

import Toggle from 'components/Custom/Toggle';
import Icon from 'components/Icon';
import useAuth from 'hooks/useAuth';
import { getUserRole, isAdmin } from 'utils/roles';
import styles from './user-table.module.sass';

const formatDate = (date) => {
  const d = moment(date);
  const now = moment();

  if (now.diff(d, 'days') < 7) {
    return d.fromNow();
  }
  return d.format('MMM D, YYYY h:mm A');
};

const UserTable = ({ users, setDisabled, deleteUser, onShow }) => {
  const auth = useAuth();

  return (
    <Table hover responsive="lg" className={styles.root}>
      <thead>
        <tr>
          <th>Email</th>
          <th>Role</th>
          <th>Last login</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.uid}>
            <td>
              <span>{user.email}</span>
              {user.uid === auth.user.uid && (
                <span className={styles.self}>You</span>
              )}
            </td>
            <td>
              {getUserRole(user.customClaims?.role)?.label || 'Not available'}
            </td>
            <td>
              {user.metadata.lastSignInTime ? (
                <span>{formatDate(user.metadata.lastSignInTime)}</span>
              ) : (
                <span className="text-muted">Not available</span>
              )}
            </td>
            <td className="text-center">
              {isAdmin(auth.role) && user.uid !== auth.user?.uid ? (
                <Dropdown alignRight>
                  <Dropdown.Toggle as={Toggle} id={user.uid}>
                    <Icon name="ellipsis-h" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={onShow(user)}>View</Dropdown.Item>
                    <Dropdown.Item
                      disabled={user.disabled}
                      onClick={() => setDisabled(user.uid)}>
                      Disable
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => deleteUser(user.uid)}>
                      Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <>&nbsp;</>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UserTable;
