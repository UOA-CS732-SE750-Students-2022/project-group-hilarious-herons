import React from 'react';
import './FoodCard.css';
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
import { 
    star, 
    heartOutline 
} from 'ionicons/icons';

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
                    <IonChip className='rate'>
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
                <IonRow className="likes">
                    <IonIcon 
                        icon={ heartOutline } 
                        size="small"/>
                    <IonLabel>1.2k</IonLabel>
                </IonRow>   
            </IonRow>
        </IonCardContent>
  </IonCard>
  );
};

export default FoodCard;


