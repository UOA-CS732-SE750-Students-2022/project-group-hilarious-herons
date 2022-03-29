import { IonFabButton, IonIcon } from "@ionic/react"

import { add } from "ionicons/icons";

export const AddPostButton = () => {
    return (
        <IonFabButton color="ionWhite">
            <IonIcon icon={add} size="large" color="primary" />
        </IonFabButton>
    )
}