import React from 'react';
import {
    IonCard, 
    IonCardHeader, 
    IonCardTitle,
    IonCardSubtitle, 
    IonCardContent, 
    IonChip,
    IonLabel,
    IonRow, 
    IonIcon } from '@ionic/react';
import { star, heartOutline} from 'ionicons/icons';
import './FoodCard.css';

const infoStyle = {
    position: 'absolute', 
    top:'59%',
}

const FoodCard = () => {
  return (
    <IonCard className="food-card">
        <div className='iamge-rate-distanse'>
            <img src="/mock.svg" alt="food-img" className='food-img'/>
            <IonRow style={ infoStyle }>
                    <IonChip>
                        <IonLabel>1.2km</IonLabel>
                    </IonChip>
                    <IonChip className='rate'>
                        <IonIcon icon={star}/>
                        <IonLabel>3.5/5</IonLabel>
                    </IonChip>
            </IonRow>
        </div>
        <IonCardHeader> 
            <IonCardTitle>Food Name</IonCardTitle> 
        </IonCardHeader>
        <IonCardContent>
            <IonRow className='like-food'>
                <IonCardSubtitle>dd/mm/yyyy</IonCardSubtitle>
                <IonRow style={{display:'inline-block'}}>
                    <IonIcon 
                        icon={ heartOutline } 
                        size="small" 
                        style={{verticalAlign: 'text-top'}}/>
                    <IonLabel>1.2k</IonLabel>
                </IonRow>   
            </IonRow>
        </IonCardContent>
  </IonCard>
  );
};

export default FoodCard;


