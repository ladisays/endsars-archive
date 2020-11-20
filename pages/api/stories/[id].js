import { METHODS, methodNotAllowed } from 'utils/operations';
import connectDb from 'utils/db/connect';
import Story from 'utils/db/models/Story';
import checkAuth from 'utils/auth-middleware';

const handler = async (req, res) => {
  const { id } = req.query;
  await connectDb();

  switch (req.method) {
    case METHODS.GET:
      try {
        const story = await Story.findById(id);
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
          const story = await Story.findByIdAndUpdate(id, req.body, {
            new: true
          });

          if (!story) {
            return res.status(400).json('Not found');
          }
          return res.status(201).json(story);
        }

        return res.status(403).json('Unauthorized');
      } catch (e) {
        console.log(e);
        return res.status(500).json(e);
      }
    default:
      return methodNotAllowed(res, [METHODS.PUT, METHODS.GET]);
  }
};

export default handler;
