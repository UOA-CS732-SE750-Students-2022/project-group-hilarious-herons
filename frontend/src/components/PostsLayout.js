import { IonGrid, IonRow, IonCol } from '@ionic/react';
// import FoodCard from './FoodCard';

export const PostsLayout = ({ cards }) => {
    // cards = [<FoodCard />, <FoodCard />, <FoodCard />, <FoodCard />, <FoodCard />, <FoodCard />, <FoodCard />, <FoodCard />];
    return (
        <IonGrid>
            <IonRow>
                {cards.map((card) => {
                    return (
                        <IonCol size='auto'>
                            {card}
                        </IonCol>
                    );
                })}
            </IonRow>
        </IonGrid>
    )
}