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
  IonSearchbar,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { location } from "ionicons/icons";
import { useState } from "react";
import { LocationPopover } from "./LocationPopover";

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

    doSearch();
  };

  const getDietaries = () => {
    return [
      "Vegetarian",
      "Vegan",
      "Gluten free",
      "Lactose free",
      "Halal",
      "Dairy free",
      "Paleo",
    ];
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
      <IonHeader translucent>
        <IonItem lines="none" />
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
          <IonItem>
            <IonLabel>Location</IonLabel>
            <IonSearchbar
              style={{ width: "80%" }}
              autocomplete="on"
              searchIcon={location}
              showClearButton="never"
              id="location-searchbar"
              value={locationFilter}
            />
            <LocationPopover setLocationFilter={setLocationFilter} />
          </IonItem>
          <IonItem>
            <IonLabel>Rating</IonLabel>
            <IonRange
              max={5}
              snaps={true}
              pin={true}
              value={rating}
              style={{ minWidth: "80%" }}
              mode="md"
              onIonChange={(e) => {
                setRating(e.detail.value);
              }}
            />
          </IonItem>
          <IonItem>
            <IonLabel>Dietary</IonLabel>
            <IonSelect
              value={dietaries}
              multiple={true}
              cancelText="Cancel"
              okText="OK"
              style={{ minWidth: "80%" }}
              placeholder="None"
              onIonChange={(e) => {
                setDietaries(e.detail.value);
              }}
            >
              {getDietaries().map((dietary, idx) => {
                return (
                  <IonSelectOption value={dietary} key={idx}>
                    {dietary}
                  </IonSelectOption>
                );
              })}
            </IonSelect>
          </IonItem>
          <IonItem /> <IonItem />
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
