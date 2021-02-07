import { useMemo } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { string, object, bool } from 'yup';

import Form from 'components/Form';
import useSubmit from 'hooks/useSubmit';
import useAlerts from 'hooks/useAlerts';
import { userRoles } from 'utils/roles';

const validationSchema = object().shape({
  uid: string(),
  email: string().email('Invalid email').required('Email is required'),
  roles: object().shape({
    admin: bool(),
    verifier: bool()
  })
});

const UserForm = ({ user, onUpdate, onHide }) => {
  const { showAlert } = useAlerts();
  const initialValues = useMemo(
    () => ({
      uid: (user && user.uid) || '',
      email: (user && user.email) || '',
      role: user?.customClaims?.role
    }),
    [user]
  );
  const [onSubmit] = useSubmit((values) => axios.post('/api/users', values), {
    onCompleted() {
      onUpdate();
      onHide();
      const msg = user ? 'Update was successful' : 'The user has been created.';
      showAlert(msg);
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
          <Form.Control
            name="email"
            label="Email address"
            readOnly={!!user}
            helpText={!!user && 'Email address cannot be changed'}
          />
          <Form.Control
            as="select"
            name="role"
            label="Role"
            options={userRoles}
          />
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

export const UserModal = ({ onUpdate, onHide, show, user }) => (
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

export default UserForm;
