import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useRouter } from 'next/router';

import { getStoryById } from 'lib/stories';
import StoryDetail from 'components/Stories/StoryDetail';
import Meta from 'components/Layouts/Meta';
import Loading from 'components/Loading';

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
  const { isFallback } = useRouter();
  if (error) {
    console.log(error);
    return <div> An error occurred!</div>;
  }

  if (isFallback) {
    return <Loading />;
  }

  return (
    <Container>
      <Meta title={story.title} description={story.text} />
      <Row>
        <Col lg={{ span: 6, offset: 3 }}>
          <StoryDetail {...story} />
        </Col>
      </Row>
    </Container>
  );
};

export default Story;
