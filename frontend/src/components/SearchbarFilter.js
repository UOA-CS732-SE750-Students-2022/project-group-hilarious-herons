import {
  IonButton,
  IonCheckbox,
  IonContent,
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

export const SearchbarFilter = ({ showFilter, SetShowFilter }) => {
  const [showModal, setShowModal] = useState(false);
  const [byDistance, setByDistance] = useState(false);
  const [byRating, setByRating] = useState(false);
  const [dietaries, setDietaries] = useState([]);

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
      <IonContent style={{ alignContent: "space-between" }}>
        <IonList lines="none">
          <IonItem>
            <IonButton
              slot="end"
              fill="clear"
              color="light"
              onClick={() => setShowModal(false)}
            >
              <IonIcon icon={close} />
            </IonButton>
          </IonItem>
          <IonItemDivider>Sort by</IonItemDivider>
          <IonItem>
            <IonCheckbox
              checked={byDistance}
              slot="start"
              onIonChange={(e) => {
                setByDistance(e.detail.checked);
              }}
            />
            <IonLabel expand="block">Shortest Distance</IonLabel>
          </IonItem>
          <IonItem>
            <IonCheckbox
              checked={byRating}
              slot="start"
              onIonChange={(e) => {
                setByRating(e.detail.checked);
              }}
            />
            <IonLabel expand="block">Highest Rating</IonLabel>
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
              value={5}
              style={{ minWidth: "80%" }}
              mode="md"
            />
          </IonItem>
          <IonItem>
            <IonLabel>Dietary</IonLabel>
            <IonSelect
              multiple={true}
              cancelText="Cancel"
              okText="OK"
              style={{ minWidth: "80%" }}
              placeholder="None"
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
          >
            Reset
          </IonButton>
          <IonButton
            color="primary"
            expand="full"
            slot="end"
            shape="round"
            size="default"
          >
            Search
          </IonButton>
        </IonItem>
      </IonContent>
    </IonModal>
  );
};
