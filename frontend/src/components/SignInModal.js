import {
  IonButton,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonModal,
} from "@ionic/react";
import { NavLink } from "react-router-dom";
import "./SignInModal.css";

export const SignInModal = ({ showModal, setShowModal }) => {
  return (
    <IonModal
      isOpen={showModal}
      swipeToClose={true}
      onDidDismiss={() => setShowModal(false)}
      // showBackdrop={false}
      mode="ios"
    >
      <IonCardContent>
        <IonCardTitle color="primary">Like what you see?</IonCardTitle>
        <IonCardSubtitle mode="md">
          Sign in now to start saving posts
        </IonCardSubtitle>

        <img src="pablita-886.png" alt="Natasha Remarchuk" />

        <IonItem lines="none">
          <p slot="start" className="img-attribution">
            Illustration by{" "}
            <a href="https://icons8.com/illustrations/author/u7l2K4BCiAa9">
              Natasha Remarchuk
            </a>{" "}
            from <a href="https://icons8.com/illustrations">Ouch!</a>
          </p>
          <NavLink to="/auth" slot="end">
            <IonButton
              size="large"
              shape="round"
              mode="ios"
              onClick={() => setShowModal(false)}
            >
              Sign In
            </IonButton>
          </NavLink>
        </IonItem>
      </IonCardContent>
    </IonModal>
  );
};
