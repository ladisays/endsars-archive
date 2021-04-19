import { renderToStaticMarkup } from 'react-dom/server';

import Email from '../Email';

const getInvitationText = (link) => {
  if (link) {
    return `You have been invited to join the #ENDSARS Archived Team. Copy and paste the following link in your browser - ${link}`;
  }
  return '';
};
const InvitationMail = ({ link }) => {
  if (link) {
    return (
      <Email>
        <Email.Text>
          <h4>Invitation to join the #ENDSARS Archived Team</h4>
        </Email.Text>
        <Email.Text>
          You have been invited to join the <b>#ENDSARS Archived Team</b>. To
          get started, accept the invite below:
        </Email.Text>
        <Email.Text>
          <Email.Link block to={link}>
            Accept invite
          </Email.Link>
        </Email.Text>
        <Email.Text>
          Joining the team will give you access to the team&apos;s dashboard,
          including information about stories, locations and more.
        </Email.Text>
        <Email.Grid>
          <Email.Grid.Row>
            <Email.Grid.CellSpacer height={20} />
          </Email.Grid.Row>
        </Email.Grid>
        <Email.Text>Yours,</Email.Text>
        <Email.Text>The #ENDSARS Archived Team</Email.Text>
        <Email.Grid>
          <Email.Grid.Row>
            <Email.Grid.CellSpacer height={40} />
          </Email.Grid.Row>
        </Email.Grid>
      </Email>
    );
  }
  return '';
};

const Invitation = {
  getText(link) {
    return getInvitationText(link);
  },
  getHTML(link) {
    return renderToStaticMarkup(<InvitationMail link={link} />);
  }
};

export default Invitation;
