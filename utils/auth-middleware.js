import { auth } from './firebase/admin';

export const userRoles = [
  { id: 1, label: 'Viewer', value: 1 },
  { id: 2, label: 'Verifier', value: 2 },
  { id: 3, label: 'Moderator', value: 3 },
  { id: 4, label: 'Administrator', value: 4 }
];

export const roles = {
  VIEWER: 1,
  VERIFIER: 2,
  MODERATOR: 3,
  ADMINISTRATOR: 4
};

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

export const isAdmin = (user) =>
  user?.customClaims?.role === roles.ADMINISTRATOR;
export const isModerator = (user) =>
  user?.customClaims?.role === roles.MODERATOR;
export const isVerifier = (user) => user?.customClaims?.role === roles.VERIFIER;
export const isViewer = (user) => user?.customClaims?.role === roles.VERIFIER;
export const isAdminOrVerifier = (user) => isAdmin(user) || isVerifier(user);
export const isModeratorOrVerifier = (user) =>
  isModerator(user) || isVerifier(user);

export default checkAuth;
