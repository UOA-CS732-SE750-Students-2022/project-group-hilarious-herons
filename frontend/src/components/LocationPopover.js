import {
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonText,
} from "@ionic/react";

export const LocationPopover = ({ setLocationText, locations, show }) => {
  const items = locations.map((location) => {
    return {
      heading: Object.values(location)[0],
      subHeading: Object.values(location)[1],
    };
  });
  return (
    <IonCard
      style={{
        position: "absolute",
        zIndex: "10",
        width: "75%",
        margin: "0 0 0 20%",
        display: show ? "initial" : "none",
      }}
    >
      <IonCardContent
        style={{
          height: "7.5rem",
          padding: "1rem 0",
        }}
      >
        <IonContent>
          <IonList>
            {items.map(({ heading, subHeading }, idx) => {
              return (
                <IonItem
                  button
                  key={idx}
                  lines="none"
                  onClick={() => {
                    setLocationText(heading);
                  }}
                  mode="md"
                >
                  <IonText>
                    <IonLabel>{heading}</IonLabel>
                    <IonCardSubtitle>{subHeading}, New Zealand</IonCardSubtitle>
                  </IonText>
                </IonItem>
              );
            })}
          </IonList>
        </IonContent>
      </IonCardContent>
    </IonCard>
  );
};
