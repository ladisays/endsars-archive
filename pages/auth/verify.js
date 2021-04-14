import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import { string, object } from 'yup';

import Form from 'components/Form';
import useSubmit from 'hooks/useSubmit';
import useAuth from 'hooks/useAuth';
import firebase from 'utils/firebase';
import { isFailed } from 'utils/operations';
import { canView } from 'utils/roles';

const validationSchema = object().shape({
  email: string().email('Invalid email').required('Email is required')
});

const VerificationForm = () => {
  const initialValues = {
    email: ''
  };
  const [onSubmit, { submitting, error }] = useSubmit((values) => {
    const { email } = values;
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      return firebase.auth().signInWithEmailLink(email, window.location.href);
    }
    return Promise.reject(new Error('Invalid authentication link'));
  });

  return (
    <>
      <Form
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <>
            <Form.Control
              name="email"
              label="Your email address"
              helpText="This is the email address which you used to receive the authentication link"
            />
            <Form.Button
              block
              pending={isSubmitting}
              variant="success"
              className="mx-auto py-2 px-4 font-weight-bold">
              Verify
            </Form.Button>
          </>
        )}
      </Form>
      {isFailed(submitting) && (
        <Alert variant="danger" className="mt-3">
          {error?.message || 'An error occurred!'}
        </Alert>
      )}
    </>
  );
};

const Verify = () => {
  const { role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (canView(role)) {
      router.replace('/a/stories');
    }
  }, [role, router]);

  return (
    <Container>
      <Row>
        <Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
          <Row xs={1} sm={1}>
            <Col className="text-center mt-3">
              <h3>Verify your account</h3>
              <p className="text-muted">
                Provide your email address in the field below
              </p>
            </Col>
            <Col>
              <VerificationForm />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Verify;
