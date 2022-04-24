import { 
    IonPopover,
    IonList,
    IonItem,
    IonLabel,
 } from "@ionic/react";
import { logOut } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
export const UserPopover = () => {
    const LabelStyle ={
        textAlign:'center',
        fontWeight: 'bold',
    }

    const { logout } = useContext(AuthContext);

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
                            console.log("isLogout: " + isLogout);
                            if(isLogout) {
                                logout();
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