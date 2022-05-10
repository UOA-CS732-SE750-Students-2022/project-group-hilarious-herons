import { IonGrid, IonRow, IonCol } from '@ionic/react';
import FoodCard from './FoodCard';

export const PostsLayout = ({ dataForCards = [] }) => {
    return (
        <IonGrid>
            <IonRow>
                {dataForCards.map((cardData, index) => {
                    if (typeof cardData.image !== 'undefined') {
                        return (
                            <IonCol size='auto' key={index}>
                                <FoodCard id={cardData.id} image={cardData.image} foodName={cardData.foodName} rating={cardData.rating} timestamp={cardData.timestamp} numberOfLikes={cardData.numberOfLikes} postLiked={cardData.postLiked} />
                            </IonCol>
                        );
                    } else {
                        return (<IonCol key={index}></IonCol>)
                    }
                })}
            </IonRow>
        </IonGrid>
    )
}