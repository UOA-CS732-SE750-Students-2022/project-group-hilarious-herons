import React from "react";
import "./FoodCard.css";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonChip,
  IonLabel,
  IonRow,
  IonIcon,
} from "@ionic/react";
import { star, compass } from "ionicons/icons";
import { NavLink } from "react-router-dom";
import { LikeButton } from "./LikeButton";

const infoStyle = {
  position: "absolute",
  top: "59%",
};

const FoodCard = ({
  id = 0,
  image = "/no_image.jpg",
  foodName = "Food Name",
  rating = 5,
  timestamp = "21/04/2022",
  numberOfLikes = 1200,
  postLiked = false,
  distance,
}) => {
  return (
    <IonCard className="food-card">
      <NavLink to={"/food/" + id} style={{ textDecoration: "none" }}>
        <div className="iamge-rate-distanse">
          <div className="img-container">
            <img src={image} alt="food-img" className="food-img" />
          </div>

          <IonRow style={infoStyle}>
            <IonChip className="rate">
              <IonIcon icon={compass} />
              <IonLabel className="label">
                {distance ? distance + " km" : "Somewhere"}
              </IonLabel>
            </IonChip>
            <IonChip className="rate">
              <IonIcon icon={star} />
              <IonLabel className="label">{rating} / 5</IonLabel>
            </IonChip>
          </IonRow>
        </div>
        <IonCardHeader>
          <IonCardTitle color="ionFoodCardTitle" mode="md">
            <strong>
              {foodName.length >= 33
                ? foodName.substring(0, 25) + "...."
                : foodName}
            </strong>
          </IonCardTitle>
        </IonCardHeader>
      </NavLink>

      <IonCardContent>
        <IonRow className="like-food">
          <IonCardSubtitle>{timestamp}</IonCardSubtitle>
          <IonRow className="likes">
            <LikeButton
              id={id}
              postLiked={postLiked}
              numberOfLikes={numberOfLikes}
            />
          </IonRow>
        </IonRow>
      </IonCardContent>
    </IonCard>
  );
};

export default FoodCard;
