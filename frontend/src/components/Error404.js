import { IonButton, IonText } from "@ionic/react";
import { NavLink } from "react-router-dom";

export const Error404 = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <IonText color="ionContentHeaderText" style={{ fontSize: "xxx-large" }}>
        <h1>404</h1>
      </IonText>
      <IonText color="ionContentHeaderText" style={{ fontSize: "xx-large" }}>
        <h2>Page Not Found</h2>
      </IonText>
      <br />
      <IonText>
        <p>
          <b>
            The page you are looking for does not exist or another error
            occured.
          </b>
        </p>
      </IonText>
      <br />
      <br />
      <NavLink to={"/"}>
        <IonButton shape="round">
          <IonText color="ionHeaderText">Back to hunting</IonText>
        </IonButton>
      </NavLink>
    </div>
  );
};
