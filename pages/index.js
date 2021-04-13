import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import Meta from 'components/Layouts/Meta';
import { Link } from 'components/Link';
import styles from 'styles/pages/home.module.sass';

const Section = ({ children, ...props }) => {
  return (
    <section {...props}>
      <Container>
        <Row>
          <Col lg={9}>{children}</Col>
        </Row>
      </Container>
    </section>
  );
};

const Home = () => {
  return (
    <div className={styles.root}>
      <Meta />
      <div className={styles.hero}>
        <div className={styles.overlay} />
        <Container>
          <Row>
            <Col className={styles.heroContent}>
              <h1>
                Help End Police <br /> Brutality in Nigeria!
              </h1>
              <div className="mb-3">
                Share your story about police brutality in Nigeria. <br /> Help
                keep documentation by sharing your photos <br /> or videos from
                what has been going on.
              </div>
              <p>
                <Button size="lg" as={Link} href="/new">
                  Share your story
                </Button>
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      <Section className={styles.section}>
        <div>
          <h2>The #ENDSARS Protests</h2>
          <div className={styles.subsection}>
            <small>What is SARS?</small>
            <p>
              Originally established in the 90s, The Special Anti-Robbery Squad
              (SARS) was created by the Nigerian government to combat high rates
              of armed robberies and to deal with issues regarding cyber crimes
              and fraud.
            </p>
          </div>
          <div className={styles.subsection}>
            <small>The #ENDSARS Movement</small>
            <p>
              Armed and often plain clothed, the covert force has established a
              notoriety for harassing, extorting, assaulting, detaining, and
              killing citizens based off the whim of the officers. They target
              youth in possession of smartphones, laptops, any item they deem
              luxury and above the victim’s paygrade, people with dreadlocks,
              tattoos, anyone perceived to have a non-conforming identity. Based
              on the accounts of 44 civilians who had been subjected to cruelty
              and unlawful detention by SARS officials, a 2016 investigation by
              Amnesty International concluded that despite significant evidence
              of human rights violations., SARS official are not held
              accountable.
            </p>
            <p>
              Since 2017, utilising the hashtag #ENDSARS, Nigerians took their
              complaints and documentations of SARS violation to the internet
              and the streets to demand accountability and reform of SARS. On
              October 3rd 2020, the momentum of the movement gained a large
              following when a recording showing a young man being shot at by
              SARS officers in Delta State went viral. Since then, more videos,
              photographs and written accounts of police brutality have been
              unveiled. Consequentially, protests began on October 4th and have
              been taking place all over the country and internationally.
            </p>
          </div>
          <div className={styles.subsection}>
            <small>The Demands</small>
            <p>
              Between 2017 and 2019, the government has announced the
              ‘reorganization’, disbandment’, ‘dissolving’ and ‘overhaul’ of the
              unit. These yearly announcements have not been followed up with
              action, as the unit continues to operate and perpetuate human
              rights violation with no consequences. On October 22nd, Nigeria’s
              president Muhammadu Buhari announced once again, that SARS had
              been disbanded. However, within the week of the announcement
              alone, citizens documented ongoing activities of SARS officers and
              continued brutality.
            </p>
            <p>
              Nigerian youth have primarily demanded that the government put
              their announcements to action, and have set forth five demands:
            </p>
            <ul>
              <li>The release of arrested protesters</li>
              <li>Justice and compensation for families of victims</li>
              <li>Independent body to oversee prosecution of officers</li>
              <li>
                Psychological evaluation of disbanded officers before
                redeployment
              </li>
              <li>Increase of police salaries</li>
            </ul>
            <p>These demands have yet to be met in their entirety</p>
          </div>
        </div>
      </Section>
      <Section id="about" className={styles.section}>
        <div>
          <h2>About Us</h2>
          <p>
            The #EndSars Public Archive is a non-profit collaborative endeavor
            between various, individuals, groups and organizations, to provide
            public records and accounts of the #EndSARS movement; a social
            movement revived in October 2020 against police brutality by a
            Nigerian Police Force unit known as the Special Anti Robbery Squad
            (SARS).
          </p>
          <p>
            The public archive strives to provide uncompromised fact based
            documentation of the movement by crowd sourcing media and fact
            checking sources. The multimedia platform aims to amplify factual
            evidence in order to preserve events so that they are accurately
            remembered.
          </p>
          <p>
            The mission is supported by teams from Griot Studios,
            EndSarsArchived, SoroSoke Archives, and countless others.
            Independent sources have also submitted videos, pictures, tweets,
            and messages that have gone into putting this platform together.
          </p>
          <p>
            The website and the aforementioned groups neither represent,
            control, nor speak for the #ENDSARS movement and the Nigerian Youth.
          </p>
        </div>
      </Section>
    </div>
  );
};

export default Home;
