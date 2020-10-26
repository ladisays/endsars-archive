import firebase from 'utils/firebase/admin';
import { METHODS, methodNotAllowed } from 'utils/operations';

const signup = async (req, res) => {
  switch (req.method) {
    case METHODS.POST:
      try {
        const roles = ['user'];
        const { email, password, displayName } = req.body;
        const user = await firebase.auth().createUser({
          email,
          password,
          displayName
        });

        // set user role in the claims
        await firebase.auth().setCustomUserClaims(user.uid, { roles });

        return res.status(201).json(user);
      } catch (err) {
        console.error(err);
        return res.status(400).json(err);
      }
    default:
      return methodNotAllowed(res, [METHODS.POST]);
  }
};

export default signup;
