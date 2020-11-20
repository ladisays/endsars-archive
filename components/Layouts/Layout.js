import { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { Link, NavLink } from 'components/Link';
import Login from 'components/Login';
import useAuth from 'hooks/useAuth';
import styles from './layout.module.sass';

const Layout = ({ children }) => {
  const [show, setShow] = useState(false);
  const { roles, isAnonymous } = useAuth();

  return (
    <>
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
                <NavLink exact activeClassName={styles.active} href="/">
                  Home
                </NavLink>
                <NavLink activeClassName={styles.active} href="/timeline">
                  Timeline
                </NavLink>
                {isAnonymous && (
                  <NavLink
                    activeClassName={styles.active}
                    href="/"
                    onClick={() => setShow(true)}>
                    Login
                  </NavLink>
                )}
                {(roles.admin || roles.verifier) && (
                  <NavLink exact activeClassName={styles.active} href="/a">
                    Dashboard
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
      {show && isAnonymous && <Login />}
    </>
  );
};

export default Layout;
