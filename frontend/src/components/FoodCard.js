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
import { star } from "ionicons/icons";
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
}) => {
  return (
    <IonCard className="food-card">
      <div className="iamge-rate-distanse">
        <NavLink to={"/food/" + id}>
          <img src={image} alt="food-img" className="food-img" />
        </NavLink>
        <IonRow style={infoStyle}>
          {/* Unsure if distance chip needed */}
          {/* <IonChip className='rate'>
                        <IonLabel>1.2km</IonLabel>
                    </IonChip> */}
          <IonChip className="rate">
            <IonIcon icon={star} />
            <IonLabel>{rating}/5</IonLabel>
          </IonChip>
        </IonRow>
      </div>
      <IonCardHeader>
        <IonCardTitle>{foodName}</IonCardTitle>
      </IonCardHeader>
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
