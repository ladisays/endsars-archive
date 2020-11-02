import {
  collections,
  getCollection,
  toArray,
  toJSON
} from 'utils/firebase/admin';
import Media from 'models/media';

const ref = getCollection(collections.images);

export const getImages = async (params = {}) => {
  let query = ref;
  const { storyId } = params;
  if (storyId) {
    query = query.where('storyId', '==', storyId);
  }
  const snap = await query.orderBy('createdAt').get();
  const images = toArray(snap);
  return images;
};

export const getImageById = async (id) => {
  if (!id) {
    throw new Error('An image identifier is required');
  }
  const image = await ref.doc(id).get();
  if (!image.exists) {
    return null;
  }
  return toJSON(image);
};

export const createImage = async (body) => {
  const image = new Media(body, 'image').toJSON();
  await ref.doc(image.id).set(image);
  return image;
};
