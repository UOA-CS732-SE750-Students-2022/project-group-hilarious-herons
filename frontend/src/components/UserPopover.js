import { 
    IonPopover,
    IonContent,
    IonItem,
    IonLabel,
    IonButton
 } from "@ionic/react";

export const UserPopover = () => {
    return (
        <IonPopover trigger="login-button" size="cover" mode='ios'>
             <IonItem button={true} detail={false}>
              <IonLabel>My Posts</IonLabel>
            </IonItem>
            <IonItem button={true} detail={false}>
              <IonLabel>Log Out</IonLabel>
            </IonItem>
            
        </IonPopover>

    );


}