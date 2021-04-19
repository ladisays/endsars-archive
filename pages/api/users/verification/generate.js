import crypto from 'crypto';

import connectDb from 'utils/db/connect';
import sendMail, { buildVerificationMail } from 'utils/mail/sender';
import { auth, getEmailSettings } from 'utils/firebase/admin';
import Token from 'utils/db/models/Token';
import { METHODS, methodNotAllowed } from 'utils/operations';

const handlers = async (req, res) => {
  await connectDb();

  switch (req.method) {
    case METHODS.POST:
      try {
        const { email } = req.body;

        if (email) {
          const user = await auth.getUserByEmail(email);

          if (user) {
            const code = crypto.randomBytes(3).toString('hex');
            const token = await Token.create({ uid: user.uid, code });
            const link = await auth.generateSignInWithEmailLink(
              email,
              getEmailSettings()
            );
            await sendMail(buildVerificationMail(email, token.code, link));
            return res.status(200).json({ success: true });
          }
          return res.status(400).json({ success: false });
        }
        return res.status(400).json({ success: false });
      } catch (error) {
        return res.status(400).json({ success: false, error });
      }
    default:
      return methodNotAllowed(res, [METHODS.POST]);
  }
};

export default handlers;
