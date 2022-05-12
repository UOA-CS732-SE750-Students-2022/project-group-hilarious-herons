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
import { useEffect, useState } from "react";
import "./LocationPopover.css";

export const LocationPopover = ({
  show,
  setRestaurantId,
  locations,
  setShow,
  setLocationText,
  showLoader,
  notFound,
}) => {
  const [loaderTimeOut, setLoaderTimeOut] = useState(false);
  const items = locations?.map((location) => {
    return {
      heading: location.name,
      subHeading: location.address,
      id: location._id,
    };
  });

  const timeOutforLoader = () => {
    setTimeout(() => {
      setLoaderTimeOut(true);
    }, 10000);
  };

  useEffect(() => {
    setLoaderTimeOut(false);
  }, [showLoader, show, notFound]);

  timeOutforLoader();
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
          {!loaderTimeOut && !notFound ? (
            <div className="loader-container">
              <div className="loader"> </div>
            </div>
          ) : (
            ""
          )}

          {notFound && !showLoader ? (
            <div className="loader-container">
              <p>Restaurant Not Found</p>
            </div>
          ) : (
            ""
          )}

          <IonList>
            {items.map(({ heading, subHeading, id }, idx) => {
              return (
                <IonItem
                  button
                  key={idx}
                  lines="none"
                  onClick={() => {
                    console.log(id);
                    setRestaurantId(id);
                    setShow(false);
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
