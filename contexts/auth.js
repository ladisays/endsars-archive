import { createContext, useMemo, useState, useEffect } from 'react';
import cookies from 'js-cookie';

import firebase from 'utils/firebase';

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
  role: undefined
});

export const AuthProvider = (props) => {
  const [state, setState] = useState({
    isAuthenticated: false,
    isAnonymous: false,
    user: null,
    role: null
  });
  const contextValue = useMemo(() => state, [state]);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      let role;
      if (user) {
        // set the uid to a cookie, to avoid multiple anonymous authentications
        cookies.set('esa_uid', user.uid);
        cookies.set('esa_r_token', user.refreshToken);
        // check the type of user.
        if (!user.isAnonymous) {
          try {
            const { claims } = await user.getIdTokenResult();
            role = claims.role;
          } catch (e) {
            console.error(e);
          }
        }
        setState({
          isAuthenticated: true,
          isAnonymous: user.isAnonymous,
          role,
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
