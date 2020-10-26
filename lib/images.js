import {
  collections,
  getCollection,
  toArray,
  toJSON
} from 'utils/firebase/admin';
import Image from 'models/image';

const ref = getCollection(collections.images);

export const getImages = async () => {
  const query = ref;
  const snap = await query.orderBy('createdAt').get();
  const images = toArray(snap);
  return images;
};

export const getImageById = async (id) => {
  if (!id) {
    throw new Error('An image identifier is required');
  }
  const image = await ref.doc(id).get();
  if (!image.exists()) {
    return null;
  }
  return toJSON(image);
};

export const createImage = async (body) => {
  const image = new Image(body).toJSON();
  await ref.doc(image.id).set(image);
  return image;
};
