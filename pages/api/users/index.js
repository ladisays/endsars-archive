import moment from 'moment';

import { auth, getEmailSettings } from 'utils/firebase/admin';
import { METHODS, methodNotAllowed } from 'utils/operations';
import sendMail, { buildEmailLink } from 'utils/mailer';
import checkAuth from 'utils/auth-middleware';
import { isAdmin, canView } from 'utils/roles';

const handlers = async (req, res) => {
  switch (req.method) {
    case METHODS.GET:
      await checkAuth(req, res);
      try {
        const { customClaims } = req.user;

        if (canView(customClaims?.role)) {
          const result = await auth.listUsers();
          const filtered = result.users.filter((u) => !!u.email);
          const sorted = filtered.sort((a, b) => {
            const a_time = moment(a.metadata.lastSignInTime, true);
            const b_time = moment(b.metadata.lastSignInTime, true);

            if (a_time.isBefore(b_time)) {
              return 1;
            }
            if (a_time.isAfter(b_time)) {
              return -1;
            }
            return 0;
          });
          return res.status(200).json(sorted);
        }
        return res.status(403).json({ message: 'Unauthorized' });
      } catch (e) {
        return res.status(400).json(e);
      }
    case METHODS.POST:
      try {
        const { uid, email, re_auth, role } = req.body;
        let userId = uid;

        if (!re_auth) {
          if (!userId) {
            await checkAuth(req, res);
            const { customClaims } = req.user;

            if (isAdmin(customClaims?.role)) {
              const user = await auth.createUser({
                email,
                emailVerified: false
              });
              userId = user.uid;
            } else {
              return res.status(403).json({ message: 'Unauthorized' });
            }
          }
          await auth.setCustomUserClaims(userId, { role: Number(role) });
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
