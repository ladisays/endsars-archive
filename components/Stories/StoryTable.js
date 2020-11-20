import { useRouter } from 'next/router';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import moment from 'moment';
import axios from 'axios';

import Toggle from 'components/Custom/Toggle';
import Icon from 'components/Icon';
import useSubmit from 'hooks/useSubmit';
import styles from './story-table.module.sass';

export const formatTime = (story = {}) => {
  const timestamp = story.eventDate || story.createdAt;

  return moment(timestamp).format('DD MMM');
};

export const getStatus = (story = {}) => {
  if (story.disabled) {
    return 'ban';
  }

  return story.verified ? 'check-circle' : 'clock';
};

const StoryTable = ({ stories, onUpdate }) => {
  const router = useRouter();
  const [setVerified] = useSubmit(
    (id) => axios.put(`/api/stories/${id}`, { verified: true }),
    {
      onCompleted() {
        onUpdate();
      }
    }
  );
  const [setDisabled] = useSubmit((id) =>
    axios.put(`/api/stories/${id}`, { disabled: true, verified: false })
  );
  return (
    <Table responsive="lg" hover className={styles.root}>
      <thead>
        <tr>
          <th />
          <th>Story</th>
          <th>Date</th>
          <th className="text-center">Media</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {stories.map((story) => (
          <tr key={story.id}>
            <td className="text-center">
              <Icon
                data-verified={story.verified}
                data-disabled={story.disabled}
                name={getStatus(story)}
              />
            </td>
            <td>
              <div>
                <div>{story.title || 'Unavailable'}</div>
                {story.description && (
                  <div className="text-muted">{story.description}</div>
                )}
              </div>
            </td>
            <td>{formatTime(story)}</td>
            <td className="text-center">{story.media?.length || 0}</td>
            <td className="text-center">
              <Dropdown alignRight>
                <Dropdown.Toggle as={Toggle} id={story.id}>
                  <Icon name="ellipsis-h" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    eventKey="view"
                    onClick={() => {
                      router.push('/a/stories/[id]', `/a/stories/${story.id}`);
                    }}>
                    View
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="verify"
                    disabled={story.disabled || story.verified}
                    onClick={() => setVerified(story.id)}>
                    {story.verify ? 'Verified' : 'Verify'}
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="disable"
                    disabled={story.disabled}
                    onClick={() => setDisabled(story.id)}>
                    Disable
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default StoryTable;
