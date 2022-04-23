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

    doSearch();
  };

  const getLocations = () => {
    const locationsRegions = [
      { address: "9 Pah Road, Epsom, Auckland 1023" },
      { address: "Level 1/12 Wyndham Street, Auckland CBD, Auckland 1010" },
      {
        address:
          "Saint Patricks Square, Wyndham Street, Auckland CBD, Auckland 1010",
      },
      { address: "375 Karangahape Road, Auckland CBD, Auckland 1010" },
      { address: "210 Symonds Street, Eden Terrace, Auckland 1010" },
      { address: "86 Federal Street, Auckland CBD, Auckland 1010" },
      { address: "90 Federal Street, Auckland CBD, Auckland 1010" },
      {
        address:
          "491F Pakuranga Road, Highland Park, Half Moon Bay, Auckland 2010",
      },
      { address: "63 Davis Crescent, Newmarket, Auckland 1023" },
      { address: "3d Short Street, Newmarket, Auckland 1023" },
      { address: "10-12 Teed Street, Newmarket, Auckland 1023" },
      { address: "854 Dominion Road, Mount Eden, Auckland 1041" },
      { address: "479 New North Road, Kingsland, Auckland 1021" },
      { address: "103-113 Westhaven Drive, St Marys Bay, Auckland 1144" },
      { address: "70 Jervois Road, Ponsonby, Auckland 1011" },
      { address: "417 Tamaki Drive, St Heliers, Auckland 1071" },
      { address: "272D Ti Rakau Drive, Pakuranga, Auckland 2013" },
      { address: "64 Waimarie Street, St Heliers, Auckland 1071" },
      { address: "47 The Parade, Bucklands Beach, Auckland 2012" },
    ].map(({ address }) => {
      return {
        region: address.split(",")[1].trim(),
        city: address.split(",")[2].trim().split(" ")[0],
      };
    });

    const uniqLocations = [];
    locationsRegions.forEach((loc) => {
      const hasLocation =
        uniqLocations.filter((uniqLoc) => {
          return loc.region === uniqLoc.region && loc.city === uniqLoc.city; // finds matching locations
        }).length > 0;

      if (!hasLocation) {
        uniqLocations.push(loc);
      }
    });

    return uniqLocations;
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
        <IonItem lines="none">
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
          <LocationSearchbar
            label="Location"
            placeholder="Search"
            locationText={locationFilter}
            setLocationText={setLocationFilter}
            locations={getLocations()}
          />

          <DietariesSelect dietaries={dietaries} setDietaries={setDietaries} />
          <IonItem>
            <IonLabel>Rating</IonLabel>
            <IonRange
              max={5}
              snaps
              pin
              value={rating}
              style={{ minWidth: "80%", paddingLeft: 0 }}
              mode="md"
              onIonChange={(e) => {
                setRating(e.detail.value);
              }}
            />
          </IonItem>
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
