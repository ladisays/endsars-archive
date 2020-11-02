import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { getStoryById } from 'lib/stories';
import StoryDetail from 'components/Stories/StoryDetail';

export const getStaticPaths = async () => ({ paths: [], fallback: true });

export const getStaticProps = async ({ params }) => {
  let story = null;
  let error = null;

  try {
    story = await getStoryById(params.id);
  } catch (err) {
    error = err;
  }

  return {
    props: { story, error },
    revalidate: 1
  };
};

const Story = ({ story, error }) => {
  if (error) {
    console.log(error);
    return <div>Error!</div>;
  }

  return (
    <Container>
      <Row>
        <Col lg={{ span: 6, offset: 3 }}>
          {error ? <div>Error!</div> : <StoryDetail {...story} />}
        </Col>
      </Row>
    </Container>
  );
};

export default Story;
