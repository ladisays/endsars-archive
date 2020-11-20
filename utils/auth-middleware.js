import { auth } from './firebase/admin';

const checkAuth = async (req, res) => {
  const uid = req.cookies.esa_uid;

  if (!uid) {
    return res.status(401).json('Unauthenticated');
  }

  try {
    const user = await auth.getUser(uid);
    req.user = user;
    return user;
  } catch (e) {
    return res.status(400).json('Unable to retrieve credentials');
  }
};

export const isAdmin = (user) => !!user?.customClaims?.admin;
export const isVerifier = (user) => !!user?.customClaims?.verifier;
export const isAdminOrVerifier = (user) => isAdmin(user) || isVerifier(user);

export default checkAuth;
