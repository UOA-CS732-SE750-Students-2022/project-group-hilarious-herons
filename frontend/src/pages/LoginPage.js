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
import "./LoginPage.css";
import { signIn } from "../firebase";
import { userService } from '../services/UserService';
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const LoginPage = () => {
  const history = useHistory();
  const { login } = useContext(AuthContext);

  const logIn = () => {
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
        history.push("/");
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
              onClick={logIn}
            >
              <IonIcon slot="start" icon={logoGoogle} color="light" />
              Login with Google
            </IonButton>
            <br />
            <br />
            <br />
            <IonRow className="sign-up">
              <IonText>Don't have an account?&nbsp;&nbsp;</IonText>
              <IonButton mode="ios" size="small">
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
