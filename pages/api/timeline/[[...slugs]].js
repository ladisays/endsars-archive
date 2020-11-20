import { METHODS, methodNotAllowed } from 'utils/operations';
import { normalizeSlugs, buildDateRange } from 'utils/timeline';
import connectDb from 'utils/db/connect';
import Story from 'utils/db/models/Story';
import City from 'utils/db/models/City';

const handler = async (req, res) => {
  await connectDb();

  switch (req.method) {
    case METHODS.GET:
      try {
        let dates = [];
        let months = [];
        let city = null;
        let story = null;
        let error = null;
        let stories = [];
        const { year, month, day, citySlug, storySlug } = normalizeSlugs(
          req.query
        );
        const query = { verified: true };

        const $months = Story.getMonths({ ...query });
        const promises = [$months];

        if (!req.query.slugs) {
          const $timeline = Story.getTimeline({ ...query });
          promises.push($timeline);
        } else {
          const eventDate = {};

          if (year) {
            buildDateRange(eventDate, year);
            if (month) {
              buildDateRange(eventDate, year, month);
              if (day) {
                buildDateRange(eventDate, year, month, day);
              } else if (day === false) {
                error = new Error('Invalid date');
              }
            } else if (month === false) {
              error = new Error('Invalid month');
            }
          } else {
            error = new Error('Invalid year');
          }

          query.eventDate = eventDate;
          const $timeline = Story.getTimeline(query);
          promises.push($timeline);

          if (year && month && day && citySlug) {
            try {
              city = await City.findOne({ slug: citySlug }, '_id');

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
                const $stories = Story.find({
                  ...query,
                  city: city.id
                }).populate(populate);
                promises.push($stories);

                if (storySlug) {
                  const $story = Story.findOne({ slug: storySlug }).populate(
                    populate
                  );
                  promises.push($story);
                }
              } else {
                error = new Error('No location for this date');
              }
            } catch (e) {
              error = e;
            }
          }
        }

        const results = await Promise.all(promises);
        [months, dates, stories, story] = results;

        const response = { months, dates };

        if (citySlug) {
          response.stories = stories || null;
          if (storySlug) {
            response.story = story || null;
          }
        }

        response.error = error;

        return res.status(200).json(response);
      } catch (err) {
        return res.status(500).json(err);
      }
    default:
      return methodNotAllowed(res, [METHODS.GET]);
  }
};

export default handler;
