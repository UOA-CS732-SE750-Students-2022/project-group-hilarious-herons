import { IonHeader, IonSearchbar, IonTitle } from "@ionic/react"

export const Navbar = () => {
    return (
        <IonHeader style={{ backgroundColor: "#FF9F1C", display: "flex" }}>
            <IonTitle color="ionHeaderText"><h2>FUNTER</h2></IonTitle>
            <IonSearchbar style={{ width: '50%', paddingRight: "3%" }} />
        </IonHeader>
    )
}