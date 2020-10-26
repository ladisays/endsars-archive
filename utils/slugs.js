import { v4 } from 'uuid';
import slug from 'slug';

const slugOptions = {
  symbols: false, // replace unicode symbols or not
  remove: null, // (optional) regex to remove characters
  lower: true // result in lower case
};

export const cleanSlug = (value = '') => slug(value, slugOptions);
export const generateId = (prefix) => `${prefix}_${v4()}`;
