import { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import Loading from 'components/Loading';
import { getLayout } from 'components/Layouts/Admin';
import UserTable from 'components/Users/UserTable';
import { UserModal } from 'components/Users/UserForm';
import useSubmit from 'hooks/useSubmit';
import { useLazyAsync } from 'hooks/useBaseAsync';
import { isPending, isFailed, isFulfilled, isIdle } from 'utils/operations';

const Users = () => {
  const [show, setShow] = useState(false);
  const [activeUser, setActiveUser] = useState(null);
  const [{ loading, data: users }, refetch] = useLazyAsync(
    () => axios.get('/api/users'),
    { data: [] }
  );
  const [setDisabled] = useSubmit((id) =>
    axios.put(`/api/users/${id}`, { disabled: true })
  );
  const onHide = () => {
    setActiveUser(null);
    setShow(false);
  };
  const onShow = (user = null) => () => {
    setActiveUser(user);
    setShow(true);
  };

  useEffect(() => {
    if (isIdle(loading)) {
      refetch();
    }
  }, [loading, refetch]);

  return (
    <>
      <Row>
        <Col xs={12}>
          <div className="d-flex justify-content-between">
            <h4>Users</h4>
            <Button onClick={onShow(null)}>Add user</Button>
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
      {show && (
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
