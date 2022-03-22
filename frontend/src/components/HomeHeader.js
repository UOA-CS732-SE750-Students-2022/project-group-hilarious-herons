import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { createAnimation } from "@ionic/react";
import { useState } from "react";

export const HomeHeader = ({ children }) => {
  const [headerVisible, setHeaderVisible] = useState(true);
  const fadeOutAnimation = createAnimation()
    .addElement(document.querySelector(".slogan"))
    .duration(500)
    .fromTo("transform", "translateY(0px)", "translateY(-200px)");
  const fadeInAnimation = createAnimation()
    .addElement(document.querySelector(".slogan"))
    .duration(500)
    .fromTo("transform", "translateY(-200px)", "translateY(0px)");

  return (
    <>
      <IonHeader
        className="ion-no-border"
        style={{
          backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) ), url("https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundColor: "#ff9f1c",
        }}
      >
        <IonToolbar color="transparent">
          <IonTitle size="large" slot="start" style={{ color: "white" }}>
            <h2>FUNTER</h2>
          </IonTitle>
          <IonSearchbar shape="round" style={{ width: "60%" }} />
          <IonButton
            slot="end"
            shape="round"
            color="light"
            style={{ paddingRight: "50px" }}
          >
            Login
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent
        class="header"
        scrollEvents={true}
        onIonScroll={(event) => {
          if (event.detail.scrollTop === 0 && !headerVisible) {
            setHeaderVisible(true);
            fadeInAnimation.play();
          }
          if (event.detail.scrollTop > 0 && headerVisible) {
            setHeaderVisible(false);
            fadeOutAnimation.play();
          }
        }}
      >
        <IonHeader
          class="header"
          style={{
            backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) ), url("https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <IonToolbar
            class="toolbar"
            color="transparent"
            style={{ paddingBottom: "50px" }}
          >
            <IonTitle
              class="slogan"
              slot="start"
              style={{ fontSize: "36px", width: "40%", color: "white" }}
            >
              <h1>
                START YOUR FOOD
                <br />
                HUNTING JOURNEY.
              </h1>
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        {children}

        <IonList>
          <IonItem>1</IonItem>
          <IonItem>2</IonItem>
          <IonItem>3</IonItem>
          <IonItem>4</IonItem>
          <IonItem>5</IonItem>
          <IonItem>6</IonItem>
          <IonItem>7</IonItem>
          <IonItem>8</IonItem>
          <IonItem>9</IonItem>
          <IonItem>0</IonItem>
          <IonItem>1</IonItem>
          <IonItem>2</IonItem>
          <IonItem>3</IonItem>
          <IonItem>4</IonItem>
          <IonItem>5</IonItem>
          <IonItem>6</IonItem>
          <IonItem>7</IonItem>
          <IonItem>8</IonItem>
          <IonItem>9</IonItem>
          <IonItem>0</IonItem>
        </IonList>
      </IonContent>
    </>
  );
};
