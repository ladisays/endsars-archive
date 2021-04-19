import { renderToStaticMarkup } from 'react-dom/server';

import Email from '../Email';

export const getVerificationText = (code, link) => {
  if (code && link) {
    return `Your verification code is - ${code}\nYou can also sign in with this link - ${link}`;
  }
  return '';
};

export const VerificationMail = ({ code, link }) => {
  if (code && link) {
    return (
      <Email>
        <Email.Text>
          <h4>Your Verification Code</h4>
        </Email.Text>
        <Email.Text>
          You have requested a verification code for a sign-in attempt. Here is
          your verification code:
        </Email.Text>
        <Email.Text>
          <code
            style={{
              fontWeight: 'bolder',
              fontSize: '32px',
              fontFamily:
                'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
              color: '#E83E8C'
            }}>
            {code.toUpperCase()}
          </code>
        </Email.Text>
        <Email.Text>
          This code expires in 10 minutes and can only be used once.
        </Email.Text>
        <Email.Grid>
          <Email.Grid.Row>
            <Email.Grid.CellSpacer height={40} />
          </Email.Grid.Row>
        </Email.Grid>
        <Email.Text>
          <h4>Try instant sign-in on this device</h4>
          Use the button below to access your account.
        </Email.Text>
        <Email.Text>
          <Email.Link block to={link}>
            Sign In
          </Email.Link>
        </Email.Text>
        <Email.Text>
          This link expires in 1 hour and can only be used once.
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

const Verification = {
  getText(code, link) {
    return getVerificationText(code, link);
  },
  getHTML(code, link) {
    return renderToStaticMarkup(<VerificationMail code={code} link={link} />);
  }
};

export default Verification;
