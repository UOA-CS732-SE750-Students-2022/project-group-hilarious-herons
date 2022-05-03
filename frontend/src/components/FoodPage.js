import { IonPage } from "@ionic/react";
import { ActionHeader } from "./ActionHeader";

export const FoodPage = ({ children, banner }) => {
  return (
    <IonPage>
      <ActionHeader banner={banner}>{children}</ActionHeader>
    </IonPage>
  );
};
