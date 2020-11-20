import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import Meta from 'components/Layouts/Meta';
import { Link } from 'components/Link';

const Home = () => {
  return (
    <>
      <Meta />
      <Container>
        <Row>
          <Col className="my-3">
            <h1>
              Help End Police <br /> Brutality in Nigeria!
            </h1>
            <div className="d-block mb-3">
              Share your story about police brutality in Nigeria. <br /> Help
              keep documentation by sharing your photos <br /> or videos from
              what has been going on.
            </div>
            <p>
              <Button as={Link} href="/new">
                Share your story
              </Button>
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
