import { IonItem, IonLabel, IonInput } from "@ionic/react";
import { useState } from "react";
import { LocationPopover } from "./LocationPopover";

export const LocationSearchbar = ({
  label,
  placeholder,
  locationText,
  setLocationText,
  locations,
}) => {
  const [show, setShow] = useState(false);

  const filterLocations = () => {
    return locations.filter((restaurant) => {
      return Object.values(restaurant)[0]
        .toLowerCase()
        .includes(locationText.toLowerCase());
    });
  };

  const handleRestaurantInput = (e) => {
    const value = e.detail.value;
    const locationList = filterLocations();
    const locationsCount = locationList.length;
    setLocationText(value);
    if (
      locationsCount === 1 &&
      locationText === Object.values(locationList[0])[0] // check that the first property in the object is the same
    ) {
      setShow(false);
    } else if (value.length > 0 && locationsCount > 0) {
      setShow(true);
    } else {
      setShow(false);
    }
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
        setLocationText={setLocationText}
        locations={filterLocations()}
        show={show}
      />
    </>
  );
};
