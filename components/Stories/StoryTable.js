import { useRouter } from 'next/router';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import moment from 'moment';
import axios from 'axios';

import Toggle from 'components/Custom/Toggle';
import Icon from 'components/Icon';
import { Link } from 'components/Link';
import useSubmit from 'hooks/useSubmit';
import useAuth from 'hooks/useAuth';
import { statuses, getStatusLabel } from 'utils/status';
import { canVerify, canModerate } from 'utils/roles';
import StoryStatus from './StoryStatus';
import styles from './story-table.module.sass';

export const formatTime = (story = {}) => {
  const timestamp = story.eventDate || story.createdAt;

  return moment(timestamp).format('DD MMM');
};

const formatStoryDate = (date) => moment.utc(date).format('MMM D, YYYY');
const verifyStory = (id, status) =>
  axios.post(`/api/stories/${id}/verify`, { status });
const approveStory = (id, status) =>
  axios.post(`/api/stories/${id}/approve`, { status });

const StoryTable = ({ stories, onUpdate }) => {
  const router = useRouter();
  const { role } = useAuth();
  const [setVerification] = useSubmit(verifyStory, {
    onCompleted() {
      onUpdate();
    }
  });
  const [setApproval] = useSubmit(approveStory, {
    onCompleted() {
      onUpdate();
    }
  });
  const handleVerification = (id, status) => () => {
    if (canVerify(role)) {
      setVerification(id, status);
    }
  };
  const handleApproval = (id, status) => () => {
    if (canModerate(role)) {
      setApproval(id, status);
    }
  };

  return (
    <Table responsive="lg" hover className={styles.root}>
      <thead>
        <tr>
          <th>Story</th>
          <th />
          <th>Date</th>
          <th className="text-center">Media</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {stories.map((story) => (
          <tr key={story.id}>
            <td>
              <Link href={`/stories/${story.id}`}>
                <div>{story.title || 'Unavailable'}</div>
                {story.description && (
                  <div className="text-muted">{story.description}</div>
                )}
              </Link>
            </td>
            <td>
              <Link href={`/stories/${story.id}`}>
                <StoryStatus status={story.status} />
              </Link>
            </td>
            <td>
              <Link href={`/stories/${story.id}`}>
                {formatStoryDate(story.eventDate)}
              </Link>
            </td>
            <td className="text-center">
              <Link href={`/stories/${story.id}`}>
                {story.media?.length || 0}
              </Link>
            </td>
            <td className="text-center">
              {canVerify(role) && (
                <Dropdown alignRight>
                  <Dropdown.Toggle as={Toggle} id={story.id}>
                    <Icon name="ellipsis-h" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      eventKey="edit"
                      onClick={() => {
                        router.push(
                          '/a/stories/[id]',
                          `/a/stories/${story.id}`
                        );
                      }}>
                      Edit
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey={statuses.VERIFIED}
                      disabled={
                        story.status !== statuses.DISABLED ||
                        story.status === statuses.VERIFIED ||
                        story.status === statuses.APPROVED
                      }
                      onClick={handleVerification(story.id, statuses.VERIFIED)}>
                      {getStatusLabel(statuses.VERIFIED)}
                    </Dropdown.Item>
                    {canModerate(role) && (
                      <Dropdown.Item
                        eventKey={statuses.APPROVED}
                        disabled={
                          story.status === statuses.DISABLED ||
                          story.status === statuses.APPROVED ||
                          story.status === statuses.UNVERIFIED
                        }
                        onClick={handleApproval(story.id, statuses.APPROVED)}>
                        {getStatusLabel(statuses.APPROVED)}
                      </Dropdown.Item>
                    )}
                    {(canVerify(role) || canModerate(role)) && (
                      <>
                        <Dropdown.Divider />
                        <Dropdown.Item
                          eventKey={statuses.UNVERIFIED}
                          disabled={
                            story.status === statuses.DISABLED ||
                            story.status === statuses.UNVERIFIED
                          }
                          onClick={handleVerification(
                            story.id,
                            statuses.UNVERIFIED
                          )}>
                          {getStatusLabel(statuses.UNVERIFIED)}
                        </Dropdown.Item>
                        {canModerate(role) && (
                          <Dropdown.Item
                            eventKey={statuses.DISABLED}
                            disabled={story.status === statuses.DISABLED}
                            className={
                              story.status !== statuses.DISABLED &&
                              'text-danger'
                            }
                            onClick={handleApproval(
                              story.id,
                              statuses.DISABLED
                            )}>
                            {getStatusLabel(statuses.DISABLED)}
                          </Dropdown.Item>
                        )}
                      </>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default StoryTable;
