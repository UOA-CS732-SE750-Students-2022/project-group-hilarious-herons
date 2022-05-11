import {
  IonButton,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonModal,
  IonRow,
} from "@ionic/react";
import { NavLink } from "react-router-dom";
import "./SignInModal.css";

export const SignInModal = ({ showModal, setShowModal }) => {
  return (
    <IonModal
      className="sign-in-modal"
      isOpen={showModal}
      swipeToClose={true}
      onDidDismiss={() => setShowModal(false)}
      mode="ios"
    >
      <IonCardContent>
        <IonCardTitle color="primary">Like what you see?</IonCardTitle>
        <IonCardSubtitle mode="md">
          Sign in now to start saving posts
        </IonCardSubtitle>

        <img src="/login-prompt-img.png" alt="Natasha Remarchuk" />

        <IonGrid>
          <IonRow>
            <IonCol>
              <p className="img-attribution">
                Illustration by{" "}
                <a href="https://icons8.com/illustrations/author/u7l2K4BCiAa9">
                  Natasha Remarchuk
                </a>{" "}
                from <a href="https://icons8.com/illustrations">Ouch!</a>
              </p>
            </IonCol>

            <IonCol size="auto">
              <NavLink to="/auth">
                <IonButton
                  size="large"
                  shape="round"
                  mode="ios"
                  onClick={() => setShowModal(false)}
                >
                  Sign In
                </IonButton>
              </NavLink>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonModal>
  );
};
