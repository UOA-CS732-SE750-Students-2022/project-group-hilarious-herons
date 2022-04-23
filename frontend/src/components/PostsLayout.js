import { IonGrid, IonRow, IonCol } from '@ionic/react';
import FoodCard from './FoodCard';

export const PostsLayout = ({ dataForCards=[] }) => {
    return (
        <IonGrid>
            <IonRow>
                {dataForCards.map((cardData) => {
                    return (
                        <IonCol size='auto'>
                            <FoodCard />
                        </IonCol>
                    );
                })}
            </IonRow>
        </IonGrid>
    )
}