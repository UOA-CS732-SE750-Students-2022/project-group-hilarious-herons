import { 
    IonButton, 
    IonIcon 
} from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";

export const BackHomeButton = () => {
    return (
        <IonButton 
            color="light" 
            id="back-button"
            routerDirection="back"
            href="/"
        >
            <IonIcon icon={arrowBackOutline} size="large" />
        </IonButton>
    )
};