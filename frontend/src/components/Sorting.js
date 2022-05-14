import React from "react";
import {
  IonRow,
  IonIcon,
  IonFabButton,
  IonPopover,
  IonRadioGroup,
  IonLabel,
  IonItem,
  IonRadio,
  IonList,
} from "@ionic/react";
import { funnel, arrowUp, arrowDown } from "ionicons/icons";

export const Sorting = ({ setSortOrder, sortOrder }) => {
  return (
    <IonRow class="ion-justify-content-end ion-padding-end">
      <IonFabButton
        size="large"
        color="light"
        className="ion-no-shadows"
        id="sort-button"
        mode="ios"
      >
        <IonIcon icon={funnel} size="small" title="sorting" />
      </IonFabButton>
      <IonPopover trigger="sort-button" size="auto" mode="ios">
        <IonList lines="none">
          <IonRadioGroup
            allowEmptySelection
            onIonChange={(e) => setSortOrder(e.target.value)}
            value={sortOrder}
          >
            <IonItem>
              <IonLabel>
                Rating
                <IonIcon icon={arrowUp} size="small" />
              </IonLabel>
              <IonRadio value="RATING DESC" />
            </IonItem>

            <IonItem>
              <IonLabel>
                Rating
                <IonIcon icon={arrowDown} size="small" />
              </IonLabel>
              <IonRadio value="RATING ASC" />
            </IonItem>
          </IonRadioGroup>
        </IonList>
      </IonPopover>
    </IonRow>
  );
};
