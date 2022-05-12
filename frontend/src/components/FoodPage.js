import { IonPage } from "@ionic/react";
import { ActionHeader } from "./ActionHeader";

export const FoodPage = ({ children, banner, canSearch=true }) => {
  return (
    <IonPage>
      <ActionHeader banner={banner} canSearch={canSearch}>{children}</ActionHeader>
    </IonPage>
  );
};
