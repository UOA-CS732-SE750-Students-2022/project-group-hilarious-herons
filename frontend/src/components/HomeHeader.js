import { IonHeader, IonSearchbar, IonTitle } from "@ionic/react"
import banner from './resources/banner.png'

export const HomeHeader = () => {
    return (
        <IonHeader style={{ backgroundImage: `url(${banner})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPositon: "center", height: '50%' }}>
            <div>
                <IonTitle style={{ color: "white" }}><h2>FUNTER</h2></IonTitle>
                <IonTitle style={{ color: "white" }}><h1>Something about the app</h1></IonTitle>
                <IonSearchbar style={{ width: '50%', float: "right", paddingRight: "3%" }} />
            </div>
        </IonHeader>
    )
}