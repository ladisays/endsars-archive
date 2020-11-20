import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useRouter } from 'next/router';

import connectDb from 'utils/db/connect';
import Story from 'utils/db/models/Story';
import City from 'utils/db/models/City';
import { normalizeSlugs, buildDateRange } from 'utils/timeline';
import { StoriesProvider } from 'hooks/useStories';
import { StoryList, StoryListTitle, StoryModal } from 'components/Stories';
import { Timeline, TimelineBar } from 'components/Timeline';
import Loading from 'components/Loading';

export const getStaticPaths = async () => ({ paths: [], fallback: 'blocking' });

export const getStaticProps = async ({ params }) => {
  await connectDb();
  let months = null;
  let dates = null;
  let story = null;
  let stories = null;
  let error = null;
  let notFound = false;
  const { year, month, day, citySlug, storySlug } = normalizeSlugs(params);
  const query = { verified: true };

  const $months = Story.getMonths({ ...query });
  const promises = [$months];

  if (!params.slugs) {
    const $timeline = Story.getTimeline({ ...query });
    promises.push($timeline);
  } else {
    const eventDate = {};
    console.log(year);

    if (year) {
      buildDateRange(eventDate, year);
      if (month) {
        buildDateRange(eventDate, year, month);
        if (day) {
          buildDateRange(eventDate, year, month, day);
        } else if (day === false) {
          error = new Error('Invalid date');
          notFound = true;
        }
      } else if (month === false) {
        error = new Error('Invalid month');
        notFound = true;
      }
    } else {
      error = new Error('Invalid year');
      notFound = true;
    }

    query.eventDate = eventDate;
    const $timeline = Story.getTimeline(query);
    promises.push($timeline);

    if (year && month && day && citySlug) {
      try {
        let city = await City.findOne({ slug: citySlug }, 'name slug');

        if (city) {
          city = city.toJSON();
          const populate = {
            path: 'city',
            select: 'name slug',
            populate: {
              path: 'country',
              select: 'name slug'
            }
          };
          const $stories = Story.find({ ...query, city: city.id }).populate(
            populate
          );
          promises.push($stories);

          if (storySlug) {
            const $story = Story.findOne({ slug: storySlug }).populate(
              populate
            );
            promises.push($story);
          }
        } else {
          error = new Error('No location for this date');
          notFound = true;
        }
      } catch (e) {
        error = e;
      }
    }
  }

  try {
    const responses = await Promise.all(promises);
    [months, dates, stories, story] = responses;
  } catch (e) {
    error = e;
  }

  const props = { months, dates };

  if (year && month && day && citySlug) {
    props.stories = (stories && stories.map((s) => s.toJSON())) || null;

    if (storySlug) {
      props.story = (story && story.toJSON()) || null;
    }
  }

  props.error = error;

  return {
    props,
    revalidate: 1,
    notFound
  };
};

const TimelinePage = ({ error, months, dates, stories, story }) => {
  const { isFallback, query } = useRouter();
  const { year, month, day, citySlug, storySlug } = normalizeSlugs(query);
  console.log(year, month, day, citySlug, storySlug);

  if (error) {
    return <div> An error occurred!</div>;
  }

  if (isFallback) {
    return <Loading />;
  }

  return (
    <Container>
      {/* <Meta title={story.title} description={story.text} /> */}
      <Row>
        <Col lg={3}>
          <TimelineBar months={months} dates={dates} />
        </Col>
        <Col lg={9}>
          {citySlug ? (
            <StoriesProvider stories={stories}>
              <StoryListTitle dates={dates} />
              <StoryList error={error} />
              {storySlug && <StoryModal {...story} />}
            </StoriesProvider>
          ) : (
            <Timeline dates={dates} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default TimelinePage;
