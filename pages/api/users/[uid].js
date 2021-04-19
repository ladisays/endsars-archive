import { auth, getEmailSettings } from 'utils/firebase/admin';
import { METHODS, methodNotAllowed } from 'utils/operations';
import sendMail, { buildInvitationMail } from 'utils/mail/sender';
import checkAuth from 'utils/auth-middleware';
import { isAdmin, roles } from 'utils/roles';

const handlers = async (req, res) => {
  const { uid } = req.query;
  switch (req.method) {
    case METHODS.POST:
      if (uid === 'first') {
        try {
          const { email } = req.body;
          const result = await auth.listUsers();
          const users = result.users.filter((user) =>
            isAdmin(user.customClaims?.role)
          );
          if (!users.length) {
            const user = await auth.createUser({ email, emailVerified: false });
            await auth.setCustomUserClaims(user.uid, {
              role: roles.ADMINISTRATOR
            });
            const link = await auth.generateSignInWithEmailLink(
              email,
              getEmailSettings()
            );
            await sendMail(buildInvitationMail(email, link));
            return res.status(201).json({ message: 'Success' });
          }
          return res.status(403).end();
        } catch (e) {
          console.error(e);
          return res.status(500).json(e);
        }
      }
      return res.end();
    case METHODS.PUT:
      await checkAuth(req, res);
      try {
        const { customClaims } = req.user;

        if (isAdmin(customClaims?.role)) {
          if (req.body.disabled) {
            await auth.setCustomUserClaims(uid, { role: undefined });
          }
          await auth.updateUser(uid, req.body);

          return res.status(201).json({ success: true });
        }
        return res.status(403).json('Unauthorized');
      } catch (err) {
        console.error(err);
        return res.status(400).json(err);
      }
    case METHODS.DELETE:
      await checkAuth(req, res);
      try {
        const { customClaims } = req.user;

        if (isAdmin(customClaims?.role)) {
          await auth.deleteUser(uid);
          return res.status(204).json({ success: true });
        }
        return res.status(403).json('Unauthorized');
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    default:
      return methodNotAllowed(res, [METHODS.PUT, METHODS.POST]);
  }
};

export default handlers;
