import React, { useState } from 'react';
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
    IonIcon
} from '@ionic/react';
import {
    star,
    heart,
    heartOutline
} from 'ionicons/icons';
import { NavLink } from 'react-router-dom';

const infoStyle = {
    position: 'absolute',
    top: '59%',
}

const FoodCard = ({ id = 0, image = "/mock.svg", foodName = "Food Name", rating = 5, timestamp = "21/04/2022", numberOfLikes = 1200, postLiked = false }) => {
    const [liked, setLiked] = useState(postLiked);
    const [totalLikes, setTotalLikes] = useState(numberOfLikes);
    const updateLike = () => {
        if (!liked) {
            setTotalLikes(totalLikes + 1)
        } else {
            setTotalLikes(totalLikes - 1)
        }
        setLiked(!liked)
        // Backend API method to be implemented. Use id.
    }

    return (
        <IonCard className="food-card">
            <div className='iamge-rate-distanse'>
                <NavLink to={"/food/" + id}>
                    <img src={image} alt="food-img" className='food-img' />
                </NavLink>
                <IonRow style={infoStyle}>
                    {/* Unsure if distance chip needed */}
                    {/* <IonChip className='rate'>
                        <IonLabel>1.2km</IonLabel>
                    </IonChip> */}
                    <IonChip className='rate'>
                        <IonIcon icon={star} />
                        <IonLabel>{rating}/5</IonLabel>
                    </IonChip>
                </IonRow>
            </div>
            <IonCardHeader>
                <IonCardTitle>{foodName}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <IonRow className='like-food'>
                    <IonCardSubtitle>{timestamp}</IonCardSubtitle>
                    <IonRow className="likes">
                        <IonIcon onClick={() => updateLike()} icon={liked ? heart : heartOutline} size="small" />
                        <IonLabel>{totalLikes}</IonLabel>
                    </IonRow>
                </IonRow>
            </IonCardContent>
        </IonCard>
    );
};

export default FoodCard;