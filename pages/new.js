import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import NewStory from 'components/Stories/NewStory';
import { Link } from 'components/Link';
import useAuth from 'hooks/useAuth';

const CreateStory = () => {
  const { roles } = useAuth();

  return (
    <Container>
      <Row>
        <Col xs={12} className="mb-3">
          {(roles.admin || roles.verifier) && (
            <Link href="/a/stories">Go to stories</Link>
          )}
          <h4 className="my-3">Add a new story</h4>
        </Col>
        <Col xs={12}>
          <NewStory />
        </Col>
      </Row>
    </Container>
  );
};

export default CreateStory;
