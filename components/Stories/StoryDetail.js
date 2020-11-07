import { useRouter } from 'next/router';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';

import Icon from 'components/Icon';
import Toggle from 'components/Custom/Toggle';
import useSubmit from 'hooks/useSubmit';
import useAlerts from 'hooks/useAlerts';
import Media from './Media';
import { formatTime, getLocation } from './StoryItem';
import styles from './story-detail.module.sass';

const StoryDetail = ({ admin = false, id, title, text, ...story }) => {
  const router = useRouter();
  const { showAlert } = useAlerts();
  const [updateStory] = useSubmit(
    (values) => axios.put(`/api/stories/${id}`, values),
    {
      onCompleted() {
        showAlert('Update was successful');
        router.push('/a/stories');
      },
      onError(e) {
        console.log(e);
        showAlert('An error occurred');
      }
    }
  );
  return (
    <div className={styles.root}>
      <div className="d-flex align-items-center">
        <h2 className="flex-grow-1">{title}</h2>
        {admin && (
          <div>
            <Dropdown alignRight>
              <Dropdown.Toggle as={Toggle} id={story.id}>
                <Icon name="ellipsis-h" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  eventKey="verify"
                  disabled={story.disabled || story.active}
                  onClick={() => updateStory({ active: true })}>
                  {story.active ? 'Verified' : 'Verify'}
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="disable"
                  disabled={story.disabled}
                  onClick={() =>
                    updateStory({ disabled: true, active: false })
                  }>
                  Disable
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
      </div>
      <div>
        <p>{text}</p>
      </div>
      <Media detail sources={story.media} />
      <div className={styles.footer}>
        <div>{formatTime(story)}</div>
        <div>{getLocation(story.location)}</div>
      </div>
    </div>
  );
};

export default StoryDetail;
