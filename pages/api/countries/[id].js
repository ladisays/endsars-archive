import { METHODS, methodNotAllowed } from 'utils/operations';
import connectDb from 'utils/db/connect';
import Country from 'utils/db/models/Country';
import checkAuth from 'utils/auth-middleware';

const handler = async (req, res) => {
  const { id } = req.query;
  await connectDb();

  switch (req.method) {
    case METHODS.GET:
      try {
        const country = await Country.findById(id);
        if (!country) {
          return res.status(400).json({ success: false });
        }
        return res.status(200).json(country);
      } catch (err) {
        return res.status(500).json(err);
      }
    case METHODS.PUT:
      await checkAuth(req, res);
      try {
        const country = await Country.findByIdAndUpdate(id, req.body, {
          new: true
        });
        if (!country) {
          return res.status(400).json({ success: false });
        }
        return res.status(201).json(country);
      } catch (err) {
        return res.status(500).json(err);
      }
    default:
      return methodNotAllowed(res, [METHODS.PUT, METHODS.GET]);
  }
};

export default handler;
