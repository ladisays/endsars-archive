import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import { string, object } from 'yup';

import Meta from 'components/Layouts/Meta';
import Form from 'components/Form';
import MultiForm from 'components/MultiForm';
import useSubmit from 'hooks/useSubmit';
import useAuth from 'hooks/useAuth';
import { isFailed, isFulfilled } from 'utils/operations';
import firebase from 'utils/firebase';
import { canView } from 'utils/roles';

const emailValidationSchema = object().shape({
  email: string().email('Invalid email').required('Email is required')
});
const codeValidationSchema = object().shape({
  code: string().length(6, 'Code must be 6 characters')
});

const generateCode = (values) =>
  axios.post('/api/users/verification/generate', values);
const confirmCode = (values) =>
  axios.post('/api/users/verification/confirm', values);

const Login = () => {
  const router = useRouter();
  const { role } = useAuth();
  const initialValues = {
    email: '',
    code: ''
  };
  const [generateVerificationCode, { submitting }] = useSubmit(generateCode);
  const [confirmVerificationCode] = useSubmit(confirmCode, {
    async onCompleted(data) {
      const { authToken } = data;
      try {
        await firebase.auth().signInWithCustomToken(authToken);
      } catch (e) {
        console.log(e);
      }
    }
  });

  useEffect(() => {
    if (canView(role)) {
      router.replace('/a/stories');
    }
  }, [role, router]);

  return (
    <Container>
      <Meta title="Login" />
      <Row>
        <Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
          <Row>
            <Col>
              <h2 className="text-center">Sign in to your account</h2>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              {isFailed(submitting) && (
                <Alert variant="danger" className="mt-3">
                  <Alert.Heading>Oops! Something went wrong.</Alert.Heading>
                  Ensure you have provided a valid email address
                </Alert>
              )}
              {isFulfilled(submitting) && (
                <Alert variant="success" className="mt-3">
                  Your verification code has been successfully sent to your
                  email address
                </Alert>
              )}
            </Col>
            <Col xs={12}>
              <MultiForm
                initialValues={initialValues}
                onSubmit={confirmVerificationCode}>
                <MultiForm.Step
                  title="Enter your email address"
                  nextLabel="Send verification code"
                  onSubmit={generateVerificationCode}
                  validationSchema={emailValidationSchema}>
                  <Form.Control name="email" placeholder="Email address" />
                </MultiForm.Step>
                <MultiForm.Step
                  title="Enter your verification code"
                  nextLabel="Sign In"
                  validationSchema={codeValidationSchema}>
                  <Form.Control name="code" placeholder="Verification code" />
                </MultiForm.Step>
              </MultiForm>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
