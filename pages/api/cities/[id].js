import { METHODS, methodNotAllowed } from 'utils/operations';
import connectDb from 'utils/db/connect';
import City from 'utils/db/models/City';
import checkAuth from 'utils/auth-middleware';

const handler = async (req, res) => {
  const { id } = req.query;
  await connectDb();

  switch (req.method) {
    case METHODS.GET:
      try {
        const city = await City.findById(id);
        if (!city) {
          return res.status(400).json('Not found');
        }
        return res.status(200).json(city);
      } catch (err) {
        return res.status(500).json(err);
      }
    case METHODS.PUT:
      await checkAuth(req, res);
      try {
        const city = await City.findByIdAndUpdate(id, req.body, {
          new: true
        });
        if (!city) {
          return res.status(400).json('Not found');
        }
        return res.status(201).json(city);
      } catch (err) {
        return res.status(500).json(err);
      }
    default:
      return methodNotAllowed(res, [METHODS.PUT, METHODS.GET]);
  }
};

export default handler;
