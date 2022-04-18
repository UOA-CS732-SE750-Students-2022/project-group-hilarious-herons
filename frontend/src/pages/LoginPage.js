import { 
  IonPage, 
  IonContent, 
  IonTitle, 
  IonButton, 
  IonIcon, 
  IonText,
  IonRow,
} from "@ionic/react";
import { 
  logoGoogle
} from 'ionicons/icons';
import { useState } from "react";
import './LoginPage.css';

export const LoginPage = () => {

  return (
    <IonPage>
      <IonContent fullscreen className="login-content">
        <div className="component">
          <div className="componentx"> 
            <IonTitle>Log in to your account!</IonTitle>
            <br /> 
            <br /> 
            <IonButton className="login-button" expand="full" size="large">
              <IonIcon slot="start"  icon={ logoGoogle } color="light"/>
                Login with Google
            </IonButton>   
            <br /> 
            <br /> 
            <br /> 
            <IonRow style={{ display: "inline-block" }} className="sign-up">
              <IonText style={{ fontWeight: "bold"}}>Don't have an account?&nbsp;&nbsp;</IonText>
              <IonButton style={{ verticalAlign: "middle" }} mode="ios" size="small">Sign Up</IonButton>  
            </IonRow>
          </div>
        </div>
        <div className="image-content">
          <IonText style={{ color: "white"}} >
            <h1>FUNTER</h1>
          </IonText>
          <IonTitle
              slot="start"
              style={{ fontSize: "2.25em", color: "white", margin: "0 5%" }}
            >
              <h1>
                START YOUR FOOD
                <br />
                HUNTING JOURNEY.
              </h1>
            </IonTitle>
        </div>

      </IonContent>
    </IonPage>
  );
};
