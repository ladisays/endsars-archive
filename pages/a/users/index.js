import { useEffect, useState, useMemo } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';
import { string, object, bool } from 'yup';
import moment from 'moment';

import Form from 'components/Form';
import Loading from 'components/Loading';
import { getLayout } from 'components/Layouts/Admin';
import ToggleRef from 'components/Custom/Toggle';
import useSubmit from 'hooks/useSubmit';
import { useLazyAsync } from 'hooks/useBaseAsync';
import { isPending, isFailed, isFulfilled, isIdle } from 'utils/operations';

const validationSchema = object().shape({
  uid: string(),
  email: string().email('Invalid email').required('mail is required'),
  roles: object().shape({
    admin: bool(),
    verifier: bool()
  })
});

const UserForm = ({ user, onUpdate, onHide }) => {
  const initialValues = useMemo(
    () => ({
      uid: (user && user.uid) || '',
      email: (user && user.email) || '',
      roles: (user && user.customClaims) || {
        admin: false,
        verifier: false
      }
    }),
    [user]
  );
  const [onSubmit] = useSubmit((values) => axios.post('/api/users', values), {
    onCompleted() {
      onUpdate();
      onHide();
    },
    onError(error) {
      console.log(error);
    }
  });

  return (
    <Form
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <>
          <Form.Control name="email" label="Email address" />
          <Form.Check grouped name="roles.verifier" label="Verifier" />
          <Form.Check grouped name="roles.admin" label="Administrator" />
          <Form.Button
            block
            size="sm"
            pending={isSubmitting}
            variant="success"
            className="mx-auto py-2 px-4 font-weight-bold">
            {user ? 'Update' : 'Create'}
          </Form.Button>
        </>
      )}
    </Form>
  );
};

const NewUserModal = ({ onUpdate, onHide, show, user }) => {
  console.log('user ==== ', user);
  return (
    <Modal show={show} centered scrollable onHide={onHide}>
      <Modal.Header closeButton>
        <strong>{user ? 'Update user' : 'Add a new user'}</strong>
      </Modal.Header>
      <Modal.Body>
        <p className="text-muted">
          The user will get an email with a sign-in link
        </p>
        <UserForm user={user} onHide={onHide} onUpdate={onUpdate} />
      </Modal.Body>
    </Modal>
  );
};

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
                <Table hover responsive="lg" className="mt-3">
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
                              {user.customClaims && user.customClaims.verifier
                                ? 'Yes'
                                : 'No'}
                            </td>
                            <td className="text-center">
                              {user.customClaims && user.customClaims.admin
                                ? 'Yes'
                                : 'No'}
                            </td>
                            <td>
                              {user.metadata.lastSignInTime ? (
                                <span>
                                  {moment(
                                    user.metadata.lastSignInTime
                                  ).fromNow()}
                                </span>
                              ) : (
                                <span className="text-muted">Waiting...</span>
                              )}
                            </td>
                            <td className="text-center">
                              <Dropdown alignRight>
                                <Dropdown.Toggle as={ToggleRef} id={user.uid} />
                                <Dropdown.Menu>
                                  <Dropdown.Item onClick={onShow(user)}>
                                    View
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    disabled={user.disabled}
                                    onClick={() => setDisabled(user.uid)}>
                                    Disable
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        )
                    )}
                  </tbody>
                </Table>
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
        <NewUserModal
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
