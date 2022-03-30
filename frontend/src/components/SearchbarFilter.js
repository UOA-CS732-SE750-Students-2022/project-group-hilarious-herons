import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
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
import { close } from "ionicons/icons";
import { useState } from "react";

export const SearchbarFilter = () => {
  const [showModal, setShowModal] = useState(false);
  const [byDistance, setByDistance] = useState(false);
  const [byRating, setByRating] = useState(false);
  const [rating, setRating] = useState(5);
  const [dietaries, setDietaries] = useState([]);

  let isSortDistance, isSortRating, currentRating, currentDietaries;

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
        <IonItem lines="none">
          <IonButton
            slot="end"
            fill="clear"
            color="light"
            onClick={() => setShowModal(false)}
          >
            <IonIcon icon={close} />
          </IonButton>
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
                isSortDistance = e.detail.checked;
              }}
            />
            <IonLabel expand="block">Shortest distance</IonLabel>
          </IonItem>
          <IonItem>
            <IonCheckbox
              checked={byRating}
              slot="start"
              onIonChange={(e) => {
                isSortRating = e.detail.checked;
              }}
            />
            <IonLabel expand="block">Highest rating</IonLabel>
          </IonItem>
          <IonItemDivider>Filter by</IonItemDivider>
          <IonItem>
            <IonLabel>Location</IonLabel>
            <IonSearchbar style={{ width: "80%" }} />
          </IonItem>
          <IonItem>
            <IonLabel>Ratings</IonLabel>
            <IonRange
              max={5}
              snaps={true}
              pin={true}
              value={rating}
              style={{ minWidth: "80%" }}
              mode="md"
              onIonChange={(e) => {
                currentRating = e.detail.value;
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
                currentDietaries = e.detail.value;
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
              setByDistance(false);
              setByRating(false);
              setRating(5);
              setDietaries([]);
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
              setByDistance(
                isSortDistance === undefined ? byDistance : isSortDistance
              );
              setByRating(isSortRating === undefined ? byRating : isSortRating);
              setRating(currentRating === undefined ? rating : currentRating);
              setDietaries(
                currentDietaries === undefined ? dietaries : currentDietaries
              );
              setShowModal(false);

              // Reset all current filter choices
              isSortDistance = undefined;
              isSortRating = undefined;
              currentRating = undefined;
              currentDietaries = undefined;
            }}
          >
            Search
          </IonButton>
        </IonItem>
      </IonContent>
    </IonModal>
  );
};
