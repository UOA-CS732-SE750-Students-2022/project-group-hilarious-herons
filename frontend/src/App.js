import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

import "@ionic/react/css/core.css";
import { HomePage } from "./pages/HomePage";
import { FoodDetailsPage } from "./pages/FoodDetailsPage";
import { LoginPage } from "./pages/LoginPage";
import { AccountPage } from "./pages/AccountPage";
import { ErrorPage } from "./pages/ErrorPage";

// /* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
// import "@ionic/react/css/typography.css";

// /* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

// Required to get the app working!!!
setupIonicReact();

function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/" exact component={HomePage} />
          <Route path="/Food/:id" exact component={FoodDetailsPage} />
          <Route path="/Login" exact component={LoginPage} />
          <Route path="/Account" exact component={AccountPage} />
          <Route path="/NotFound" exact component={ErrorPage} />
          <Route render={() => <Redirect to={"/NotFound"} />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
