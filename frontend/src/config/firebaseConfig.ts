import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import {
	FIREBASE_API_KEY,
	FIREBASE_PROJECT_ID,
	FIREBASE_STORAGE_BUCKET,
	FIREBASE_APP_ID,
	FIREBASE_MESSAGING_SENDER_ID,
	FIREBASE_MEASUREMENT_ID,
	FIREBASE_AUTH_DOMAIN,
} from '@env';
export const firebaseConfig = {
	apiKey: FIREBASE_API_KEY,
	projectId: FIREBASE_PROJECT_ID,
	storageBucket: FIREBASE_STORAGE_BUCKET,
	messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
	appId: FIREBASE_APP_ID,
	measurementId: FIREBASE_MEASUREMENT_ID,
	authDomain: FIREBASE_AUTH_DOMAIN,
};

const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);
