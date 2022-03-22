import { IonPage } from "@ionic/react"
import { HomeHeader } from "../components/HomeHeader"
import FoodCard from "../components/FoodCard"


export const HomePage = () => {
    return (
        <IonPage>
            <HomeHeader />       
            <FoodCard />          
        </IonPage>
    )
}