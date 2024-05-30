import 'dotenv/config';
import admin from "firebase-admin";
import crypto from 'crypto';

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const bucket = admin.storage().bucket('images');

export async function uploadProductImage(imageData, contentType) {
  let filename = '';
  if (contentType !== undefined) {
    filename = `${crypto.randomUUID()}-${Date.now()}.${contentType.split('/')[1]}`;
  }
  const file = bucket.file(filename);
  await file.save(imageData);
  return `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(filename)}?alt=media`;
}
