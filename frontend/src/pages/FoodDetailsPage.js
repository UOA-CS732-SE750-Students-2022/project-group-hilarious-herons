import { IonContent, IonPage } from "@ionic/react";
import { ActionHeader } from "../components/ActionHeader";
import { AddPostButton } from "../components/AddPostButton";
import { FoodDetailsCard } from "../components/FoodDetailsCard";

export const FoodDetailsPage = () => {
  return (
    <IonPage>
      <ActionHeader />
      <IonContent>
        <FoodDetailsCard></FoodDetailsCard>
        <AddPostButton />
      </IonContent>
     
    </IonPage>
  );
};
