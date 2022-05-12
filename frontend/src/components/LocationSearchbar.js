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

  // const filterLocations = () => {
  //   return locations?.filter((restaurant) => {
  //     console.log(restauant);
  //     return Object.values(restaurant)[0]
  //       .toLowerCase()
  //       .includes(locationText.toLowerCase());
  //   });
  // };

  const handleRestaurantInput = (e) => {
    const value = e.detail.value;

    if (value.length > 0) {
      console.log("in");

      setShow(true);
    }

    if (restauantId.length > 0) {
      setShow(false);
    }

    setLocationText(value);
    clearTimeout(timer);

    const newTimer = setTimeout(async () => {
      if (show && value.length > 0) {
        const restauant = await RestaurantService.getRestaurants({
          name: value,
        });
        console.log(restauant);
        if (!restauant >= 400) {
          setRestaurant(restauant);
        }
      }
    }, 1500);

    if (value.length == 0) {
      setShow(false);
    }
    setTimer(newTimer);
  };

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
      />
    </>
  );
};
