import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

import { NavLink } from 'components/Link';
import useAuth from 'hooks/useAuth';
import styles from './layout.module.sass';

const Layout = ({ children }) => {
  const { roles, isAnonymous } = useAuth();

  return (
    <div className={styles.root}>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand as={NavLink} href="/" className={styles.brand}>
            <span>#End</span>
            <span>Police</span>
            <span>Brutality</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="nav" />
          <Navbar.Collapse id="nav">
            <Nav className="ml-auto">
              <NavLink activeClassName={styles.active} href="/">
                Home
              </NavLink>
              {isAnonymous && (
                <NavLink activeClassName={styles.active} href="/login">
                  Login
                </NavLink>
              )}
              {(roles.admin || roles.verifier) && (
                <NavLink activeClassName={styles.active} href="/a">
                  Dashboard
                </NavLink>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main>
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  );
};

export default Layout;
