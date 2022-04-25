import {
  IonPage,
  IonContent,
  IonTitle,
  IonButton,
  IonIcon,
  IonText,
  IonRow,
} from "@ionic/react";
import { logoGoogle } from "ionicons/icons";
import { useContext } from "react";
import "./SignInPage.css";
import { signIn } from "../firebase";
import { userService } from '../services/UserService';
import { AuthContext } from "../context/AuthContext";

export const SignInPage = () => {
  const { login } = useContext(AuthContext);

  const SignInWithGoogle = () => {
    signIn(async (ok, user) => {
      if (ok) {
        const dbUser = await userService.getUser(user.uid);

        if (dbUser === 404) {
          const newUserObj = {
            firebaseUUID: user.uid,
            displayName: user.providerData[0].displayName,
            firstName: "",
            lastName: "",
            posts: [],
            favourites: [],
            followingUsers: [],
          };

          const newUser = await userService.createUser(newUserObj);

          login(newUser);
        } else {
          login(dbUser);
        }
        window.location.href = '/';
      }
      
    });
  };

  return (
    <IonPage>
      <IonContent fullscreen className="login-content">
        <div className="component">
          <div className="componentx">
            <IonTitle>Log in to your account!</IonTitle>
            <br />
            <br />
            <IonButton
              className="login-button"
              expand="full"
              size="large"
              onClick={SignInWithGoogle}
            >
              <IonIcon slot="start" icon={logoGoogle} color="light" />
              Sign In with Google
            </IonButton>
            <br />
            <br />
            <br />
            <IonRow className="sign-up">
              <IonText>Don't have an account?&nbsp;&nbsp;</IonText>
              <IonButton 
                mode="ios" 
                size="small" 
                onClick={SignInWithGoogle}
              >
                Sign Up
              </IonButton>
            </IonRow>
          </div>
        </div>
        <div className="image-content">
          <IonText>
            <h1>FUNTER</h1>
          </IonText>
          <IonTitle slot="start">
            <h1>
              START YOUR FOOD
              <br />
              HUNTING JOURNEY.
            </h1>
          </IonTitle>
        </div>
      </IonContent>
    </IonPage>
  );
};