import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

import { getStories } from 'lib/stories';
import { NewStory, StoryItem } from 'components/Stories';

export const getStaticProps = async ({ params }) => {
  let stories = [];
  let error = null;

  try {
    stories = await getStories(params);
  } catch (err) {
    console.log(err);
    error = err;
  }

  return {
    props: { stories, error },
    revalidate: 1
  };
};

const Home = ({ stories, error }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  return (
    <Container>
      <Row>
        <Col className="p-3">
          <Jumbotron>
            <h1>Help End Police Brutality in Nigeria!</h1>
            <p>
              Share your story about police brutality in Nigeria. Help keep
              documentation by sharing your photos or videos from protests.
            </p>
            <p>
              <Button onClick={handleOpen}>Share your story</Button>
            </p>
          </Jumbotron>
        </Col>
      </Row>
      <Row>
        <Col>
          {error && <div>An error occurred while loading stories</div>}
          {stories.length ? (
            stories.map((story) => <StoryItem key={story.id} {...story} />)
          ) : (
            <div>There are no stories currently available</div>
          )}
        </Col>
      </Row>
      {show && <NewStory show={show} onHide={handleClose} />}
    </Container>
  );
};

export default Home;
