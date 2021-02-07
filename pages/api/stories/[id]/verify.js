import { METHODS, methodNotAllowed } from 'utils/operations';
import connectDb from 'utils/db/connect';
import Story from 'utils/db/models/Story';
import checkAuth from 'utils/auth-middleware';
import { canVerify } from 'utils/roles';
import { statuses } from 'utils/status';

const handler = async (req, res) => {
  const { id } = req.query;
  await connectDb();

  switch (req.method) {
    case METHODS.POST:
      await checkAuth(req, res);
      try {
        const { customClaims } = req.user;
        const { status } = req.body;

        if (
          canVerify(customClaims?.role) &&
          (status === statuses.UNVERIFIED || status === statuses.VERIFIED)
        ) {
          const story = await Story.findByIdAndUpdate(
            id,
            { status },
            { new: true }
          );

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
      return methodNotAllowed(res, [METHODS.POST]);
  }
};

export default handler;
