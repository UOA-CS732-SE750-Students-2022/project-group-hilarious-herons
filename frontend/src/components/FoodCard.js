import React from 'react';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardContent,IonRow, IonIcon,} from '@ionic/react';
import { heartOutline, thumbsUpOutline} from 'ionicons/icons';

const FoodCard = () => {
  return (
    <IonCard class="food-card">
        <IonIcon icon = { thumbsUpOutline } />
        <img src="/moke.jpg"/>
        <IonCardHeader class="ion-inherit-color ios hydrated">    
            <IonCardSubtitle role="heading" aria-level="2">Food Name</IonCardSubtitle>     
        </IonCardHeader>
        <IonCardContent>
            <IonRow>
                <IonCardSubtitle role="heading" aria-level="3">dd/mm/yyyy</IonCardSubtitle>
                < IonIcon icon = { thumbsUpOutline } />
            </IonRow>
        </IonCardContent>
  </IonCard>
  
  );
};

export default FoodCard;


