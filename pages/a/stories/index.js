import { useMemo } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

import { useAsync } from 'hooks/useBaseAsync';
import useAuth from 'hooks/useAuth';
import { canVerify } from 'utils/roles';
import { statuses, statusTags } from 'utils/status';
import { isPending, isFailed, isFulfilled } from 'utils/operations';
import StoryTable from 'components/Stories/StoryTable';
import { getLayout } from 'components/Layouts/Admin';
import Loading from 'components/Loading';
import { Link, NavLink } from 'components/Link';
import Icon from 'components/Icon';
import styles from 'styles/pages/a-stories.module.sass';

const Stories = () => {
  const { query } = useRouter();
  const { role } = useAuth();
  const fetcher = useMemo(() => {
    let url = '/api/stories';

    if (query.status) {
      url += `?status=${statuses[query.status.toUpperCase()]}`;
    }
    return () => axios.get(url);
  }, [query.status]);
  const [{ loading, data: stories }, refetch] = useAsync(fetcher, { data: [] });

  return (
    <Row>
      <Col xs={12}>
        <div className="d-flex justify-content-between mt-4">
          <h2 className="m-0">Stories</h2>
          {canVerify(role) && (
            <Button variant="outline-primary" as={Link} href="/new">
              <Icon name="plus" iconCss="mr-2" />
              <span>Add story</span>
            </Button>
          )}
        </div>
      </Col>
      <Col xs={12} className="mt-3">
        {isPending(loading) && <Loading />}
        {isFailed(loading) && (
          <Alert variant="danger">
            An error occurred while loading stories
          </Alert>
        )}
        {isFulfilled(loading) && (
          <>
            <Nav className={styles.nav}>
              <NavLink exact href="/a/stories">
                All
              </NavLink>
              {statusTags.map((tag) => {
                return (
                  <NavLink
                    key={tag.value}
                    exact
                    href={`/a/stories?status=${tag.label.toLowerCase()}`}>
                    {tag.label}
                  </NavLink>
                );
              })}
            </Nav>
            {stories.length ? (
              <StoryTable stories={stories} onUpdate={refetch} />
            ) : (
              <Alert variant="info">There are no stories available</Alert>
            )}
          </>
        )}
      </Col>
    </Row>
  );
};

Stories.getLayout = getLayout;

export default Stories;
