import React from 'react';
import {
    IonCard, 
    IonCardHeader, 
    IonCardTitle,
    IonCardSubtitle, 
    IonCardContent, 
    IonGrid,
    IonRow, 
    IonCol,
    IonIcon, 
    IonButton } from '@ionic/react';
import { heartOutline, thumbsUpOutline} from 'ionicons/icons';
import './FoodCard.css';

const infoStyle = {
    position: 'absolute', 
    width: '100%',
    top:'60%',
    color:'white',
    fontWeight: 'bold'
}

const rateStyle = {
    textAlign: 'right',
    paddingRight: '0.5em',
}


const FoodCard = () => {
  return (
    <IonCard className="food-card">
        <div className='iamge-rate-distanse'>
            <img src="/mock.svg" alt="food-img" className='food-img'/>
            <IonRow style={infoStyle}>
                <IonCol>1.2km</IonCol>
                <IonCol style={rateStyle}>3.5/5</IonCol>
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
                    icon={ thumbsUpOutline } 
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


