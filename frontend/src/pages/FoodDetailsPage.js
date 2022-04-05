import { IonPage } from "@ionic/react";
import { ActionHeader } from "../components/ActionHeader";
import { AddPostButton } from "../components/AddPostButton";

export const FoodDetailsPage = () => {
  return (
    <IonPage>
      <ActionHeader />
      <AddPostButton />
    </IonPage>
  );
};
