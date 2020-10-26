import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import cookies from 'js-cookie';
import { string, object } from 'yup';

import Form from 'components/Form';
import useSubmit from 'hooks/useSubmit';

const validationSchema = object().shape({
  displayName: string().required('Your display name is required'),
  email: string().email('Invalid email').required('mail is required'),
  password: string().required('Password is required')
});

const CreateForm = () => {
  const initialValues = {
    displayName: '',
    email: '',
    password: ''
  };
  const [onSubmit] = useSubmit((values) => axios.post('/api/signup', values), {
    onCompleted(data) {
      cookies.set('esa_auth', JSON.stringify(data));
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
            name="displayName"
            label="Display name"
            placeholder="John Doe"
          />
          <Form.Control name="email" label="Email address" />
          <Form.Control name="password" label="Password" type="password" />
          <Form.Button
            block
            pending={isSubmitting}
            variant="success"
            className="mx-auto py-2 px-4 font-weight-bold">
            Create
          </Form.Button>
        </>
      )}
    </Form>
  );
};

const Create = () => {
  return (
    <Container>
      <Row>
        <Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
          <Row xs={1} sm={1}>
            <Col className="text-center">
              <h1>Create an account</h1>
              <p className="text-muted">
                A new account will require authorization
              </p>
            </Col>
            <Col>
              <CreateForm />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Create;
