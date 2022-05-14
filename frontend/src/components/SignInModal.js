import {
  IonButton,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonModal,
  IonRow,
} from "@ionic/react";
import { NavLink } from "react-router-dom";
import "./SignInModal.css";
import { close } from "ionicons/icons";

export const SignInModal = ({
  showModal,
  setShowModal,
  title,
  subtitle,
  imgSrc,
  children,
}) => {
  return (
    <IonModal
      className="sign-in-modal"
      isOpen={showModal}
      swipeToClose={true}
      onDidDismiss={() => setShowModal(false)}
      mode="ios"
    >
      <IonCardContent>
        <IonRow>
          <IonCardTitle color="primary">{title}</IonCardTitle>
          <IonIcon
            icon={close}
            style={{ marginLeft: "auto" }}
            onClick={() => setShowModal(false)}
          />
        </IonRow>
        <IonCardSubtitle mode="md">{subtitle}</IonCardSubtitle>

        <img src={imgSrc} alt="sign-in-img" />

        <IonGrid>
          <IonRow>
            <IonCol>{children}</IonCol>

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
