import {
  collections,
  getCollection,
  toArray,
  toJSON
} from 'utils/firebase/admin';
import City from 'models/city';

const ref = getCollection(collections.cities);

export const getCities = async (params = {}) => {
  const query = ref;
  const { slug } = params;
  if (slug) {
    query.where('slug', '==', slug);
  }
  const snap = await query.orderBy('name').get();
  return toArray(snap);
};

export const getCityById = async (id) => {
  if (!id) {
    throw new Error('A city identifier is required');
  }
  const city = await ref.doc(id).get();
  if (!city.exists()) {
    return null;
  }
  return toJSON(city);
};

export const createCity = async (body) => {
  const city = new City(body).toJSON();
  await ref.doc(city.id).set(city);
  return city;
};
