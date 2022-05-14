import {
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonCardSubtitle,
} from "@ionic/react";
import { FoodCard } from "./FoodCard";
import { Sorting } from "./Sorting";
import "./PostsLayout.css";

export const PostsLayout = ({
  dataForCards = [],
  isNoSearchResult = false,
}) => {

  if (!isNoSearchResult) {
    if (dataForCards.length === 0) {
      return (
        <IonGrid style={{ textAlign: "center", margin: "1.5rem" }}>
          <img
            src="/no-results-img.png"
            alt="Natasha Remarchuk"
            className="img"
          />
          <p className="img-attribution">
            Illustration by{" "}
            <a href="https://icons8.com/illustrations/author/292791">
              Anna Golde
            </a>{" "}
            from <a href="https://icons8.com/illustrations">Ouch!</a>
          </p>
          <IonText color="ionContentHeaderText" className="title-msg">
            <h1>No posts found</h1>
          </IonText>
        </IonGrid>
      );
    } else {
      return (
        <IonGrid>
          <Sorting />
          <IonRow class="ion-justify-content-center no-padding">
            {dataForCards.map((cardData, index) => {
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
                      distance={cardData.distance}
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
    }
  } else {
    return (
      <IonGrid style={{ textAlign: "center", margin: "1.5rem" }}>
        <img
          src="/no-results-img.png"
          alt="Natasha Remarchuk"
          className="img"
        />
        <p className="img-attribution">
          Illustration by{" "}
          <a href="https://icons8.com/illustrations/author/292791">
            Anna Golde
          </a>{" "}
          from <a href="https://icons8.com/illustrations">Ouch!</a>
        </p>

        <IonText color="ionContentHeaderText" className="title-msg">
          <h1>No matching results found</h1>
        </IonText>
        <IonCardSubtitle class="subtitle-msg">
          <p>Try another search keyword</p>
        </IonCardSubtitle>
      </IonGrid>
    );
  }
};
