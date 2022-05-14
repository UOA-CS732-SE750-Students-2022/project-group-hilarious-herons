import { IonPopover, IonList, IonItem, IonLabel } from "@ionic/react";
import { NavLink } from "react-router-dom";
import { logOut } from "../utils/firebase";

export const UserPopover = ({ popoverState, setShowPopover }) => {
  const LabelStyle = {
    textAlign: "center",
    fontWeight: "bold",
  };

  return (
    <IonPopover
      isOpen={popoverState.showPopover}
      onDidDismiss={() =>
        setShowPopover({ showPopover: false, event: undefined })
      }
      //   trigger="user-avatar"
      size="auto"
      //   mode="ios"
      dismissOnSelect={true}
    >
      <IonList lines="none">
        <NavLink to={"/account"}>
          <IonItem button detail={false}>
            <IonLabel style={LabelStyle}>My Posts</IonLabel>
          </IonItem>
        </NavLink>
        <IonItem
          button
          detail={false}
          href="/"
          onClick={() => {
            logOut(async (isLogout) => {
              if (isLogout) {
                localStorage.clear();
              }
            });
          }}
        >
          <IonLabel color="primary" style={LabelStyle}>
            Log out
          </IonLabel>
        </IonItem>
      </IonList>
    </IonPopover>
  );
};
