import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import NewStory from 'components/Stories/NewStory';
import { Link } from 'components/Link';
import Icon from 'components/Icon';
import useAuth from 'hooks/useAuth';
import { canVerify } from 'utils/roles';

const CreateStory = () => {
  const { role } = useAuth();

  return (
    <Container>
      <Row>
        <Col xs={12} className="my-3">
          {canVerify(role) && (
            <Button
              size="sm"
              variant="outline-primary"
              as={Link}
              href="/a/stories">
              <Icon name="arrow-left" iconCss="mr-2" />
              <span>Go to stories</span>
            </Button>
          )}
          <h2 className="my-3">Add a new story</h2>
        </Col>
        <Col xs={12}>
          <NewStory />
        </Col>
      </Row>
    </Container>
  );
};

export default CreateStory;
