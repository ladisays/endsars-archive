import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

import { useLazyAsync } from 'hooks/useBaseAsync';
import { isPending, isFailed, isFulfilled, isIdle } from 'utils/operations';
import StoryDetail from 'components/Stories/StoryDetail';
import { getLayout } from 'components/Layouts/Admin';

const Story = () => {
  const { query } = useRouter();
  const [{ loading, data }, refetch] = useLazyAsync(
    (id) => axios.get(`/api/stories/${id}`),
    { data: {} }
  );

  useEffect(() => {
    if (isIdle(loading)) {
      refetch(query.id);
    }
  }, [loading, query.id, refetch]);

  return (
    <Container>
      <Row>
        <Col lg={{ span: 6, offset: 3 }}>
          {isPending(loading) && <Spinner animation="border" />}
          {isFailed(loading) && <div>An error occurred!</div>}
          {isFulfilled(loading) && <StoryDetail admin {...data} />}
        </Col>
      </Row>
    </Container>
  );
};

Story.getLayout = getLayout;

export default Story;
