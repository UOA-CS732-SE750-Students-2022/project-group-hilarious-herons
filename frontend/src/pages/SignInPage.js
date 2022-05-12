import {
  IonPage,
  IonContent,
  IonTitle,
  IonButton,
  IonIcon,
  useIonToast,
  IonRow,
  IonCol,
  IonText,
} from "@ionic/react";
import { logoGoogle } from "ionicons/icons";
import "./SignInPage.css";
import { signIn } from "../utils/firebase";
import { userService } from "../services/UserService";

export const SignInPage = () => {
  const [present] = useIonToast();
  
  const createWarning = (message) => {
    return present({
      message: message,
      mode: "ios",
      color: "dark",
      duration: 2000,
    });
  };

  const SignInWithGoogle = () => {
    signIn(async (ok, user) => {
      if (ok) {
        const dbUser = await userService.getUser(user.uid);

        if (!dbUser) {
          createWarning("Not start the backend");
          return;
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
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("displayName", user.displayName);
        localStorage.setItem("uid", user.uid);
        window.location.href = "/";
      } else {
        createWarning("Signin with Google Unsuccessfully");
      }
    });
  };

  return (
    <IonPage>
      <IonContent>
        <IonRow className="grid">
          <IonCol style={{ padding: 0 }} className="image-content" size="12">
            <IonRow>
              <IonCol size="0" sizeXs="12">
                <IonTitle>
                  <h1>FUNTER</h1>
                </IonTitle>
              </IonCol>
              <IonCol size="12" className="title-text-spacing">
                <IonTitle className="description-text">
                  <h2>
                    START YOUR FOOD HUNTING JOURNEY
                  </h2>
                </IonTitle>
              </IonCol>
              <IonCol className="small-screen-login-button">
                <IonButton 
                  size="large" 
                  mode="ios" 
                  onClick={SignInWithGoogle}
                >
                  <IonIcon slot="start" icon={logoGoogle} color="light" />
                  Sign In with Google
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow>
            <IonCol>
                <a href="/" color="white">
                    <h3>Return to Home</h3>
                </a>
              </IonCol>
            </IonRow>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};
