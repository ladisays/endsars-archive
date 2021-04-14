import Container from 'react-bootstrap/Container';

import { NavLink } from 'components/Link';
import styles from './footer.module.sass';

const Footer = () => (
  <footer className={styles.root}>
    <Container>
      <ul>
        <li className="mr-auto">
          <NavLink href="/" className={styles.brand}>
            <span>#End</span>
            <span>SARS</span>
            <span>Archived</span>
          </NavLink>
        </li>
        <li>
          <NavLink exact activeClassName={styles.active} href="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName={styles.active} href="/timeline">
            Timeline
          </NavLink>
        </li>
      </ul>
    </Container>
  </footer>
);

export default Footer;
