import { IonFab, IonFabButton, IonIcon } from "@ionic/react"

import { add } from "ionicons/icons";

export const AddPostButton = () => {
    return (
        <IonFab vertical="bottom" horizontal="end">
            <IonFabButton id="addPost" color="ionWhite">
                <IonIcon icon={add} size="large" color="primary" />
            </IonFabButton>
            {/* Insert Add Post Modal here */}
        </IonFab>
    )
}