import { IonItem, IonLabel, IonInput } from "@ionic/react";
import { useState } from "react";
import { RestaurantService } from "../services/RestaurantService";
import { LocationPopover } from "./LocationPopover";

export const LocationSearchbar = ({
  label,
  placeholder,
  locationText,
  setLocationText,
  setRestaurantId,
  restauantId,
}) => {
  const [show, setShow] = useState(false);
  const [timer, setTimer] = useState(null);
  const [restauant, setRestaurant] = useState([]);
  const [showLoader, setShowLoader] = useState([]);
  const [notFound, setNotFound] = useState(false);

  const handleRestaurantInput = (e) => {
    const value = e.detail.value;

    if (value.length > 0) {
      setShowLoader(true);
      setShow(true);
    }

    if (restauantId.length > 0) {
      setShow(false);
    }

    setLocationText(value);
    clearTimeout(timer);

    const newTimer = setTimeout(async () => {
      if (show && value.length > 0) {
        setRestaurant([]);

        setShowLoader(!showLoader);

        const restauant = await RestaurantService.getRestaurants({
          name: value,
        });
        if (restauant != 404) {
          setShowLoader(!showLoader);
          setNotFound(false);
          console.log(restauant);
          setRestaurant(restauant);
        } else {
          setRestaurant([]);
          setShowLoader(!showLoader);

          setNotFound(true);
        }
      }
    }, 1500);

    if (value.length == 0) {
      setRestaurantId("");

      setShow(false);
    }
    setTimer(newTimer);
  };
  console.log(restauantId);

  return (
    <>
      <IonItem lines="none">
        <IonLabel position="fixed">{label}</IonLabel>
        <IonInput
          value={locationText}
          required={true}
          showClearButton="never"
          autoCorrect="on"
          type="search"
          placeholder={placeholder}
          id="location-searchbar"
          style={{ verticalAlign: "text-top" }}
          onIonChange={(e) => handleRestaurantInput(e)}
        />
      </IonItem>
      <LocationPopover
        show={show}
        setLocationText={setLocationText}
        locations={restauant}
        setRestaurantId={setRestaurantId}
        setShow={setShow}
        showLoader={showLoader}
        notFound={notFound}
      />
    </>
  );
};
