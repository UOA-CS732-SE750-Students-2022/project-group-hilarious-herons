import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonModal,
  IonRange,
  IonTitle,
} from "@ionic/react";
import { useState } from "react";
import { DietariesSelect } from "./DietariesSelect";
import { LocationSearchbar } from "./LocationSearchbar";

export const SearchbarFilter = ({ setShowMobileModal, doSearch }) => {
  const [showModal, setShowModal] = useState(false);
  const [byDistance, setByDistance] = useState(
    localStorage.getItem("byDistance") || false
  );
  const [byRating, setByRating] = useState(
    localStorage.getItem("byRating") || false
  );
  const [locationFilter, setLocationFilter] = useState(
    localStorage.getItem("locationFilter") || ""
  );

  const [rating, setRating] = useState(localStorage.getItem("rating") || 5);
  const [dietaries, setDietaries] = useState(
    JSON.parse(localStorage.getItem("dietaries")) || []
  );

  const handleReset = () => {
    setByDistance(false);
    setByRating(false);
    setLocationFilter("");
    setRating(5);
    setDietaries([]);
  };

  const handleSearch = () => {
    setShowModal(false);
    setShowMobileModal(false);
    localStorage.setItem("byDistance", byDistance);
    localStorage.setItem("byRating", byRating);
    localStorage.setItem("locationFilter", locationFilter);
    localStorage.setItem("rating", rating);
    localStorage.setItem("dietaries", JSON.stringify(dietaries));
    
    console.log(localStorage);
    doSearch();
  };

  return (
    <IonModal
      trigger="searchbar"
      isOpen={showModal}
      swipeToClose={true}
      onDidPresent={() => setShowModal(true)}
      mode="ios"
    >
      {/* IonHeader added to allow the swipe to close feature in ios mode */}
      <IonHeader>
        <IonItem lines="none" >
          <IonTitle>Search Filter</IonTitle>
        </IonItem>
      </IonHeader>
      <IonContent>
        <IonList lines="none">
          <IonItemDivider>Sort by</IonItemDivider>
          <IonItem>
            <IonCheckbox
              checked={byDistance}
              slot="start"
              onIonChange={(e) => {
                setByDistance(e.detail.checked);
              }}
            />
            <IonLabel expand="block">Shortest distance</IonLabel>
          </IonItem>
          <IonItem>
            <IonCheckbox
              checked={byRating}
              slot="start"
              onIonChange={(e) => {
                setByRating(e.detail.checked);
              }}
            />
            <IonLabel expand="block">Highest rating</IonLabel>
          </IonItem>
          <IonItemDivider>Filter by</IonItemDivider>
          <LocationSearchbar locationFilter={ locationFilter } setLocationFilter={ setLocationFilter }/>
          <IonItem>
            <IonLabel>Rating</IonLabel>
            <IonRange
              max={5}
              snaps
              pin
              value={rating}
              style={{ minWidth: "80%" }}
              mode="md"
              onIonChange={ (e) => {
                setRating(e.detail.value);
              }}
            />
          </IonItem>
          <DietariesSelect dietaries={ dietaries } setDietaries={ setDietaries }/>
          <IonItem />
        </IonList>
        <IonItem lines="none">
          <IonButton
            expand="full"
            fill="outline"
            slot="end"
            shape="round"
            size="default"
            onClick={() => {
              handleReset();
            }}
          >
            Reset
          </IonButton>
          <IonButton
            color="primary"
            expand="full"
            slot="end"
            shape="round"
            size="default"
            onClick={() => {
              handleSearch();
            }}
          >
            Search
          </IonButton>
        </IonItem>
      </IonContent>
    </IonModal>
  );
};
