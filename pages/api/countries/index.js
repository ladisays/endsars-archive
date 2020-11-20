import { METHODS, methodNotAllowed } from 'utils/operations';
import connectDb from 'utils/db/connect';
import Country from 'utils/db/models/Country';
import checkAuth from 'utils/auth-middleware';

const handler = async (req, res) => {
  await connectDb();

  switch (req.method) {
    case METHODS.POST:
      await checkAuth(req, res);
      try {
        const country = await Country.create(req.body);
        return res.status(201).json(country);
      } catch (err) {
        return res.status(500).json(err);
      }
    case METHODS.GET:
      try {
        const countries = await Country.find(req.query);
        return res.status(200).json(countries);
      } catch (err) {
        return res.status(500).json(err);
      }
    default:
      return methodNotAllowed(res, [METHODS.POST, METHODS.GET]);
  }
};

export default handler;
