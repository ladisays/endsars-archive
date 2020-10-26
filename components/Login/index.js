import Card from 'react-bootstrap/Card';
import axios from 'axios';
import cookies from 'js-cookie';
import { string, object } from 'yup';

import Form from 'components/Form';
import useSubmit from 'hooks/useSubmit';

const validationSchema = object().shape({
  email: string().email('Invalid email').required('Email is required'),
  password: string().required('Password is required')
});

const LoginForm = () => {
  const initialValues = {
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
    <Card>
      <Card.Header>
        <strong>Please, sign in</strong>
      </Card.Header>
      <Card.Body>
        <Form
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <>
              <Form.Control name="email" label="Email address" />
              <Form.Control name="password" label="Password" type="password" />
              <Form.Button
                block
                pending={isSubmitting}
                variant="success"
                className="mx-auto py-2 px-4 font-weight-bold">
                Sign in
              </Form.Button>
            </>
          )}
        </Form>
      </Card.Body>
    </Card>
  );
};

export default LoginForm;
