import { IonPage } from "@ionic/react";
import { ActionHeader } from "../components/ActionHeader";
import FoodCard from "../components/FoodCard"

export const HomePage = () => {
  return (
    <IonPage>
      <ActionHeader banner></ActionHeader>
      <FoodCard />  
    </IonPage>
  );
};

