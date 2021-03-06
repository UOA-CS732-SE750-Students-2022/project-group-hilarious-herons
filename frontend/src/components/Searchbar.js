import {
  IonCardTitle,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonModal,
  IonRow,
} from "@ionic/react";
import { search } from "ionicons/icons";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import { close } from "ionicons/icons";
import "./Searchbar.css";

// ionic md breakpoint
const mdBreakpoint = "(min-width: 576px)";

export const Searchbar = () => {
  const [isMdBreakpoint, setIsMdBreakpoint] = useState(
    window.matchMedia(mdBreakpoint).matches
  );
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const { updateSearchKeyword, clearInput } = useContext(SearchContext);

  const placeholder = isMdBreakpoint
    ? "Search for a dish, cuisine or restaurant"
    : "Search";

  const doSearch = () => {
    updateSearchKeyword(searchInput);
    return [];
  };

  // listen for window resize events
  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia(mdBreakpoint).matches) {
        setIsMdBreakpoint(true); // at least md breakpoint wide
      } else {
        setIsMdBreakpoint(false); // less than md breakpoint wide
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  const lgSearchbar = () => {
    return (
      <>
        <IonItem lines="none" style={{ borderRadius: "2rem", margin: "0 5%" }}>
          <IonIcon
            icon={search}
            slot="start"
            style={{ marginTop: "0", marginBottom: "0" }}
          />
          <IonInput
            pattern="search"
            inputMode="search"
            type="search"
            clearInput={true}
            placeholder={placeholder}
            mode="ios"
            onKeyUp={(e) => {
              if (e.code === "Enter") {
                setShowMobileModal(false);
                doSearch();
              }
            }}
            onIonChange={(e) => {
              if (e.cancelable) {
                clearInput();
                e.preventDefault();
              }
              const input = e.detail.value;
              if (input.trim().length > 0) {
                setSearchInput(e.detail.value);
              }
            }}
          />
        </IonItem>
      </>
    );
  };

  const smSearchbar = () => {
    return (
      <>
        <IonFabButton
          size="small"
          slot="end"
          color="light"
          id="sm-searchbar"
          className="ion-no-shadows"
        >
          <IonIcon icon={search} size="small" />
        </IonFabButton>

        <IonModal
          trigger="sm-searchbar"
          swipeToClose={true}
          mode="ios"
          isOpen={showMobileModal}
          onDidPresent={() => setShowMobileModal(true)}
          onDidDismiss={() => setShowMobileModal(false)}
        >
          <IonHeader class="ion-no-border" className="search-header">
            <IonRow class="ion-padding">
              <IonCardTitle className="prompt-text">
                Find a dish, cuisine or restaurant
              </IonCardTitle>
              <IonIcon
                icon={close}
                color="light"
                style={{ marginLeft: "auto" }}
                onClick={() => setShowMobileModal(false)}
              />
            </IonRow>
            <IonRow class="ion-padding" className="search">
              {lgSearchbar(placeholder)}
            </IonRow>
          </IonHeader>
        </IonModal>
      </>
    );
  };

  return isMdBreakpoint ? lgSearchbar() : smSearchbar();
};
