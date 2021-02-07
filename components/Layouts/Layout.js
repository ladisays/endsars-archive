import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { Link, NavLink } from 'components/Link';
import useAuth from 'hooks/useAuth';
import { canView } from 'utils/roles';
import styles from './layout.module.sass';

const Layout = ({ children }) => {
  const { role, isAnonymous } = useAuth();

  return (
    <>
      <div className={styles.root}>
        <Navbar expand="lg">
          <Container>
            <Navbar.Brand as={NavLink} href="/" className={styles.brand}>
              <span>#End</span>
              <span>SARS</span>
              <span>Archived</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="nav" />
            <Navbar.Collapse id="nav">
              <Nav className="ml-auto">
                <NavLink exact activeClassName={styles.active} href="/">
                  Home
                </NavLink>
                <NavLink activeClassName={styles.active} href="/timeline">
                  Timeline
                </NavLink>
                {isAnonymous && (
                  <NavLink activeClassName={styles.active} href="/auth/login">
                    Login
                  </NavLink>
                )}
                {canView(role) && (
                  <NavLink
                    exact
                    activeClassName={styles.active}
                    href="/a/stories">
                    Admin
                  </NavLink>
                )}
              </Nav>
              <Nav className="ml-lg-3">
                <Button as={Link} href="/new">
                  Share your story
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <main>
          <div className={styles.content}>{children}</div>
        </main>
      </div>
    </>
  );
};

export default Layout;
