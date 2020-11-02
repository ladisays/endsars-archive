import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
// Start FontAwesome icon imports.
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
// End FontAwesome icon imports.

import { NavLink } from 'components/Link';
import 'styles/globals.sass';
import styles from 'styles/app.module.sass';

// Add all fontawesome icons to the library for use.
config.autoAddCss = false;
library.add(fas, far);

const AppRoot = ({ Component, pageProps }) => {
  return (
    <div className={styles.root}>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand as={NavLink} href="/">
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
              <NavLink activeClassName={styles.active} href="/media">
                Media
              </NavLink>
              <NavLink activeClassName={styles.active} href="/sars-sightings">
                SARS Sightings
              </NavLink>
              <NavLink activeClassName={styles.active} href="/contact">
                Contact
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main>
        <div className={styles.content}>
          <Component {...pageProps} />
        </div>
      </main>
    </div>
  );
};

export default AppRoot;
