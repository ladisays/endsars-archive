import { METHODS, methodNotAllowed } from 'utils/operations';
import connectDb from 'utils/db/connect';
import City from 'utils/db/models/City';
import checkAuth from 'utils/auth-middleware';
import { canVerify } from 'utils/roles';

const handler = async (req, res) => {
  await connectDb();

  switch (req.method) {
    case METHODS.POST:
      await checkAuth(req, res);
      try {
        const { customClaims } = req.user;

        if (canVerify(customClaims?.role)) {
          const city = await City.create(req.body);
          return res.status(201).json(city);
        }
        return res.status(403).json('Unauthorized');
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    case METHODS.GET:
      try {
        const cities = await City.find(req.query)
          .populate('country', '_id name slug')
          .sort('-createdAt');
        return res.status(200).json(cities);
      } catch (err) {
        console.log('error - ', err);
        return res.status(500).json(err);
      }
    default:
      return methodNotAllowed(res, [METHODS.POST, METHODS.GET]);
  }
};

export default handler;
