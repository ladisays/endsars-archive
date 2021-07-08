import moment from 'moment';

export const formats = {
  year: 'YYYY',
  month: {
    from: ['YYYY-MM'],
    to: 'MMM YYYY'
  },
  day: {
    from: ['YYYY-MM-DD'],
    to: 'ddd, DD MMM'
  }
};

export const yearMoment = (value, toFormat = false) => {
  const y = moment.utc(value, formats.year);

  return toFormat ? y.format(formats.year) : y;
};

export const monthMoment = (value, toFormat = false) => {
  const m = moment.utc(value, formats.month.from);

  return toFormat ? m.format(formats.month.to) : m;
};

export const dayMoment = (value, toFormat = false) => {
  const d = moment.utc(value, formats.day.from);

  return toFormat ? d.format(formats.day.to) : d;
};

export const daySortFn = (a, b) =>
  dayMoment(a.date).isAfter(dayMoment(b.date)) ? 1 : -1;

export const formattedYear = (year) => {
  if (!year) return undefined;

  const y = moment.utc([year]);
  return y.isValid() && y.format(formats.year);
};

export const formattedMonth = (year, month) => {
  if (!year || !month) return undefined;

  const m = moment.utc([year, month - 1]);
  return m.isValid() && m.format('MM');
};

export const formattedDay = (year, month, day) => {
  if (!year || !month || !day) return undefined;

  const d = moment.utc([year, month - 1, day]);
  return d.isValid() && d.format('DD');
};

export const formatEventDate = (eventDate, format = 'LL') => {
  const d = moment.utc(eventDate);
  const now = moment.utc();

  if (now.diff(d, 'days') < 7) {
    return d.fromNow();
  }
  return d.format(format);
};

export const buildDateRange = (range, year, month, day) => {
  if (range) {
    if (year) {
      range.$gte = moment.utc([year]).startOf('year').toDate();
      range.$lte = moment.utc([year]).endOf('year').toDate();
    }
    if (year && month) {
      range.$gte = moment
        .utc([year, month - 1])
        .startOf('month')
        .toDate();
      range.$lte = moment
        .utc([year, month - 1])
        .endOf('month')
        .toDate();
    }
    if (year && month && day) {
      range.$gte = moment
        .utc([year, month - 1, day])
        .startOf('day')
        .toDate();
      range.$lte = moment
        .utc([year, month - 1, day])
        .endOf('day')
        .toDate();
    }
  }
};

export const normalizeSlugs = (params = {}) => {
  const [year, month, day, citySlug, storySlug] = params.slugs || [];

  return {
    year: formattedYear(year),
    month: formattedMonth(year, month),
    day: formattedDay(year, month, day),
    citySlug,
    storySlug
  };
};

export const formatStoryLocation = (story) => {
  let result = '';

  if (story?.location) {
    result += story.location;
  }

  if (story?.city?.name) {
    result += `${result ? ' | ' : ''}${story.city.name}`;
  }

  if (story?.city?.country?.name) {
    result += `${result ? ', ' : ''}${story.city.country.name}`;
  }

  return result;
};
