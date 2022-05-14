import { IonBackButton, IonButton } from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";

export const BackHomeButton = () => {
  return (
    <IonButton
      color="ionBack"
      id="back-button"
      routerDirection="back"
      shape="round"
      style={{ margin: "1rem 0 0 1rem" }}
    >
      <IonBackButton
        defaultHref="/"
        icon={arrowBackOutline}
        size="large"
        color="primary"
      />
    </IonButton>
  );
};
