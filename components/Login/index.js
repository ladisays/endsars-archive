import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import { string, object } from 'yup';

import Form from 'components/Form';
import useSubmit from 'hooks/useSubmit';
import { isFailed, isFulfilled } from 'utils/operations';

const validationSchema = object().shape({
  email: string().email('Invalid email').required('Email is required')
});

const LoginForm = () => {
  const initialValues = {
    email: '',
    re_auth: true
  };
  const [onSubmit, { submitting }] = useSubmit((values) =>
    axios.post('/api/users', values)
  );

  return (
    <Modal show centered backdrop="static" keyboard={false}>
      <Modal.Header>
        <strong>Please, provide your email address</strong>
      </Modal.Header>
      <Modal.Body>
        <Form
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <>
              <Form.Control name="email" label="Email address" />
              <Form.Button
                block
                size="sm"
                pending={isSubmitting}
                variant="success"
                className="mx-auto py-2 px-4 font-weight-bold">
                Send
              </Form.Button>
            </>
          )}
        </Form>
        {isFailed(submitting) && (
          <Alert variant="danger" className="mt-3">
            An error occurred
          </Alert>
        )}
        {isFulfilled(submitting) && (
          <Alert variant="success" className="mt-3">
            Your One-Time sign-in link has been successfully sent to your email
            address
          </Alert>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default LoginForm;
