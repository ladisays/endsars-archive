import { useRouter } from 'next/router';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';

import Toggle from 'components/Custom/Toggle';
import Icon from 'components/Icon';
import useAuth from 'hooks/useAuth';
import useSubmit from 'hooks/useSubmit';
import { canVerify, canModerate } from 'utils/roles';
import { statuses, getStatusLabel } from 'utils/status';

const verifyStory = (id, status) =>
  axios.post(`/api/stories/${id}/verify`, { status });
const approveStory = (id, status) =>
  axios.post(`/api/stories/${id}/approve`, { status });

const Actions = ({ id, status, onUpdate }) => {
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

  const handleVerification = (newStatus) => () => {
    if (canVerify(role)) {
      setVerification(id, newStatus);
    }
  };
  const handleApproval = (newStatus) => () => {
    if (canModerate(role)) {
      setApproval(id, newStatus);
    }
  };

  return (
    canVerify(role) && (
      <Dropdown alignRight>
        <Dropdown.Toggle as={Toggle} id={id}>
          <Icon name="ellipsis-h" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            eventKey="edit"
            onClick={() => {
              router.push('/a/stories/[id]', `/a/stories/${id}`);
            }}>
            Edit
          </Dropdown.Item>
          <Dropdown.Item
            eventKey={statuses.VERIFIED}
            disabled={[statuses.APPROVED, statuses.VERIFIED].includes(status)}
            onClick={handleVerification(statuses.VERIFIED)}>
            {getStatusLabel(statuses.VERIFIED)}
          </Dropdown.Item>
          {canModerate(role) && (
            <Dropdown.Item
              eventKey={statuses.APPROVED}
              disabled={[
                statuses.DISABLED,
                statuses.APPROVED,
                statuses.UNVERIFIED
              ].includes(status)}
              onClick={handleApproval(statuses.APPROVED)}>
              {getStatusLabel(statuses.APPROVED)}
            </Dropdown.Item>
          )}
          {canVerify(role) && (
            <>
              <Dropdown.Divider />
              <Dropdown.Item
                eventKey={statuses.UNVERIFIED}
                disabled={[statuses.DISABLED, statuses.UNVERIFIED].includes(
                  status
                )}
                onClick={handleVerification(statuses.UNVERIFIED)}>
                {getStatusLabel(statuses.UNVERIFIED)}
              </Dropdown.Item>
              {canModerate(role) && (
                <Dropdown.Item
                  eventKey={statuses.DISABLED}
                  disabled={status === statuses.DISABLED}
                  className={status !== statuses.DISABLED && 'text-danger'}
                  onClick={handleApproval(statuses.DISABLED)}>
                  {getStatusLabel(statuses.DISABLED)}
                </Dropdown.Item>
              )}
            </>
          )}
        </Dropdown.Menu>
      </Dropdown>
    )
  );
};

export default Actions;
