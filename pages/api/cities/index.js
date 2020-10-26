import { METHODS, methodNotAllowed } from 'utils/operations';
import { getCities, createCity } from 'lib/cities';

const handler = async (req, res) => {
  switch (req.method) {
    case METHODS.POST:
      try {
        const city = await createCity(req.body);
        return res.status(201).json(city);
      } catch (err) {
        return res.status(500).json(err);
      }
    case METHODS.GET:
      try {
        const cities = await getCities(req.query);
        return res.status(200).json(cities);
      } catch (e) {
        return res.status(500).json(e);
      }
    default:
      return methodNotAllowed(res, [METHODS.POST, METHODS.GET]);
  }
};

export default handler;
