import { METHODS, methodNotAllowed } from 'utils/operations';
import { getStoryById, updateStoryById } from 'lib/stories';

const handler = async (req, res) => {
  switch (req.method) {
    case METHODS.GET:
      try {
        const story = await getStoryById(req.query);
        return res.status(200).json(story);
      } catch (e) {
        return res.status(500).json(e);
      }
    case METHODS.PUT:
      try {
        const { id } = req.query;
        const story = await updateStoryById(id, req.body);
        return res.status(201).json(story);
      } catch (e) {
        return res.status(500).json(e);
      }
    default:
      return methodNotAllowed(res, [METHODS.PUT, METHODS.GET]);
  }
};

export default handler;
