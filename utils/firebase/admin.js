import * as firebase from 'firebase-admin';
import { format } from 'util';

const privateKey = process.env.FIREBASE_PRIVATE_KEY;

try {
  if (!firebase.apps.length) {
    firebase.initializeApp({
      credential: firebase.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // https://stackoverflow.com/a/41044630/1332513
        privateKey: privateKey.replace(/\\n/g, '\n')
      }),
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
    });
  }
} catch (e) {
  console.error('Firebase admin init error', e.stack);
}

export const firestore = firebase.firestore();
export const bucket = firebase.storage().bucket();
export const verifyIdToken = (token) =>
  firebase
    .auth()
    .verifyIdToken(token)
    .catch((error) => {
      throw error;
    });
export const collections = {
  cities: 'cities',
  images: 'images',
  videos: 'videos',
  stories: 'stories'
};
export const getCollection = (path) => firestore.collection(path);
export const toJSON = (doc) => ({ id: doc.id, ...doc.data() });
export const toArray = (snap) => {
  const list = [];
  snap.forEach((doc) => list.push(toJSON(doc)));
  return list;
};

export const uploadImage = (file) =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve, reject) => {
    try {
      const bucketFile = bucket.file(file.name);
      await bucketFile.save(file.buffer, {
        contentType: file.mimetype,
        gzip: true
      });
      await bucketFile.makePublic();
      const url = format(
        `https://storage.googleapis.com/${bucket.name}/${bucketFile.name}`
      );

      resolve({
        src: url,
        mimetype: file.mimetype,
        id: file.id,
        path: bucketFile.name
      });
    } catch (err) {
      reject(err);
    }
  });

export default firebase;
