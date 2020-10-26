import {
  collections,
  getCollection,
  toArray,
  toJSON
} from 'utils/firebase/admin';
import Story from 'models/story';

const ref = getCollection(collections.stories);

export const getStories = async () => {
  const query = ref;
  const snap = await query.orderBy('createdAt').get();
  const stories = toArray(snap);
  return stories;
};

export const getStoryById = async (id) => {
  if (!id) {
    throw new Error('A story identifier is required');
  }
  const story = await ref.doc(id).get();
  if (!story.exists()) {
    return null;
  }
  return toJSON(story);
};

export const createStory = async (body) => {
  const story = new Story(body).toJSON();
  await ref.doc(story.id).set(story);
  return story;
};
