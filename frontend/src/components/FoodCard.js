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

const LikedIcon = ({ id, isPostLiked }) => {
    const [liked, setLiked] = useState(isPostLiked);
    const updateLike = () => {
        setLiked(!liked)
        // Backend API method to be implemented. Use id.
    }
    if (liked) {
        return (
            <IonIcon
                onClick={() => updateLike()}
                icon={heart}
                size="small" />
        )
    } else {
        return (
            <IonIcon
                onClick={() => updateLike()}
                icon={heartOutline}
                size="small" />
        )
    }
}

const FoodCard = ({ id = 0, foodName = "Food Name", rating = 5, timestamp="21/04/2022", numberOfLikes = 1200, postLiked = false }) => {

    return (
        <IonCard className="food-card">
            <div className='iamge-rate-distanse'>
                <NavLink to={"/"}>
                    {/* Need top change to={"/"} to something with id */}
                    <img src="/mock.svg" alt="food-img" className='food-img' />
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
                        <LikedIcon isPostLiked={postLiked} />
                        <IonLabel>{numberOfLikes}</IonLabel>
                    </IonRow>
                </IonRow>
            </IonCardContent>
        </IonCard>
    );
};

export default FoodCard;