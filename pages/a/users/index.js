import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import Icon from 'components/Icon';
import Loading from 'components/Loading';
import { getLayout } from 'components/Layouts/Admin';
import Meta from 'components/Layouts/Meta';
import UserTable from 'components/Users/UserTable';
import { UserModal } from 'components/Users/UserForm';
import useSubmit from 'hooks/useSubmit';
import { useAsync } from 'hooks/useBaseAsync';
import useAuth from 'hooks/useAuth';
import { isAdmin } from 'utils/roles';
import { isPending, isFailed, isFulfilled } from 'utils/operations';

const fetcher = () => axios.get('/api/users');
const disableUserAccount = (id) =>
  axios.put(`/api/users/${id}`, { disabled: true });
const deleteUserAccount = (id) => axios.delete(`/api/users/${id}`);

const Users = () => {
  const { role } = useAuth();
  const [show, setShow] = useState(false);
  const [activeUser, setActiveUser] = useState(null);
  const [{ loading, data: users }, refetch] = useAsync(fetcher, { data: [] });
  const [setDisabled] = useSubmit(disableUserAccount);
  const [deleteUser] = useSubmit(deleteUserAccount);
  const onHide = () => {
    setActiveUser(null);
    setShow(false);
  };
  const onShow = (user = null) => () => {
    setActiveUser(user);
    setShow(true);
  };

  return (
    <>
      <Row>
        <Col xs={12}>
          <Meta title="Users" noCrawl />
          <div className="d-flex justify-content-between mt-4">
            <h2 className="m-0">Users</h2>
            {isAdmin(role) && (
              <Button variant="outline-primary" onClick={onShow(null)}>
                <Icon name="plus" iconCss="mr-2" />
                <span>Add user</span>
              </Button>
            )}
          </div>
        </Col>
        <Col className="mt-3">
          {isPending(loading) && <Loading />}
          {isFulfilled(loading) && (
            <>
              {users.length ? (
                <UserTable
                  users={users}
                  onShow={onShow}
                  setDisabled={setDisabled}
                  deleteUser={deleteUser}
                />
              ) : (
                <Alert variant="info">There are no users</Alert>
              )}
            </>
          )}
          {isFailed(loading) && (
            <Alert variant="danger">An error occurred!</Alert>
          )}
        </Col>
      </Row>
      {isAdmin(role) && show && (
        <UserModal
          show={show}
          onHide={onHide}
          onUpdate={refetch}
          user={activeUser}
        />
      )}
    </>
  );
};

Users.getLayout = getLayout;

export default Users;
