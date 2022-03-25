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
    IonCol,
    IonIcon } from '@ionic/react';
import { star, heartOutline} from 'ionicons/icons';
import './FoodCard.css';

const infoStyle = {
    position: 'absolute', 
    width: '100%',
    top:'59%',
    fontWeight: 'bold',
}

const FoodCard = () => {
  return (
    <IonCard className="food-card">
        <div className='iamge-rate-distanse'>
            <img src="/mock.svg" alt="food-img" className='food-img'/>
            <IonRow style={infoStyle}>
                <IonCol>
                    <IonChip>
                        <IonLabel>1.2km</IonLabel>
                    </IonChip>
                </IonCol>
                <IonCol>
                    <IonChip className='rate'>
                        <IonIcon icon={star}/>
                        <IonLabel>3.5/5</IonLabel>
                    </IonChip>
                    
                </IonCol>
            </IonRow>
        </div>
        <IonCardHeader> 
            <IonCardTitle>Food Name</IonCardTitle> 
        </IonCardHeader>
        <IonCardContent>
            <IonRow className='like-food'>
                <IonCardSubtitle>dd/mm/yyyy</IonCardSubtitle>
                <IonRow>
                    <IonIcon 
                    icon={ heartOutline } 
                    size="small" 
                    color='primary'/>
                    <p>1.2k</p>
                </IonRow>   
            </IonRow>
        </IonCardContent>
  </IonCard>
  );
};

export default FoodCard;


