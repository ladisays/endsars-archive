import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';

import useAuth from 'hooks/useAuth';
import Login from 'components/Login';
import { NavLink } from 'components/Link';
import styles from './admin.module.sass';

const AdminLayout = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const { roles } = useAuth();

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  useEffect(() => {
    if (!roles.admin || !roles.verifier) {
      // prompt auth modal or redirect
    }
  }, [roles]);

  if (!mounted) {
    return null;
  }

  if (!roles.admin || !roles.verifier) {
    return <Login />;
  }

  return (
    <Container className={styles.root}>
      <Row>
        <Col xs={12} lg={3}>
          <Nav>
            <NavLink href="/a" activeClassName={styles.active}>
              Dashboard
            </NavLink>
            <NavLink href="/a/stories" activeClassName={styles.active}>
              Stories
            </NavLink>
            {roles.admin && (
              <NavLink href="/a/users" activeClassName={styles.active}>
                Users
              </NavLink>
            )}
          </Nav>
        </Col>
        <Col>{children}</Col>
      </Row>
    </Container>
  );
};

export const getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default AdminLayout;
