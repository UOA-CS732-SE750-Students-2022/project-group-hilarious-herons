import {
  IonButton,
  IonContent,
  IonTitle,
  IonToolbar,
  IonChip,
  IonAvatar,
  IonLabel,
} from "@ionic/react";
import { createAnimation } from "@ionic/react";
import { useEffect, useState } from "react";
import { Searchbar } from "./Searchbar";
import { UserPopover } from "./UserPopover";
import "./ActionHeader.css";

export const ActionHeader = ({ banner, children, canSearch }) => {
  const [headerVisible, setHeaderVisible] = useState(true);
  const [displayName, setDisplayName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const colorInAnimation = createAnimation()
    .addElement(document.querySelector("#header"))
    .duration(200)
    .easing("ease-in")
    .to("background", "#ff9f1c");

  const colorOutAnimation = createAnimation()
    .addElement(document.querySelector("#header"))
    .duration(200)
    .easing("ease-out")
    .to("background", `transparent`);

  const handleScroll = (event) => {
    if (banner) {
      if (event.detail.scrollTop === 0 && !headerVisible) {
        setHeaderVisible(true);
        colorOutAnimation.play();
      }

      if (event.detail.scrollTop > 0 && headerVisible) {
        setHeaderVisible(false);
        colorInAnimation.play();
      }
    }
  };

  useEffect(() => {
    setDisplayName(localStorage.getItem("displayName"));
    setIsLoggedIn(localStorage.getItem("isLoggedIn"));
  }, []);

  return (
    <IonContent
      scrollEvents={true}
      onIonScroll={(event) => handleScroll(event)}
    >
      <div style={{ justifyContent: "center" }}>
        {banner ? <div className="header-bg" /> : null}

        <div
          className="header"
          id="header"
          style={{ background: banner ? "transparent" : "#ff9f1c" }}
        >
          <IonToolbar color="transparent">
            <IonButton
              fill="clear"
              color="light"
              slot="start"
              mode="ios"
              routerDirection="back"
              href="/"
              style={{ margin: "0 5%" }}
            >
              <h2>FUNTER</h2>
            </IonButton>
            {canSearch ? <Searchbar /> : <></>}
            {isLoggedIn ? (
              <IonChip id="user-avatar" slot="end" color="light">
                <IonAvatar>
                  <img
                    src="https://ionicframework.com/docs/demos/api/avatar/avatar.svg"
                    alt="user"
                  />
                </IonAvatar>
                <IonLabel>{displayName}</IonLabel>
              </IonChip>
            ) : (
              <IonButton
                slot="end"
                shape="round"
                color="light"
                style={{ margin: "0 5%" }}
                mode="ios"
                href="/auth"
                routerDirection="forward"
              >
                Login
              </IonButton>
            )}
            <UserPopover />
          </IonToolbar>
        </div>

        {banner ? (
          <header className="banner">
            <IonTitle
              slot="start"
              style={{ fontSize: "2.25em", color: "white", margin: "5%" }}
            >
              <h1 className="header-text">
                START YOUR FOOD
                <br />
                HUNTING JOURNEY.
              </h1>
            </IonTitle>
          </header>
        ) : null}
        {children}
      </div>
    </IonContent>
  );
};
