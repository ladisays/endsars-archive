import { METHODS, methodNotAllowed } from 'utils/operations';
import { getCityById } from 'lib/cities';

const handler = async (req, res) => {
  switch (req.method) {
    case METHODS.GET:
      try {
        const city = await getCityById(req.query);
        return res.status(200).json(city);
      } catch (e) {
        return res.status(500).json(e);
      }
    default:
      return methodNotAllowed(res, [METHODS.PUT, METHODS.GET]);
  }
};

export default handler;
