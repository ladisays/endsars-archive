import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useLazyAsync } from 'hooks/useBaseAsync';
import { isPending, isFailed, isIdle, isFulfilled } from 'utils/operations';
import NewStory from 'components/Stories/NewStory';
import { getLayout } from 'components/Layouts/Admin';
import Loading from 'components/Loading';
import { Link } from 'components/Link';

const Story = () => {
  const { query } = useRouter();
  const [{ loading, data: story }, refetch] = useLazyAsync(
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
      <Col xs={12} className="mb-3">
        <Link href="/a/stories">Back to stories</Link>
        <h4 className="my-3">Update story</h4>
      </Col>
      <Col xs={12}>
        {isPending(loading) && <Loading />}
        {isFailed(loading) && <div>An error occurred!</div>}
        {isFulfilled(loading) && <NewStory story={story} />}
      </Col>
    </Row>
  );
};

Story.getLayout = getLayout;

export default Story;
