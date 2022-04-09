import {
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";


export const DietariesSelect = ({ dietaries, setDietaries }) => {
  const getDietaries = () => {
    return [
      "Vegetarian",
      "Vegan",
      "Gluten free",
      "Lactose free",
      "Halal",
      "Dairy free",
      "Paleo",
    ];
  };

    return (
        <IonItem lines="none">
          <IonLabel>Dietary</IonLabel>
          <IonSelect
            value={ dietaries }
            multiple
            cancelText="Cancel"
            okText="OK"
            style={{ minWidth: "80%" }}
            placeholder="None"
            onIonChange={ (e) => {
              setDietaries(e.detail.value);
            }}
        >
          { getDietaries().map((dietary, idx) => {
            return (
              <IonSelectOption value={ dietary } key={ idx }>
                { dietary }
              </IonSelectOption>
            );
          })}
        </IonSelect>
      </IonItem>
    )
}