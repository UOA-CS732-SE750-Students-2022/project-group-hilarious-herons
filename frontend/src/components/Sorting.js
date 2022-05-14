import {
    IonRow,
    IonIcon,
    IonFabButton,
    IonPopover,
    IonRadioGroup,
    IonLabel,
    IonItem,
    IonRadio,
    IonListHeader,
    IonList,
} from "@ionic/react";

import { funnel, arrowUp, arrowDown } from "ionicons/icons";

export const Sorting = (dataForCards) => {

    const unsorted = dataForCards;
    const [cardsToDisplay, setCardsToDisplay] = useState(unsorted);
    const [sortOrder, setSortOrder] = useState("ASC");
  
    useEffect(() => {
      let sorted = [...unsorted];
      switch (sortOrder) {
        case "ASC":
          sorted.sort((a, b) => (a.rating > b.rating ? 1 : -1));
          break;
        case "DESC":
          sorted.sort((a, b) => (a.rating < b.rating ? 1 : -1));
          break;
        default:
          sorted = [...unsorted];
          break;
      }
      setCardsToDisplay(sorted);
    }, [sortOrder]);

    return(
        <IonRow class="ion-justify-content-end ion-padding-end">
        <IonFabButton
          size="large"
          color="light"
          className="ion-no-shadows"
          id="sort-button"
        >
          <IonIcon icon={funnel} size="small" />
        </IonFabButton>
        <IonPopover trigger="sort-button" size="auto" mode="ios">
          <IonList inset={true}>
            <IonRadioGroup onIonChange={(e) => setSortOrder(e.target.value)}>
              <IonListHeader>
                <IonLabel>Sort order</IonLabel>
              </IonListHeader>

              <IonItem>
                <IonLabel>
                  Rating <IonIcon icon={arrowUp} size="small" />
                </IonLabel>
                <IonRadio value="DESC" />
              </IonItem>

              <IonItem>
                <IonLabel>
                  Rating <IonIcon icon={arrowDown} size="small" />
                </IonLabel>
                <IonRadio value="ASC" />
              </IonItem>

              <IonItem>
                <IonLabel>
                  Distance <IonIcon icon={arrowDown} size="small" />
                </IonLabel>
                <IonRadio value="" />
              </IonItem>
            </IonRadioGroup>
          </IonList>
        </IonPopover>
      </IonRow>
    )
}