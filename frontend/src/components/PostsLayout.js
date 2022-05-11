import { IonGrid, IonRow, IonCol, IonContent, IonText } from '@ionic/react';
import FoodCard from './FoodCard';

export const PostsLayout = ({ dataForCards = [], isNoSearchResult }) => {
    console.log(isNoSearchResult);
    if(!isNoSearchResult) {
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
    } else {
        return ( 
            <IonGrid>
                <IonText>
                    <h1>None of the posts match the search</h1>
                    <p>Please try another search</p>
                </IonText>
            </IonGrid>
        )
    }
    
}