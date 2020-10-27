import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Nav from 'react-bootstrap/Nav';
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
  const { pathname } = useRouter();
  const [isOpen, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    handleClose();
  }, [pathname]);

  return (
    <div className={styles.root} data-expanded={isOpen}>
      <aside>
        <div className={styles.fixed}>
          <Nav className="flex-column">
            <div className={styles.toggle}>
              <button type="button" onClick={handleClose}>
                Close
              </button>
            </div>
            <NavLink activeClassName={styles.active} href="/">
              Home
            </NavLink>
            <NavLink activeClassName={styles.active} href="/cities">
              Cities
            </NavLink>
            <NavLink activeClassName={styles.active} href="/">
              Photos
            </NavLink>
            <NavLink activeClassName={styles.active} href="/">
              Videos
            </NavLink>
          </Nav>
        </div>
      </aside>
      <main>
        <div className={styles.toggle}>
          <button type="button" onClick={handleOpen}>
            Open
          </button>
        </div>
        <div className={styles.content}>
          <div className={styles.flow}>
            <Component {...pageProps} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AppRoot;
