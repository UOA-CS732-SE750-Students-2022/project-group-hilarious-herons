import {
  IonPage,
  IonContent,
  IonTitle,
  IonButton,
  IonIcon,
  IonText,
  useIonToast,
} from "@ionic/react";
import { logoGoogle } from "ionicons/icons";
import "./SignInPage.css";
import { signIn } from "../firebase";
import { userService } from '../services/UserService';

export const SignInPage = () => {
  const [present] = useIonToast();
  const createWarning = (message) => {
    return present({
      message: message,
      mode: "ios",
      color: "dark",
      duration: 2000,
    });
  }
  const SignInWithGoogle = () => {
    signIn(async (ok, user) => {
      if (ok) {
        const dbUser = await userService.getUser(user.uid);

        console.log(dbUser);
        if(!dbUser) {
          createWarning("Not start the backend");
          return ;
        }

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
           await userService.createUser(newUserObj);
        }
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem("displayName", user.displayName);
        localStorage.setItem('uid', user.uid);
        window.location.href = '/';
      } else {
        createWarning("Signin with Google Unsuccessfully");
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
            {/* <IonRow className="sign-up">
              <IonText>Don't have an account?&nbsp;&nbsp;</IonText>
              <IonButton 
                mode="ios" 
                size="small" 
                onClick={}
              >
                Sign Up
              </IonButton>
            </IonRow> */}
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
