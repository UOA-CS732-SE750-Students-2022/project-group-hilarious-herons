import { 
    IonPopover,
    IonList,
    IonItem,
    IonLabel,
 } from "@ionic/react";
import { logOut } from "../utils/firebase";

export const UserPopover = () => {
    const LabelStyle ={
        textAlign:'center',
        fontWeight: 'bold',
    }

    return (
        <IonPopover trigger="user-avatar" size="auto" mode='ios'>
            <IonList lines="none">
                <IonItem button detail={false} href="account">
                    <IonLabel style={LabelStyle}>My Posts</IonLabel>
                </IonItem>
                <IonItem
                    button 
                    detail={false} 
                    href="/"
                    onClick={() => {
                        logOut(async (isLogout) => {
                            if(isLogout) {
                                localStorage.clear();
                            }
                        });               
                    }} >
                    <IonLabel color='primary' style={LabelStyle}>Log out</IonLabel>
                </IonItem>
            </IonList>
        </IonPopover>
    );
}