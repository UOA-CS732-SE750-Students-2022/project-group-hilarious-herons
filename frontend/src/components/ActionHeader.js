import {
  IonButton,
  IonContent,
  IonHeader,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { createAnimation } from "@ionic/react";
import { useState } from "react";

export const ActionHeader = ({ banner, children }) => {
  const bannerUrl = `url("https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")`;
  const [headerVisible, setHeaderVisible] = useState(true);
  const shrinkAnimation = createAnimation()
    .addElement(document.querySelector(".toolbar"))
    .duration(500)
    .easing("ease-out")
    .fromTo("height", "300px", "0")
    .fromTo("transform", "translateY(0px)", "translateY(-500px)")
    .fromTo("opacity", "1", "0");
  const growAnimation = createAnimation()
    .addElement(document.querySelector(".toolbar"))
    .duration(500)
    .easing("ease-in")
    .fromTo("height", "0", "300px")
    .fromTo("transform", "translateY(-300px)", "translateY(0px)")
    .fromTo("opacity", "0", "1");
  const colorInAnimation = createAnimation()
    .addElement(document.querySelector(".header"))
    .duration(500)
    .easing("ease-in")
    .to("background", "#ff9f1c");
  const colorOutAnimation = createAnimation()
    .addElement(document.querySelector(".header"))
    .duration(500)
    .easing("ease-out")
    .to(
      "background",
      `linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) ), ${bannerUrl}`
    )
    .to("backgroundRepeat", "no-repeat")
    .to("backgroundSize", "cover");

  return (
    <>
      <IonHeader
        class="header"
        style={{
          background: banner
            ? `linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) ), ${bannerUrl}`
            : "#ff9f1c",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <IonToolbar color="transparent">
          <IonTitle slot="start" style={{ color: "white" }}>
            <h2>FUNTER</h2>
          </IonTitle>
          <IonSearchbar
            class="searchBar"
            mode="ios"
            style={{ padding: "0" }}
            color="light"
            padding="0"
          />
          <IonButton
            slot="end"
            shape="round"
            color="light"
            style={{ padding: "0 50px" }}
            mode="ios"
          >
            Login
          </IonButton>
        </IonToolbar>

        {banner ? (
          <IonToolbar class="toolbar" color="transparent">
            <IonTitle
              slot="start"
              style={{ fontSize: "2.25em", color: "white" }}
            >
              <h1>
                START YOUR FOOD
                <br />
                HUNTING JOURNEY.
              </h1>
            </IonTitle>
          </IonToolbar>
        ) : null}
      </IonHeader>

      <IonContent
        scrollEvents={true}
        onIonScroll={(event) => {
          if (event.detail.scrollTop === 0 && !headerVisible) {
            setHeaderVisible(true);
            growAnimation.play();
            if (banner) {
              colorOutAnimation.play();
            }
          }
          if (event.detail.scrollTop > 0 && headerVisible) {
            setHeaderVisible(false);
            shrinkAnimation.play();
            if (banner) {
              colorInAnimation.play();
            }
          }
        }}
      >
        {children}
      </IonContent>
    </>
  );
};
