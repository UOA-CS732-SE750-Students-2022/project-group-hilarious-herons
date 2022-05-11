import { IonGrid, IonRow, IonCol } from "@ionic/react";
import FoodCard from "./FoodCard";

export const PostsLayout = ({ dataForCards = [] }) => {
  return (
    <IonGrid>
      <IonRow class="ion-justify-content-center no-padding">
        {dataForCards.map((cardData, index) => {
          if (typeof cardData.image !== "undefined") {
            return (
              <IonCol
                size="auto"
                // sizeLg="auto"
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
};
