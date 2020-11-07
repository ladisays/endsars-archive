import { createContext, useMemo, useState, useEffect } from 'react';
import cookies from 'js-cookie';

import firebase from 'utils/firebase';

const defaultRoles = {
  admin: false,
  verifier: false
};

const buildUser = ({
  uid,
  email,
  displayName,
  emailVerified,
  phoneNumber,
  photoURL,
  metadata
}) => ({
  uid,
  email,
  displayName,
  emailVerified,
  phoneNumber,
  photoURL,
  meta: { ...metadata }
});

const AuthContext = createContext({
  isAuthenticated: false,
  isAnonymous: false,
  user: null,
  roles: defaultRoles
});

export const AuthProvider = (props) => {
  const [state, setState] = useState({
    isAuthenticated: false,
    isAnonymous: false,
    user: null,
    roles: defaultRoles
  });
  const contextValue = useMemo(() => state, [state]);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      let roles = defaultRoles;
      if (user) {
        // set the uid to a cookie, to avoid multiple anonymous authentications
        cookies.set('esa_uid', user.uid);
        cookies.set('esa_r_token', user.refreshToken);
        // check the type of user.
        if (!user.isAnonymous) {
          try {
            const { claims } = await user.getIdTokenResult();
            const { admin, verifier } = claims;
            roles = { admin: admin || false, verifier: verifier || false };
          } catch (e) {
            console.error(e);
          }
        }
        setState({
          isAuthenticated: true,
          isAnonymous: user.isAnonymous,
          roles,
          user: buildUser(user)
        });
      } else {
        // sign in anonymously
        const cookie = cookies.get('esa_uid');

        if (!cookie) {
          await firebase.auth().signInAnonymously();
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={contextValue} {...props} />;
};

export default AuthContext;
