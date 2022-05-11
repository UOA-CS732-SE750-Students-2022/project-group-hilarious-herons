import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonCol,
  IonGrid,
  IonIcon,
  IonImg,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonRow,
  IonText,
} from "@ionic/react";
import {
  personCircle,
  star,
  starOutline,
  timeOutline,
  locationOutline,
  openOutline,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import { PostService } from "../services/PostService";
import { useParams } from "react-router-dom";
import { LikeButton } from "./LikeButton";
import { userService } from "../services/UserService";

export const FoodDetailsCard = () => {
  const [foodData, setFoodData] = useState({});
  const foodID = useParams().id;
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const getPostData = async () => {
      const data = await PostService.getPostDetails(foodID);
      setFoodData(data);

      // Fetch the user if signed in
      const uid = localStorage.getItem("uid");
      if (uid !== null) {
        const { favourites } = await userService.getUser(uid);
        const liked = favourites.indexOf(foodID) > -1 ? true : false;

        setLiked(liked);
      }
    };

    getPostData();
  }, [foodID]);

  const getData = () => {
    return {
      timestamp: new Date(),
    };
  };

  const { timestamp } = getData();

  const getRating = (rating) => {
    if (rating) {
      rating = Math.round(rating);
      const filledStars = [...Array(rating + 1).keys()].slice(1);
      const emptyStars = [...Array(5 - rating + 1).keys()].slice(1);
      return (
        <>
          {filledStars.map((num) => {
            return <IonIcon icon={star} key={num} />;
          })}
          {emptyStars.map((num) => {
            return <IonIcon icon={starOutline} key={num} />;
          })}
        </>
      );
    }
  };

  return (
    <IonCard>
      <IonCardContent>
        <IonGrid>
          <IonRow>
            <IonCol size="12" sizeLg="6">
              <IonImg
                src={foodData?.imageURLs}
                style={{ borderRadius: "1rem", overflow: "hidden" }}
              />
            </IonCol>

            <IonCol size="12" sizeLg="6">
              <IonItem lines="none">
                <IonCardTitle>
                  <b>{foodData?.foodName}</b>
                  <IonCardSubtitle style={{ marginTop: "0.5rem" }}>
                    {timestamp.toLocaleDateString()}
                  </IonCardSubtitle>
                </IonCardTitle>

                <IonAvatar slot="end">
                  <IonIcon
                    icon={personCircle}
                    size="large"
                    color="ionContentHeaderText"
                  />
                </IonAvatar>
              </IonItem>

              <IonItem lines="none">{getRating(foodData?.rating)}</IonItem>

              <IonItemGroup style={{ pointerEvents: "none" }}>
                {foodData?.tags &&
                  foodData?.tags.map((tag, idx) => {
                    return (
                      <IonChip color="primary" key={idx}>
                        <IonLabel>{tag}</IonLabel>
                      </IonChip>
                    );
                  })}
              </IonItemGroup>

              <IonItemGroup style={{ pointerEvents: "none" }}>
                {foodData?.dietryRequirements &&
                  foodData?.dietryRequirements.map((diet, idx) => {
                    return (
                      <IonChip color="primary" outline key={idx}>
                        <IonLabel>{diet}</IonLabel>
                      </IonChip>
                    );
                  })}
              </IonItemGroup>

              <IonItem lines="none">{foodData?.bodyText}</IonItem>

              <IonItem lines="none">
                <IonIcon icon={locationOutline} slot="start" />
                <IonCardSubtitle color="dark">
                  <b>Location</b>
                </IonCardSubtitle>
              </IonItem>

              <IonItem lines="none">
                <IonText>
                  {foodData?.restaurant?.name}
                  <br />
                  {foodData?.restaurant?.address}
                </IonText>
                <IonButton
                  fill="clear"
                  color="light"
                  style={{ marginTop: "1rem" }}
                  href={foodData?.restaurant?.googleMapsURL}
                  target="_blank"
                >
                  <IonIcon icon={openOutline} slot="end" size="md" />
                </IonButton>
              </IonItem>

              <IonItem lines="none">
                <IonIcon icon={timeOutline} slot="start" />
                <IonCardSubtitle color="dark">
                  <b>Opening hours</b>
                </IonCardSubtitle>
              </IonItem>

              <IonItem lines="none">
                <IonText slot="start"></IonText>
                <IonText>
                  {foodData?.restaurant?.openHours.map((day) => {
                    return (
                      <p key={day}>
                        {day} <br />
                      </p>
                    );
                  })}
                </IonText>
              </IonItem>

              <IonItem lines="none" />
              <IonItem lines="none">
                <div slot="end">
                  <LikeButton
                    id={foodID}
                    postLiked={liked}
                    numberOfLikes={foodData?.numberOfLikes}
                  />
                </div>
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};
