import React from "react";
import lottie from "lottie-web";
import bellHotel from "../lottieFile/104530-hotel-bell.json";
import { IonCol, IonGrid, IonRow } from "@ionic/react";

export const Loading = () => {
  React.useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector("#loading-logo"),
      animationData: bellHotel,
    });
  }, []);
  return (
    <IonGrid style={{ margin: "5rem" }}>
      <IonRow class="ion-align-items-center ion-justify-content-center">
        <IonCol>
          <div id="loading-logo" />
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};
