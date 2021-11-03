import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyACGFNckS9AeIT5Gnb7S-61nZwyvPJ5VtM",
  authDomain: "medaid-3203c.firebaseapp.com",
  projectId: "medaid-3203c",
  storageBucket: "medaid-3203c.appspot.com",
  messagingSenderId: "958571189322",
  appId: "1:958571189322:web:8cacc6c46c9c82b5f042b3",
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const database = getDatabase(app);
export default app;
