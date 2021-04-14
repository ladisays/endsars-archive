import { METHODS, methodNotAllowed } from 'utils/operations';
import connectDb from 'utils/db/connect';
import Story from 'utils/db/models/Story';

const handler = async (req, res) => {
  await connectDb();

  switch (req.method) {
    case METHODS.POST:
      try {
        const story = await Story.create(req.body);
        return res.status(201).json(story);
      } catch (err) {
        return res.status(500).json(err);
      }
    case METHODS.GET:
      try {
        const stories = await Story.find(req.query).sort('-createdAt');
        return res.status(200).json(stories);
      } catch (err) {
        return res.status(500).json(err);
      }
    default:
      return methodNotAllowed(res, [METHODS.POST, METHODS.GET]);
  }
};

export default handler;
