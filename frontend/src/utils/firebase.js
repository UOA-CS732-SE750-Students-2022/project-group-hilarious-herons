import { initializeApp } from "@firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { firebaseConfig } from "../firebase-config-frontend";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export { signIn, logOut };

async function signIn(callback) {
  try {
    const result = await signInWithPopup(auth, new GoogleAuthProvider());
    const user = result.user;

    if (user) {
      const token = await auth.currentUser.getIdToken();
      localStorage.setItem("token", token);
      callback(true, user);
    }
  } catch (err) {
    console.log("Error logging in : ", err);
    callback(false);
  }
}

async function logOut(callback) {
  signOut(auth)
    .then(() => {
      callback(true);
    })
    .catch((error) => {
      callback(false);
      console.log(error);
    });
}
