import 'dotenv/config';
import admin from "firebase-admin";
import crypto from 'crypto';

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'genio-shop.appspot.com',
});

const storage = admin.storage();
const bucket = storage.bucket();

export async function uploadProductImage(file) {
  if (!file) {
    throw new Error('No file provided');
  }

  const fileName = file.originalname;
  const mimeType = file.mimetype;

  const fileRef = bucket.file(fileName);

  try {
    await fileRef.save(file.buffer, { contentType: mimeType });

    const [imageUrl] = await fileRef.getSignedUrl({
      action: 'read',
      expires: '01-01-2050',
    });

    return imageUrl;
  } catch (err) {
    console.error(err);
    throw new Error('Error uploading image');
  }
}
