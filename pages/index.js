import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { getStories } from 'lib/stories';
import { NewStory, StoryList } from 'components/Stories';
import { StoriesProvider } from 'hooks/useStories';
import Meta from 'components/Layouts/Meta';

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
    <StoriesProvider stories={stories}>
      <Meta />
      <Container>
        <Row>
          <Col className="my-3">
            <h1>
              Help End Police <br /> Brutality in Nigeria!
            </h1>
            <small className="d-block mb-3">
              Share your story about police brutality in Nigeria. <br /> Help
              keep documentation by sharing your photos <br /> or videos from
              protests.
            </small>
            <p>
              <Button onClick={handleOpen}>Share your story</Button>
            </p>
          </Col>
        </Row>
        <StoryList error={error} />
        {show && <NewStory show={show} onHide={handleClose} />}
      </Container>
    </StoriesProvider>
  );
};

export default Home;
