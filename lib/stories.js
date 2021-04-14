import {
  collections,
  getCollection,
  toArray,
  toJSON
} from 'utils/firebase/admin';
import Story from 'models/story';
import { createImage, getImages } from './images';
import { createVideo, getVideos } from './videos';

const ref = getCollection(collections.stories);

const addMedia = async (storyId, media = []) => {
  if (Array.isArray(media) && media.length) {
    const promises = media.map((source) => {
      if (source.type === 'video') {
        return createVideo({ ...source, storyId });
      }
      return createImage({ ...source, storyId });
    });

    const result = await Promise.all(promises);
    return result;
  }

  return [];
};

const getMedia = async (story) => {
  if (!story || !story.id) {
    throw new Error('A story identifier is required');
  }

  if (!story.hasMedia) return [];

  const params = { storyId: story.id };
  const [images, videos] = await Promise.all([
    getImages(params),
    getVideos(params)
  ]);
  return [].concat(images, videos);
};

export const getStories = async () => {
  // TODO: use "let" instead of "const" when there are params to filter by
  const query = ref;
  const snap = await query.orderBy('createdAt', 'desc').get();
  const $stories = toArray(snap);

  // TODO: refactor this implementation for media fetching
  const promises = $stories.map(async (story) => {
    if (story.hasMedia) {
      story.media = await getMedia(story);
    }
    return new Story(story).toJSON();
  });

  const stories = await Promise.all(promises);
  return stories;
};

export const getStoryById = async (id) => {
  if (!id) {
    throw new Error('A story identifier is required');
  }
  const $story = await ref.doc(id).get();
  if (!$story.exists) {
    return null;
  }
  const story = toJSON($story);
  story.media = await getMedia(story);
  return new Story(story).toJSON();
};

export const updateStoryById = async (id, values) => {
  if (!id) {
    throw new Error('A story identifier is required');
  }
  const res = await ref.doc(id).update({ ...values, updatedAt: Date.now() });
  return res;
};

export const createStory = async (body) => {
  const story = new Story(body).toJSON();
  let media = [];

  if (body.media) {
    media = await addMedia(story.id, body.media);
    story.hasMedia = !!media.length;
  }

  await ref.doc(story.id).set(story);
  return { ...story, media };
};
