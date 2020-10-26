import { METHODS, methodNotAllowed } from 'utils/operations';
import { getStoryById } from 'lib/stories';

const handler = async (req, res) => {
  switch (req.method) {
    case METHODS.GET:
      try {
        const story = await getStoryById(req.query);
        return res.status(200).json(story);
      } catch (e) {
        return res.status(500).json(e);
      }
    default:
      return methodNotAllowed(res, [METHODS.PUT, METHODS.GET]);
  }
};

export default handler;
