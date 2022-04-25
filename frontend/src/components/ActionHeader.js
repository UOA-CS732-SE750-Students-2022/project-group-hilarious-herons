import {
  IonButton,
  IonContent,
  IonTitle,
  IonToolbar,
  IonChip,
  IonAvatar,
  IonLabel,
  IonText,
} from "@ionic/react";
import { createAnimation } from "@ionic/react";
import { useState } from "react";
import { Searchbar } from "./Searchbar";
import { UserPopover } from "./UserPopover";
import "./ActionHeader.css";

export const ActionHeader = ({ banner, children }) => {
  const bannerUrl = `url("https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")`;
  const [headerVisible, setHeaderVisible] = useState(true);
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

  return (
    <IonContent
      style={{ minHeight: "50rem" }}
      scrollEvents={true}
      onIonScroll={(event) => handleScroll(event)}
    >
      <div>
        <div
          className="header-bg"
          style={{
            background: banner
              ? `linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) ), ${bannerUrl}`
              : "#ff9f1c",
          }}
        />
        <div
          className="header"
          id="header"
          style={{ background: banner ? "transparent" : "#ff9f1c" }}
        >
          <IonToolbar color="transparent">
            <IonText slot="start" style={{ color: "white", margin: "0 5%" }}>
              <h2>FUNTER</h2>
            </IonText>

            <Searchbar />

            {isLoggedIn ? (
              <IonChip
                id="user-avatar"
                slot="end"
                color="light"
                style={{ margin: "0 5%" }}
              >
                <IonAvatar>
                  <img src="https://ionicframework.com/docs/demos/api/avatar/avatar.svg" />
                </IonAvatar>
                <IonLabel>Username</IonLabel>
              </IonChip>
            ) : (
              <IonButton
                slot="end"
                shape="round"
                color="light"
                style={{ margin: "0 5%" }}
                mode="ios"
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
              <h1>
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
