import { IonPage } from "@ionic/react";
import { ActionHeader } from "../components/ActionHeader";
import { Error404 } from "../components/Error404"

export const ErrorPage = () => {
  return (
    <IonPage>
      <ActionHeader>
            <Error404 />
      </ActionHeader>
    </IonPage>
  );
};
