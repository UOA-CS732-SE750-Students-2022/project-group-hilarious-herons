import {
  IonPage,
  IonContent,
  IonTitle,
  IonButton,
  IonIcon,
  useIonToast,
  IonRow,
  IonCol,
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
          <IonCol style={{ padding: 0 }} className="image-content">
            <IonRow>
              <IonTitle class="title">
                <h1>FUNTER</h1>
              </IonTitle>
            </IonRow>
            <IonRow className="content">
              <IonCol>
                <IonRow class="ion-justify-content-center">
                  <div class="ion-text-wrap" className="description-text">
                    <h1>START YOUR FOOD HUNTING JOURNEY.</h1>
                  </div>
                </IonRow>
                <IonRow
                  className="small-screen-login-button"
                  class="ion-justify-content-center"
                >
                  <IonButton
                    size="large"
                    mode="ios"
                    shape="round"
                    onClick={SignInWithGoogle}
                  >
                    <IonIcon slot="start" icon={logoGoogle} color="light" />
                    Sign In with Google
                  </IonButton>
                </IonRow>
                <IonRow class="ion-justify-content-center">
                  <a href="/" color="white">
                    <h3>Return to Home</h3>
                  </a>
                </IonRow>
              </IonCol>
            </IonRow>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};
