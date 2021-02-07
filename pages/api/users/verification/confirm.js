import moment from 'moment';

import connectDb from 'utils/db/connect';
import { auth } from 'utils/firebase/admin';
import Token from 'utils/db/models/Token';
import { METHODS, methodNotAllowed } from 'utils/operations';

const handlers = async (req, res) => {
  await connectDb();

  switch (req.method) {
    case METHODS.POST:
      try {
        const { email, code } = req.body;

        if (email) {
          const user = await auth.getUserByEmail(email);

          if (user) {
            const token = await Token.findOne({
              uid: user.uid,
              code: code.toLowerCase()
            });

            if (token) {
              const today = moment();
              const dateOfExpiry = moment(token.createdAt).add(10, 'minutes');

              if (today.isSameOrBefore(dateOfExpiry)) {
                await Token.findByIdAndDelete(token.id);

                if (!user.disabled) {
                  if (!user.emailVerified) {
                    await auth.updateUser(user.uid, { emailVerified: true });
                  }
                  const authToken = await auth.createCustomToken(user.uid);
                  return res.status(200).json({ authToken });
                }
                return res.status(403).json({ success: false });
              }
              return res
                .status(403)
                .json({ success: false, message: 'Expired token' });
            }
            return res.status(400).json({ success: false });
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
