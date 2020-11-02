import {
  collections,
  getCollection,
  toArray,
  toJSON
} from 'utils/firebase/admin';
import Media from 'models/media';

const ref = getCollection(collections.videos);

export const getVideos = async (params = {}) => {
  let query = ref;
  const { storyId } = params;
  if (storyId) {
    query = query.where('storyId', '==', storyId);
  }
  const snap = await query.orderBy('createdAt').get();
  const videos = toArray(snap);
  return videos;
};

export const getVideoById = async (id) => {
  if (!id) {
    throw new Error('A video identifier is required');
  }
  const video = await ref.doc(id).get();
  if (!video.exists) {
    return null;
  }
  return toJSON(video);
};

export const createVideo = async (body) => {
  const video = new Media(body, 'video').toJSON();
  await ref.doc(video.id).set(video);
  return video;
};
