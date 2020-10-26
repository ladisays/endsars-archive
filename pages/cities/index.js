import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
// import Spinner from 'react-bootstrap/Spinner';
// import { useRouter } from 'next/router';

import { NavLink } from 'components/Link';
import { getCities } from 'lib/cities';

// export const getStaticPaths = async () => ({
//   paths: [],
//   fallback: true
// });

export const getStaticProps = async ({ params }) => {
  let cities = [];
  let error = null;

  try {
    cities = await getCities(params);
  } catch (err) {
    console.log(err);
    error = err;
  }

  return {
    props: { cities, error },
    revalidate: 1
  };
};

const Cities = ({ cities, error }) => {
  return (
    <Container>
      <Row>
        <Col>
          <Nav>
            <NavLink href="/stories/new">Create a story</NavLink>
            <NavLink href="/cities">Cities</NavLink>
          </Nav>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <NavLink href="/cities/new">Add city</NavLink>
        </Col>
        <Col xs={12}>
          {error && <div>An error occured! Please try again later!</div>}
          {cities.map((city) => (
            <div key={city.id}>{city.name}</div>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Cities;
