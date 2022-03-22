import React from 'react';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardContent,IonRow, IonIcon,} from '@ionic/react';
import { heartOutline, thumbsUpOutline} from 'ionicons/icons';
import './FoodCard.css';

const FoodCard = () => {
  return (
    <IonCard class="food-card">
        <img src="/mock.svg" alt="food-img" className='food-img'/>
        <IonCardHeader className="ion-inherit-color ios hydrated">   
            <IonIcon icon = { heartOutline } /> 
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


