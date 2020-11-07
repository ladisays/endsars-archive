import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useLazyAsync } from 'hooks/useBaseAsync';
import { isPending, isFailed, isFulfilled, isIdle } from 'utils/operations';
import StoryDetail from 'components/Stories/StoryDetail';
import { getLayout } from 'components/Layouts/Admin';
import Loading from 'components/Loading';

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
    <Row>
      <Col lg={{ span: 8, offset: 2 }}>
        {isPending(loading) && <Loading />}
        {isFailed(loading) && <div>An error occurred!</div>}
        {isFulfilled(loading) && <StoryDetail admin {...data} />}
      </Col>
    </Row>
  );
};

Story.getLayout = getLayout;

export default Story;
