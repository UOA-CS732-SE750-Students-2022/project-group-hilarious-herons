import {
  IonAvatar,
  IonCard,
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
  heart,
  heartOutline,
} from "ionicons/icons";
import { useState } from "react";

export const FoodDetailsCard = () => {
  const [liked, setLiked] = useState(false);
  const getData = () => {
    return {
      foodName: "Food post name",
      rating: 4,
      timestamp: new Date(),
      image:
        "https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      tags: ["burger", "fast food", "fries", "meat"],
      dietryRequirements: ["Vegan", "Gluten-free", "Vegetarian"],
      bodyText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      restaurant: {
        name: "Restaurant name",
        address: "23 Lorem ipsum dolor, sit amet, 1010",
        hours: {
          weekdays: "9:00am - 6:00pm",
          weekends: "10:00am - 5:00pm",
        },
      },
    };
  };
  const {
    foodName,
    rating,
    timestamp,
    image,
    tags,
    dietryRequirements,
    bodyText,
    restaurant,
  } = getData();

  const getRating = () => {
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
  };

  return (
    <IonCard>
      <IonGrid>
        <IonRow>
          <IonCol size="12" sizeSm="6">
            <IonImg src={image} />
          </IonCol>

          <IonCol size="12" sizeSm="6">
            <IonItem lines="none">
              <IonCardTitle>
                <b>{foodName}</b>
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

            <IonItem lines="none">{getRating()}</IonItem>

            <IonItemGroup>
              {tags.map((tag, idx) => {
                return (
                  <IonChip color="primary" key={idx}>
                    <IonLabel>{tag}</IonLabel>
                  </IonChip>
                );
              })}
            </IonItemGroup>

            <IonItemGroup>
              {dietryRequirements.map((diet, idx) => {
                return (
                  <IonChip color="primary" outline key={idx}>
                    <IonLabel>{diet}</IonLabel>
                  </IonChip>
                );
              })}
            </IonItemGroup>

            <IonItem lines="none">{bodyText}</IonItem>

            <IonItem lines="none">
              <IonIcon icon={locationOutline} slot="start" />
              <IonCardSubtitle color="dark">
                <b>Location</b>
              </IonCardSubtitle>
            </IonItem>

            <IonItem lines="none">
              <IonText>
                {restaurant.name}
                <br />
                {restaurant.address}
              </IonText>
            </IonItem>

            <IonItem lines="none">
              <IonIcon icon={timeOutline} slot="start" />
              <IonCardSubtitle color="dark">
                <b>Opening hours</b>
              </IonCardSubtitle>
            </IonItem>

            <IonItem lines="none">
              <IonText>
                {`Mon - Fri ---- ${restaurant.hours.weekdays}`}
                <br />
                {`Sat - Sun ---- ${restaurant.hours.weekends}`}
              </IonText>
            </IonItem>

            <IonItem lines="none">
              <IonIcon
                slot="end"
                size="large"
                icon={liked ? heart : heartOutline}
                onClick={() => setLiked(!liked)}
              />
            </IonItem>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonCard>
  );
};
