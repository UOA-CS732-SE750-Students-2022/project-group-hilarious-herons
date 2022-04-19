import { initializeApp } from "@firebase/app"
import {getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth"
import { firebaseConfig } from "./firebase_config"

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const signIn = async (callback) => {
    try {
        const result = await signInWithPopup(auth, new GoogleAuthProvider())
        const user = result.user

        if(user) { 
            callback(true, user)
        }
    } catch (err) {
        console.log("Error logging in : ", err)
        callback(false)
    }
}

export {
    signIn
}