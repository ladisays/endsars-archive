import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { object, string } from 'yup';

import { NavLink } from 'components/Link';
import Form from 'components/Form';
import useSubmit from 'hooks/useSubmit';

const validationSchema = object().shape({
  name: string().required('City name is required'),
  slug: string()
});

const AddCity = () => {
  const initialValues = {
    name: '',
    slug: ''
  };
  const [onSubmit] = useSubmit((values) => axios.post('/api/cities', values));

  return (
    <Container>
      <Row>
        <Col>
          <Nav>
            <NavLink href="/stories/new">Create a story</NavLink>
            <NavLink href="/cities">Cities</NavLink>
          </Nav>
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <Form
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {({ isSubmitting }) => (
              <>
                <Form.Control name="name" label="Name" />
                <Form.Control name="slug" label="Slug" />
                <Form.Button pending={isSubmitting}>Add City</Form.Button>
              </>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddCity;
