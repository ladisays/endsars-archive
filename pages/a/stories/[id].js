import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { useLazyAsync } from 'hooks/useBaseAsync';
import { isPending, isFailed, isIdle, isFulfilled } from 'utils/operations';
import NewStory from 'components/Stories/NewStory';
import { getLayout } from 'components/Layouts/Admin';
import Loading from 'components/Loading';
import { Link } from 'components/Link';
import Icon from 'components/Icon';
import Meta from 'components/Layouts/Meta';

const fetcher = (id) => axios.get(`/api/stories/${id}`);

const Story = () => {
  const { query } = useRouter();
  const [{ loading, data: story }, refetch] = useLazyAsync(fetcher, {
    data: {}
  });
  const onSuccess = () => {
    refetch(query.id);
  };

  useEffect(() => {
    if (isIdle(loading)) {
      refetch(query.id);
    }
  }, [loading, query.id, refetch]);

  return (
    <Row>
      <Col xs={12} className="mb-3">
        <Meta title={story?.title || 'Story'} noCrawl />
        <Button as={Link} size="sm" variant="outline-primary" href="/a/stories">
          <Icon name="arrow-left" iconCss="mr-2" />
          <span>Stories</span>
        </Button>
        <h2 className="my-3">Update story</h2>
      </Col>
      <Col xs={12}>
        {isPending(loading) && <Loading />}
        {isFailed(loading) && <div>An error occurred!</div>}
        {isFulfilled(loading) && (
          <NewStory story={story} onSuccess={onSuccess} />
        )}
      </Col>
    </Row>
  );
};

Story.getLayout = getLayout;

export default Story;
