import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { monthMoment, dayMoment, daySortFn, formats } from 'utils/timeline';
import { Link, NavLink } from 'components/Link';
import styles from './index.module.sass';

export const DayTitle = ({ date }) => (
  <div className={styles.dayTitle}>{dayMoment(date, true)}</div>
);
const DayItem = ({ date, cities = [] }) => {
  const formattedDate = dayMoment(date);
  const year = formattedDate.format('YYYY');
  const month = formattedDate.format('MM');
  const day = formattedDate.format('DD');
  const baseUrl = `/timeline/${year}/${month}/${day}`;

  return (
    <Row className={styles.dayItem}>
      <Col xs={12}>
        <DayTitle date={date} />
      </Col>
      <Col>
        <Row>
          {cities.map((city) => (
            <Col lg={3} key={city.id}>
              <Link className={styles.city} href={`${baseUrl}/${city.slug}`}>
                {city.name}
              </Link>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};
const MonthItem = ({ date, timeline = [] }) => {
  return (
    <Row>
      <Col xs={12}>
        <div className="font-weight-bold text-center py-3">
          {monthMoment(date, true)}
        </div>
      </Col>
      <Col>
        {timeline.sort(daySortFn).map((item) => (
          <DayItem key={item.date} {...item} />
        ))}
      </Col>
    </Row>
  );
};

export const Timeline = ({ dates = [] }) => {
  if (!Array.isArray(dates) || !dates.length) {
    return <div>Nothing is available yet. Please, try again later.</div>;
  }

  return (
    <div className={styles.root}>
      {dates.map((item) => (
        <MonthItem key={item.date} {...item} />
      ))}
    </div>
  );
};

export const TimelineBar = ({ months = [] }) => {
  return (
    <div className={styles.timelineBar}>
      <Nav variant="pills" className="flex-column">
        <div className={styles.barTitle}>Timeline</div>
        {months.map((item) => {
          const date = monthMoment(item.date);
          const year = date.format('YYYY');
          const month = date.format('MM');
          const url = `/timeline/${year}/${month}`;

          return (
            <NavLink className={styles.barItem} key={item.date} href={url}>
              {date.format(formats.month.to)}
            </NavLink>
          );
        })}
      </Nav>
    </div>
  );
};
