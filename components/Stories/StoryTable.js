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

  return story.active ? 'check-circle' : 'clock';
};

const StoryTable = ({ stories }) => {
  const [setVerified] = useSubmit((id) =>
    axios.put(`/api/stories/${id}`, { active: true })
  );
  const [setDisabled] = useSubmit((id) =>
    axios.put(`/api/stories/${id}`, { disabled: true, active: false })
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
                data-active={story.active}
                data-disabled={story.disabled}
                name={getStatus(story)}
              />
            </td>
            <td>
              <div>
                <div>{story.title || 'Unavailable'}</div>
                {story.text && <div className="text-muted">{story.text}</div>}
              </div>
            </td>
            <td>{formatTime(story)}</td>
            <td className="text-center">{story.media?.length || 0}</td>
            <td className="text-center">
              <Dropdown alignRight>
                <Dropdown.Toggle as={Toggle} id={story.id} />
                <Dropdown.Menu>
                  <Dropdown.Item
                    eventKey="verify"
                    disabled={story.disabled || story.active}
                    onClick={() => setVerified(story.id)}>
                    Verify
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
