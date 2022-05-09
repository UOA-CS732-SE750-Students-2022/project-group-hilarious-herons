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
  useIonToast,
} from "@ionic/react";
import {
  personCircle,
  star,
  starOutline,
  timeOutline,
  locationOutline,
  heart,
  heartOutline,
  openOutline,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import { PostService}  from '../services/PostService';
import { useParams } from "react-router-dom";

export const FoodDetailsCard = () => {
  const [liked, setLiked] = useState(false);
  const [present, dismiss] = useIonToast();
  const [foodData, setFoodData] = useState({});
  const foodID = useParams().id;
  
  useEffect(() => {
    PostService.getPostDetails(foodID.substring(1)).then((res) => {
      setFoodData(res)
    })
  }, []);

  const getData = () => {
    return {
      timestamp: new Date(),
    };
  };

  const {
    timestamp,
  } = getData();

  const getRating = (rating) => {
    if(rating) {
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

  const addToLikedPosts = () => {
    setLiked(!liked);
    // Close current toasts if any and show new toast message
    dismiss().then(() => {
      present({
        message: !liked ? "Added to liked posts!" : "Removed from liked posts",
        mode: "ios",
        color: "dark",
        duration: 2000,
      });
    });
  };

  return (
    <IonCard>
      <IonCardContent>
      <IonGrid>
        <IonRow>
          <IonCol size="12" sizeLg="6">
            <IonImg
              src={ foodData?.imageURLs }
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

            <IonItemGroup style={{pointerEvents: 'none'}}>
              { foodData?.tags && foodData?.tags.map((tag, idx) => {
                return (
                  <IonChip color="primary" key={idx}>
                    <IonLabel>{tag}</IonLabel>
                  </IonChip>
                );
              })
              }
            </IonItemGroup>

            <IonItemGroup  style={{pointerEvents: 'none'}}>
              {foodData?.dietryRequirements && foodData?.dietryRequirements.map((diet, idx) => {
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
              <IonText slot="start">
              </IonText>
              <IonText>
                {foodData?.restaurant?.openHours.map((day) => {
                  return <p key={day}>{day} <br/></p>
                })}
              </IonText>
            </IonItem>

            <IonItem lines="none">
              <IonButton
                slot="end"
                fill="clear"
                color="light"
                onClick={() => addToLikedPosts()}
              >
                <IonRow style={{ display: 'inline-block'}}>
                  <IonIcon size="large" icon={liked ? heart : heartOutline} style={{ verticalAlign: "middle" }}/>
                  <IonText color="dark">{ foodData?.numberOfLikes }</IonText>
                </IonRow>
              </IonButton>
            </IonItem>

            <IonItem lines="none" />
          </IonCol>
        </IonRow>
      </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};
