import { auth } from './firebase/admin';

const checkAuth = async (req, res) => {
  const uid = req.cookies.esa_uid;

  if (!uid) {
    return res.status(401).end();
  }

  try {
    const user = await auth.getUser(uid);
    req.user = user;
    return user;
  } catch (e) {
    return res.status(404).end();
  }
};

export default checkAuth;
