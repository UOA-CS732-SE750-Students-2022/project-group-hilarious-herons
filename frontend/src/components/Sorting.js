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

export const Sorting = ({
  setSortOrder 
}) => {
    return(
        <IonRow class="ion-justify-content-end ion-padding-end">
        <IonFabButton
          size="large"
          color="light"
          className="ion-no-shadows"
          id="sort-button"
          mode="ios"
        >
          <IonIcon icon={funnel} size="small" title="sorting"/>
        </IonFabButton>
        <IonPopover trigger="sort-button" size="auto" mode="ios">
          <IonList lines="none">
            <IonRadioGroup 
              allowEmptySelection 
              onIonChange={(e) => setSortOrder(e.target.value)}
            >
              <IonItem>
                <IonLabel>
                  Rating 
                  <IonIcon icon={arrowUp} size="small" />
                </IonLabel>
                <IonRadio value="DESC" />
              </IonItem>

              <IonItem>
                <IonLabel>
                  Rating 
                  <IonIcon icon={arrowDown} size="small" />
                </IonLabel>
                <IonRadio value="ASC" />
              </IonItem>

              <IonItem>
                <IonLabel>
                  Distance 
                  <IonIcon icon={arrowDown} size="small" />
                </IonLabel>
                <IonRadio value="" />
              </IonItem>
            </IonRadioGroup>
          </IonList>
        </IonPopover>
      </IonRow>
  )
}