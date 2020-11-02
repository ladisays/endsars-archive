import { forwardRef } from 'react';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import moment from 'moment';
import axios from 'axios';

import Icon from 'components/Icon';
import useSubmit from 'hooks/useSubmit';
import styles from './story-table.module.sass';

export const formatTime = (story = {}) => {
  const timestamp = story.eventDate || story.createdAt;

  return moment(timestamp).format('DD MMM');
};

const Toggle = ({ onClick, className, ...props }, ref) => (
  <button
    className={styles.toggle}
    type="button"
    ref={ref}
    onClick={onClick}
    {...props}>
    <Icon name="ellipsis-h" />
  </button>
);

const ToggleRef = forwardRef(Toggle);

const StoryTable = ({ stories }) => {
  const [setVerified] = useSubmit((id) =>
    axios.put(`/api/stories/${id}`, { active: true })
  );
  return (
    <Table hover>
      <thead>
        <tr>
          <th />
          <th>Description</th>
          <th>Media count</th>
          <th>Date</th>
          <th>Status</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {stories.map((story, i) => (
          <tr key={story.id}>
            <td>{i + 1}</td>
            <td>
              <div>
                <strong>{story.title || 'Unavailable'}</strong>
                {story.text && <div className="text-muted">{story.text}</div>}
              </div>
            </td>
            <td>{story.media?.length || 0}</td>
            <td>{formatTime(story)}</td>
            <td>{story.active ? 'Verified' : 'Unverified'}</td>
            <td>
              <Dropdown alignRight>
                <Dropdown.Toggle as={ToggleRef} id="item-drp" />
                <Dropdown.Menu>
                  <Dropdown.Item
                    disabled={story.disabled || story.active}
                    onClick={() => setVerified(story.id)}>
                    Verify
                  </Dropdown.Item>
                  <Dropdown.Item disabled>Disable</Dropdown.Item>
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
