import Grid, { GridText } from './Grid';

const Link = ({ to, block = false, children, style, ...props }) => {
  let styles = {
    border: 0,
    margin: 0,
    padding: 0,
    textDecoration: 'none',
    color: '#0CCA4A !important'
  };

  if (block) {
    styles.display = 'block';
    styles.backgroundColor = '#0CCA4A';
    styles.color = '#FFFFFF';
    styles.textAlign = 'center';
    styles.height = '40px';
    styles.lineHeight = '40px';
    styles.borderRadius = '5px';
    styles.fontWeight = 'bold';
    styles.fontSize = '16px';
  }

  if (style) {
    styles = { ...styles, ...style };
  }

  return (
    <a href={to} style={styles} target="_blank" rel="noreferrer" {...props}>
      {children}
    </a>
  );
};
const Header = () => (
  <Grid id="email-header">
    <Grid.Row>
      <Grid.CellSpacer height={20} span={4} />
    </Grid.Row>
    <Grid.Row>
      <Grid.CellSpacer width={64} />
      <Grid.Cell>
        <Email.Link
          to="https://www.endsarsarchived.com"
          style={{
            fontWeight: 'bold',
            lineHeight: '1',
            textAlign: 'left',
            textTransform: 'uppercase'
          }}
          target="_blank"
          rel="noreferrer">
          <span
            style={{
              color: '#e71d36 !important',
              fontSize: '16px'
            }}>
            #ENDSARS
          </span>
          &nbsp;
          <span style={{ fontSize: '14px', color: '#011627 !important' }}>
            Archived
          </span>
        </Email.Link>
      </Grid.Cell>
      <Grid.CellSpacer width={64} span={2} />
    </Grid.Row>
    <Grid.Row>
      <Grid.CellSpacer height={20} span={4} />
    </Grid.Row>
    <Grid.Row>
      <Grid.CellSpacer width={64} />
      <Grid.CellSpacer width={64} span={2} height={1} bgcolor="#e6ebf1" />
      <Grid.CellSpacer width={64} />
    </Grid.Row>
    <Grid.Row>
      <Grid.CellSpacer height={20} span={4} />
    </Grid.Row>
  </Grid>
);

const Footer = () => (
  <Grid id="email-footer">
    <Grid.Row>
      <Grid.Cell>Footer</Grid.Cell>
    </Grid.Row>
  </Grid>
);

const styles = {
  borderBottomLeftRadius: '5px',
  borderBottomRightRadius: '5px',
  margin: '0 auto',
  minWidth: '600px'
};

const Email = ({ children }) => (
  <div style={{ backgroundColor: '#F7F9FC', paddingBottom: '64px' }}>
    <Grid bgcolor="#FFFFFF" align="center" width={600} style={styles}>
      <Grid.Row>
        <Grid.Cell>
          <Header />
          <Grid id="email-body">
            <Grid.Row>
              <Grid.Cell>{children}</Grid.Cell>
            </Grid.Row>
          </Grid>
          {/* <Footer /> */}
        </Grid.Cell>
      </Grid.Row>
    </Grid>
  </div>
);

Email.Grid = Grid;
Email.Text = GridText;
Email.Link = Link;
Email.Footer = Footer;
Email.Header = Header;

export default Email;
