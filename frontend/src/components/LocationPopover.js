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

export const LocationPopover = ({
  show,
  setRestaurantId,
  locations,
  setShow,
  setLocationText,
}) => {
  const items = locations?.map((location) => {
    return {
      heading: location.name,
      subHeading: location.address,
      id: location._id,
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
            {items.map(({ heading, subHeading, id }, idx) => {
              return (
                <IonItem
                  button
                  key={idx}
                  lines="none"
                  onClick={() => {
                    setRestaurantId(id);
                    setShow(false);
                    setLocationText(heading);
                    console.log(id);
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
