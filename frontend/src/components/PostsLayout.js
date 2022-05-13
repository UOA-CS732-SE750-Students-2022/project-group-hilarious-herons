import {
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonIcon,
  IonFabButton,
  IonPopover,
  IonRadioGroup,
  IonLabel,
  IonItem,
  IonRadio,
  IonListHeader,
  IonList,
} from "@ionic/react";
import FoodCard from "./FoodCard";
import { BackHomeButton } from "./BackHomeButton";
import { useEffect, useState } from "react";
import { funnel, arrowUp, arrowDown } from "ionicons/icons";

export const PostsLayout = ({
  isHomePage = false,
  dataForCards = [],
  isNoSearchResult,
}) => {
  const unsorted = dataForCards;

  const [cardsToDisplay, setCardsToDisplay] = useState(unsorted);
  const [sortOrder, setSortOrder] = useState("ASC");
  const [showMobileModal, setShowMobileModal] = useState(false);

  useEffect(() => {
    let sorted = [...unsorted];
    switch (sortOrder) {
      case "ASC":
        sorted.sort((a, b) => (a.rating > b.rating ? 1 : -1));
        break;
      case "DESC":
        sorted.sort((a, b) => (a.rating < b.rating ? 1 : -1));
        break;
      default:
        sorted = [...unsorted];
        break;
    }
    setCardsToDisplay(sorted);
  }, [sortOrder]);

  if (!isNoSearchResult) {
    return (
      <IonGrid>
        {isHomePage ? <></> : <BackHomeButton />}
        <IonRow class="ion-justify-content-end ion-padding-end">
          <IonFabButton
            size="large"
            color="light"
            className="ion-no-shadows"
            id="sort-button"
          >
            <IonIcon icon={funnel} size="small" />
          </IonFabButton>
          <IonPopover trigger="sort-button" size="auto" mode="ios">
            <IonList inset={true}>
              <IonRadioGroup onIonChange={(e) => setSortOrder(e.target.value)}>
                <IonListHeader>
                  <IonLabel>Sort order</IonLabel>
                </IonListHeader>

                <IonItem>
                  <IonLabel>
                    Rating <IonIcon icon={arrowUp} size="small" />
                  </IonLabel>
                  <IonRadio value="DESC" />
                </IonItem>

                <IonItem>
                  <IonLabel>
                    Rating <IonIcon icon={arrowDown} size="small" />
                  </IonLabel>
                  <IonRadio value="ASC" />
                </IonItem>

                <IonItem>
                  <IonLabel>
                    Distance <IonIcon icon={arrowDown} size="small" />
                  </IonLabel>
                  <IonRadio value="" />
                </IonItem>
              </IonRadioGroup>
            </IonList>
          </IonPopover>
        </IonRow>

        <IonRow class="ion-justify-content-center no-padding">
          {cardsToDisplay.map((cardData, index) => {
            if (typeof cardData.image !== "undefined") {
              return (
                <IonCol
                  size="auto"
                  key={index}
                  class="no-padding text-center ion-item "
                  style={{ maxWidth: "365px", minWidth: "365px" }}
                >
                  <FoodCard
                    id={cardData.id}
                    image={cardData.image}
                    foodName={cardData.foodName}
                    rating={cardData.rating}
                    timestamp={cardData.timestamp}
                    numberOfLikes={cardData.numberOfLikes}
                    postLiked={cardData.postLiked}
                  />
                </IonCol>
              );
            } else {
              return <IonCol key={index}></IonCol>;
            }
          })}
        </IonRow>
      </IonGrid>
    );
  } else {
    return (
      <IonGrid style={{ textAlign: "center" }}>
        <IonText color="ionContentHeaderText" style={{ fontSize: "xx-large" }}>
          <h1>None of the posts match the search</h1>
          <p>Please try another search</p>
        </IonText>
      </IonGrid>
    );
  }
};
