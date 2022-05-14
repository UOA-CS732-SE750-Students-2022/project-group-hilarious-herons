import {
  IonButton,
  IonContent,
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
            >
              <h2 className="funter">FUNTER</h2>
            </IonButton>
            {canSearch ? <Searchbar /> : <></>}
            {isLoggedIn ? (
              <IonChip
                id="user-avatar"
                slot="end"
                color="light"
                style={{ margin: "0 5%", height: "fit-content" }}
              >
                <IonAvatar style={{ height: "2.5rem", width: "fit-content" }}>
                  <img
                    src="https://ionicframework.com/docs/demos/api/avatar/avatar.svg"
                    alt="user"
                  />
                </IonAvatar>
                <IonLabel color="white" className="username">
                  <strong>{displayName}</strong>
                </IonLabel>
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
                Sign in
              </IonButton>
            )}
            <UserPopover />
          </IonToolbar>
        </div>

        {banner ? (
          <header className="banner">
            <div class="ion-text-wrap" className="slogan">
              <h1 className="header-text">START YOUR FOOD HUNTING JOURNEY.</h1>
            </div>
          </header>
        ) : null}
        <div className="content">{children}</div>
      </div>
    </IonContent>
  );
};
