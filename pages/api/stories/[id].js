import { METHODS, methodNotAllowed } from 'utils/operations';
import { getStoryById, updateStoryById } from 'lib/stories';
import checkAuth from 'utils/auth-middleware';

const handler = async (req, res) => {
  switch (req.method) {
    case METHODS.GET:
      try {
        const story = await getStoryById(req.query.id);
        return res.status(200).json(story);
      } catch (e) {
        console.log(e);
        return res.status(500).json(e);
      }
    case METHODS.PUT:
      await checkAuth(req, res);
      try {
        const { user } = req;

        if (user.customClaims.admin || user.customClaims.verifier) {
          const { id } = req.query;
          const story = await updateStoryById(id, req.body);
          return res.status(201).json(story);
        }

        return res.status(401).json({ message: 'Unauthorized' });
      } catch (e) {
        console.log(e);
        return res.status(500).json(e);
      }
    default:
      return methodNotAllowed(res, [METHODS.PUT, METHODS.GET]);
  }
};

export default handler;
