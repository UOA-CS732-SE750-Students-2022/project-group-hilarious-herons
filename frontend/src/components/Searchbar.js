import { IonButton, IonIcon, IonInput, IonItem } from "@ionic/react";
import { search, filter } from "ionicons/icons";
import { SearchbarFilter } from "./SearchbarFilter";

export const Searchbar = () => {
  return (
    <>
      <IonItem
        lines="none"
        style={{ borderRadius: "2rem", outerHeight: "20px" }}
      >
        <IonIcon
          icon={search}
          slot="start"
          style={{ marginTop: "0", marginBottom: "0" }}
        />
        <IonInput
          pattern="search"
          inputMode="search"
          type="search"
          clear-input={false}
          placeholder="Search"
          mode="ios"
        />
        <IonButton slot="end" color="light" fill="clear" id="searchbar">
          <IonIcon icon={filter} />
        </IonButton>
      </IonItem>

      <SearchbarFilter />
    </>
  );
};
