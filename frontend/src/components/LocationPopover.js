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
    return [
      { region: "Auckland", city: "New Zealand" },
      { region: "Auckland CBD", city: "Auckland. New Zealand" },
      {
        region: "Auckland Fish Market",
        city: "Wynyard Quater, Auckland. New Zealand",
      },
      { region: "Auckland Central", city: "Auckland. New Zealand" },
      { region: "Auckland Airport", city: "Auckland. New Zealand" },
      {
        region: "Auckland City Hospital",
        city: "Park Road. Grafton, Aucland, New Zealand",
      },
      {
        region: "Auckland Zoo",
        city: "Western Springs, Auckland. New Zealand",
      },
      { region: "Bucklands Beach", city: "Auckland. New Zealand" },
      { region: "Newmarket", city: "Auckland. New Zealand" },
      { region: "Rialto Centre", city: "Newmarket, Auckland. New Zealand" },
      {
        region: "Westfield Newmarket",
        city: "Newmarket, Auckland. New Zealand",
      },
    ];
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
                  <IonCardSubtitle>{city}</IonCardSubtitle>
                </IonText>
              </IonItem>
            );
          })}
        </IonList>
      </IonContent>
    </IonPopover>
  );
};
