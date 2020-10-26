import { METHODS, methodNotAllowed } from 'utils/operations';
import { getStories, createStory } from 'lib/stories';

const handler = async (req, res) => {
  switch (req.method) {
    case METHODS.POST:
      try {
        const story = await createStory(req.body);
        return res.status(201).json(story);
      } catch (err) {
        return res.status(500).json(err);
      }
    case METHODS.GET:
      try {
        const stories = await getStories(req.query);
        return res.status(200).json(stories);
      } catch (e) {
        return res.status(500).json(e);
      }
    default:
      return methodNotAllowed(res, [METHODS.POST, METHODS.GET]);
  }
};

export default handler;
