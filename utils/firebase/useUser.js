import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import cookies from 'js-cookie';

import firebase, { initFirebase } from '.';

initFirebase();

const useUser = () => {
  const [user, setUser] = useState();
  const router = useRouter();

  const logout = async () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        // log out successful.
        cookies.remove('esa_auth');
        router.push('/');
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    const cookie = cookies.get('esa_auth');

    if (!cookie) {
      router.push('/');
      return;
    }

    setUser(JSON.parse(cookie));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { user, logout };
};

export default useUser;
