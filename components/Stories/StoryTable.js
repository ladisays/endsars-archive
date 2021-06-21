import Table from 'react-bootstrap/Table';

import { formatEventDate } from 'utils/timeline';
import { Link } from 'components/Link';
import StoryStatus from './StoryStatus';
import StoryActions from './StoryActions';
import styles from './story-table.module.sass';

const StoryTable = ({ stories, onUpdate }) => {
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
              <Link href={`/a/stories/${story.id}`}>
                <div>{story.title || 'Unavailable'}</div>
                {story.description && (
                  <div className="text-muted">{story.description}</div>
                )}
              </Link>
            </td>
            <td>
              <Link href={`/a/stories/${story.id}`}>
                <StoryStatus status={story.status} />
              </Link>
            </td>
            <td>
              <Link href={`/a/stories/${story.id}`}>
                {formatEventDate(story.eventDate, 'll')}
              </Link>
            </td>
            <td className="text-center">
              <Link href={`/a/stories/${story.id}`}>
                {story.media?.length || 0}
              </Link>
            </td>
            <td className="text-center">
              <StoryActions {...story} onUpdate={onUpdate} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default StoryTable;
