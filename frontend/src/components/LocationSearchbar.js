import {
    IonItem,
    IonSearchbar,
    IonLabel,
  } from "@ionic/react";
import { locationOutline } from 'ionicons/icons';
import { LocationPopover } from "./LocationPopover";

export const LocationSearchbar = ( { locationFilter, setLocationFilter }) => {
    return (
        <IonItem lines="none">
            <IonLabel>Location</IonLabel>
            <IonSearchbar
              style={{ width: "80%" }}
              autocomplete="on"
              searchIcon={ locationOutline }
              showClearButton="never"
              id="location-searchbar"
              value={ locationFilter }
            />
            <LocationPopover setLocationFilter={ setLocationFilter } />
          </IonItem>

    )
}