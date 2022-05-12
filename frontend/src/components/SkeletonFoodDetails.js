import {
  IonCardContent,
  IonCol,
  IonGrid,
  IonItem,
  IonRow,
  IonSkeletonText,
} from "@ionic/react";

export const SkeletonFoodDetails = () => {
  return (
    <IonCardContent>
      <IonGrid>
        <IonRow>
          {/* Image */}
          <IonCol size="12" sizeLg="6">
            <IonSkeletonText animated style={{ height: "90%" }} />
          </IonCol>
          {/* Title */}
          <IonCol size="12" sizeLg="6">
            <IonItem lines="none">
              <IonSkeletonText animated style={{ height: "2rem" }} />
            </IonItem>
            {/* Rating */}
            <IonItem lines="none">
              <IonSkeletonText
                animated
                style={{ height: "1.5rem", width: "30%" }}
              />
            </IonItem>
            {/* Tags */}
            <IonItem lines="none">
              <IonSkeletonText
                animated
                style={{ height: "1.5rem", width: "80%" }}
              />
            </IonItem>
            {/* Description */}
            <IonSkeletonText
              animated
              style={{ height: "1rem", margin: "0.5rem 1rem" }}
            />
            <IonSkeletonText
              animated
              style={{ height: "1rem", margin: "0.5rem 1rem" }}
            />
            {/* Location label */}
            <IonItem lines="none">
              <IonSkeletonText
                animated
                style={{ height: "1.5rem", width: "30%" }}
              />
            </IonItem>
            {/* Location */}
            <IonSkeletonText
              animated
              style={{ height: "1rem", margin: "0.5rem 1rem" }}
            />
            <IonSkeletonText
              animated
              style={{ height: "1rem", margin: "0.5rem 1rem" }}
            />
            {/* Opening hour label */}
            <IonItem lines="none">
              <IonSkeletonText
                animated
                style={{ height: "1.5rem", width: "30%" }}
              />
            </IonItem>
            {/* Opening hours */}
            <IonSkeletonText
              animated
              style={{
                height: "1rem",
                width: "50%",
                margin: "0.5rem 1rem",
              }}
            />
            <IonSkeletonText
              animated
              style={{
                height: "1rem",
                width: "50%",
                margin: "0.5rem 1rem",
              }}
            />
            <IonSkeletonText
              animated
              style={{
                height: "1rem",
                width: "50%",
                margin: "0.5rem 1rem",
              }}
            />
            <IonSkeletonText
              animated
              style={{
                height: "1rem",
                width: "50%",
                margin: "0.5rem 1rem",
              }}
            />
            {/* Like button */}
            <IonItem lines="none">
              <IonSkeletonText
                slot="end"
                animated
                style={{ height: "2rem", width: "4rem" }}
              />
            </IonItem>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonCardContent>
  );
};
