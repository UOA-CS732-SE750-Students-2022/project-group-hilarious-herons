import { IonGrid, IonRow, IonCol, IonContent, IonText } from '@ionic/react';
import FoodCard from './FoodCard';

export const PostsLayout = ({ dataForCards = [], isNoSearchResult }) => {
    if(!isNoSearchResult) {
        return (
            <IonGrid>
                <IonRow class="ion-justify-content-center no-padding">
                    { dataForCards.map((cardData, index) => {
                        if (typeof cardData.image !== 'undefined') {
                            return (
                                <IonCol 
                                    size='auto' 
                                    key={index} 
                                    class="no-padding text-center ion-item " 
                                    style={{ maxWidth: "365px", minWidth: "365px" }}
                                >
                                    <FoodCard 
                                        id={cardData.id} 
                                        image={cardData.image} 
                                        foodName={cardData.foodName} 
                                        rating={cardData.rating} 
                                        timestamp={cardData.timestamp} 
                                        umberOfLikes={cardData.numberOfLikes} 
                                        postLiked={cardData.postLiked} />
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