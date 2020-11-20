import { auth, getEmailSettings } from 'utils/firebase/admin';
import { METHODS, methodNotAllowed } from 'utils/operations';
import sendMail, { buildEmailLink } from 'utils/mailer';
import checkAuth, { isAdmin } from 'utils/auth-middleware';

const handlers = async (req, res) => {
  switch (req.method) {
    case METHODS.GET:
      await checkAuth(req, res);
      try {
        if (isAdmin(req.user)) {
          const result = await auth.listUsers();
          return res.status(200).json(result.users);
        }
        return res.status(403).json({ message: 'Unauthorized' });
      } catch (e) {
        return res.status(400).json(e);
      }
    case METHODS.POST:
      try {
        const { uid, email, re_auth, roles } = req.body;
        let userId = uid;

        if (!re_auth) {
          if (!userId) {
            await checkAuth(req, res);

            if (isAdmin(req.user)) {
              const user = await auth.createUser({
                email,
                emailVerified: false
              });
              userId = user.uid;
            } else {
              return res.status(403).json({ message: 'Unauthorized' });
            }
          }
          await auth.setCustomUserClaims(userId, roles);
        }

        const link = await auth.generateSignInWithEmailLink(
          email,
          getEmailSettings()
        );

        await sendMail(buildEmailLink(email, link));

        return res.status(201).json({ success: true });
      } catch (err) {
        console.error(err);
        return res.status(400).json(err);
      }
    default:
      return methodNotAllowed(res, [METHODS.POST, METHODS.GET]);
  }
};

export default handlers;
