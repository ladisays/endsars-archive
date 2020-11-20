import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import moment from 'moment';

import Toggle from 'components/Custom/Toggle';
import Icon from 'components/Icon';
import styles from './user-table.module.sass';

const UserTable = ({ users, setDisabled, deleteUser, onShow }) => {
  return (
    <Table hover responsive="lg" className={styles.root}>
      <thead>
        <tr>
          <th>Email</th>
          <th className="text-center">Verifier</th>
          <th className="text-center">Admin</th>
          <th>Last signed in</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {users.map(
          (user) =>
            user.email && (
              <tr key={user.uid}>
                <td>{user.email}</td>
                <td className="text-center">
                  {user.customClaims?.verifier ? 'Yes' : 'No'}
                </td>
                <td className="text-center">
                  {user.customClaims?.admin ? 'Yes' : 'No'}
                </td>
                <td>
                  {user.metadata.lastSignInTime ? (
                    <span>
                      {moment(user.metadata.lastSignInTime).fromNow()}
                    </span>
                  ) : (
                    <span className="text-muted">Waiting...</span>
                  )}
                </td>
                <td className="text-center">
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
                </td>
              </tr>
            )
        )}
      </tbody>
    </Table>
  );
};

export default UserTable;
