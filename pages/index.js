import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { getStories } from 'lib/stories';
import { NewStory, StoryItem } from 'components/Stories';
import { NavLink } from 'components/Link';

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
        <Col className="my-3">
          <h1>
            Help End Police <br /> Brutality in Nigeria!
          </h1>
          <p>
            Share your story about police brutality in Nigeria. <br /> Help keep
            documentation by sharing your photos <br /> or videos from protests.
          </p>
          <p>
            <Button onClick={handleOpen}>Share your story</Button>
          </p>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <div>
            <strong>Filter by type</strong>
            <div className="d-flex">
              <NavLink href="/photos">Photos</NavLink>
              <NavLink href="/videos">Videos</NavLink>
              <NavLink href="/text">Text</NavLink>
            </div>
          </div>
          <div>
            <strong>Filter by location</strong>
            <div>Dropdown here...</div>
          </div>
        </Col>
        <Col>
          {error && <div>An error occurred while loading stories</div>}
          {stories.length ? (
            <Row xs={1} md={2} lg={3}>
              {stories.map(
                (story) =>
                  story.active && <StoryItem key={story.id} {...story} />
              )}
            </Row>
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
