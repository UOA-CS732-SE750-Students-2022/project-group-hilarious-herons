import {
  IonCardSubtitle,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonPopover,
  IonText,
} from "@ionic/react";

export const LocationPopover = ({ setLocationFilter }) => {
  const getLocations = () => {
    const locations = [
      "9 Pah Road, Epsom, Auckland 1023",
      "Level 1/12 Wyndham Street, Auckland CBD, Auckland 1010",
      "Saint Patricks Square, Wyndham Street, Auckland CBD, Auckland 1010",
      "375 Karangahape Road, Auckland CBD, Auckland 1010",
      "210 Symonds Street, Eden Terrace, Auckland 1010",
      "86 Federal Street, Auckland CBD, Auckland 1010",
      "90 Federal Street, Auckland CBD, Auckland 1010",
      "491F Pakuranga Road, Highland Park, Half Moon Bay, Auckland 2010",
      "63 Davis Crescent, Newmarket, Auckland 1023",
      "3d Short Street, Newmarket, Auckland 1023",
      "10-12 Teed Street, Newmarket, Auckland 1023",
      "854 Dominion Road, Mount Eden, Auckland 1041",
      "479 New North Road, Kingsland, Auckland 1021",
      "103-113 Westhaven Drive, St Marys Bay, Auckland 1144",
      "70 Jervois Road, Ponsonby, Auckland 1011",
      "417 Tamaki Drive, St Heliers, Auckland 1071",
      "272D Ti Rakau Drive, Pakuranga, Auckland 2013",
      "64 Waimarie Street, St Heliers, Auckland 1071",
      "47 The Parade, Bucklands Beach, Auckland 2012",
    ].map((address) => {
      return {
        region: address.split(",")[1].trim(),
        city: address.split(",")[2].trim().split(" ")[0],
      };
    });

    const uniqLocations = [];
    locations.forEach((loc) => {
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
    <IonPopover
      alignment="center"
      trigger="location-searchbar"
      size="cover"
      showBackdrop={false}
      dismissOnSelect={true}
    >
      <IonContent style={{ maxHeight: "12.5rem" }}>
        <IonList>
          {getLocations().map(({ region, city }, idx) => {
            return (
              <IonItem
                button
                key={idx}
                lines="none"
                onClick={() => {
                  setLocationFilter(region);
                }}
              >
                <IonText>
                  <IonLabel>{region}</IonLabel>
                  <IonCardSubtitle>{city}, New Zealand</IonCardSubtitle>
                </IonText>
              </IonItem>
            );
          })}
        </IonList>
      </IonContent>
    </IonPopover>
  );
};
