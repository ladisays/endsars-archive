import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';

import useAuth from 'hooks/useAuth';
import Login from 'components/Login';
import { NavLink } from 'components/Link';
import { canVerify, canView } from 'utils/roles';
import styles from './admin.module.sass';

const AdminLayout = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const { role, isAnonymous } = useAuth();

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  useEffect(() => {
    if (!canVerify(role)) {
      // prompt auth modal or redirect
    }
  }, [role]);

  if (mounted && canView(role)) {
    return (
      <Container className={styles.root}>
        <Row>
          <Col xs={12} lg={3}>
            <Nav className={styles.nav}>
              <NavLink href="/a/stories" activeClassName={styles.active}>
                Stories
              </NavLink>
              <NavLink href="/a/cities" activeClassName={styles.active}>
                Cities
              </NavLink>
              <NavLink href="/a/countries" activeClassName={styles.active}>
                Countries
              </NavLink>
              <NavLink href="/a/users" activeClassName={styles.active}>
                Users
              </NavLink>
            </Nav>
          </Col>
          <Col lg={9}>{children}</Col>
        </Row>
      </Container>
    );
  }

  if (mounted && isAnonymous) {
    return <Login />;
  }

  return null;
};

export const getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default AdminLayout;
