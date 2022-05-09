import React, { useState } from "react";
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
import { star, heart, heartOutline } from "ionicons/icons";
import { NavLink } from "react-router-dom";
import { PostService } from "../services/PostService";
import { userService } from "../services/UserService";

const infoStyle = {
  position: "absolute",
  top: "59%",
};

const FoodCard = ({
  id = 0,
  image = "/mock.svg",
  foodName = "Food Name",
  rating = 5,
  timestamp = "21/04/2022",
  numberOfLikes = 1200,
  postLiked = false,
}) => {
  const [liked, setLiked] = useState(postLiked);
  const [totalLikes, setTotalLikes] = useState(numberOfLikes);

  const updateLike = async () => {
    const user = await userService.getUser(localStorage.getItem("uid"));
    const uid = user._id;
    const favouritePosts = user.favourites;

    if (!liked) {
      setTotalLikes(totalLikes + 1);

      // update server
      PostService.likePost(id);
      favouritePosts.push(id);
      userService.updateUser(uid, user);
    } else {
      setTotalLikes(totalLikes - 1);

      // update server
      PostService.unlikePost(id);
      const idx = favouritePosts.indexOf(id);
      favouritePosts.splice(idx, 1);
      userService.updateUser(uid, user);
    }

    setLiked(!liked);
    console.log("after", user);
  };

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
            <IonIcon
              onClick={() => updateLike()}
              icon={liked ? heart : heartOutline}
              size="small"
            />
            <IonLabel>{totalLikes}</IonLabel>
          </IonRow>
        </IonRow>
      </IonCardContent>
    </IonCard>
  );
};

export default FoodCard;
