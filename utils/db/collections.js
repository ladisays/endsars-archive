export const stories = {
  model: 'Story',
  collection: 'stories'
};

export const cities = {
  model: 'City',
  collection: 'cities'
};

export const countries = {
  model: 'Country',
  collection: 'countries'
};

export const tokens = {
  model: 'Token',
  collection: 'tokens'
};

export const toJSONDate = (doc, keys) => {
  if (!doc) {
    return;
  }

  if (Array.isArray(keys)) {
    keys.forEach((key) => {
      if (doc[key]) {
        doc[key] = doc[key].toJSON();
      }
    });
  } else if (typeof keys === 'string' && doc[keys]) {
    doc[keys] = doc[keys].toJSON();
  }
};
