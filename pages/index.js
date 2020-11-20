import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import connectDb from 'utils/db/connect';
import Story from 'utils/db/models/Story';
import { StoryList } from 'components/Stories';
import { StoriesProvider } from 'hooks/useStories';
import Meta from 'components/Layouts/Meta';
import { Link } from 'components/Link';

export const getStaticProps = async () => {
  let stories = [];
  let error = null;

  try {
    await connectDb();
    stories = await Story.find({ verified: true }).populate({
      path: 'city',
      select: 'name slug',
      populate: {
        path: 'country',
        select: 'name slug'
      }
    });
    stories = stories.map((_story) => {
      const story = _story.toJSON();
      return story;
    });
  } catch (err) {
    error = err;
  }

  return {
    props: { stories, error },
    revalidate: 1
  };
};

const Home = ({ stories, error }) => {
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
              <Button as={Link} href="/new">
                Share your story
              </Button>
            </p>
          </Col>
        </Row>
        <StoryList error={error} />
      </Container>
    </StoriesProvider>
  );
};

export default Home;
