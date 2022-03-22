import { IonPage } from "@ionic/react"
import { Error404 } from "../components/Error404"
import { Navbar } from "../components/Navbar"

export const ErrorPage = () => {
    return (
        <IonPage>
            <Navbar />
            <Error404 />
        </IonPage>
    )
}