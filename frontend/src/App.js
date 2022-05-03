import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

import "@ionic/react/css/core.css";
import { HomePage } from "./pages/HomePage";
import { FoodDetailsPage } from "./pages/FoodDetailsPage";
import { SignInPage } from "./pages/SignInPage";
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
          <Route path="/food" exact component={FoodDetailsPage} />
          <Route path="/auth" exact component={SignInPage} />
          <Route path="/account" exact component={AccountPage} />
          <Route path="/notFound" exact component={ErrorPage} />
          <Route render={() => <Redirect to={"/notFound"} />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
