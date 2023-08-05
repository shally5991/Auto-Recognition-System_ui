import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Vehicles from "./pages/Vehicles";
import Persons from "./pages/Persons";
import Login from "./pages/Login";
import { ToastProvider } from 'react-toast-notifications';
import RegisteredVehicle from "./pages/RegisteredVehicle";
import RegisterVehicles from "./pages/RegisterVehicles";
import RegisteredPerson from "./pages/RegisteredPerson";
import RegisterPersons from "./pages/RegisterPersons";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import ParticlesBg from 'particles-bg'


/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <ToastProvider>
        <IonReactRouter>
               
          <IonSplitPane contentId="main">
            <Menu />
            <IonRouterOutlet id="main">
              

              <Route path="/Vehicles" exact={true}>
                <Redirect from="/page/Login" to="/page/Vehicles" />
              </Route>

              <Route path="/page/Vehicles" exact={true}>
                <Vehicles />
              </Route>

              <Route path="/RegisteredVehicle" exact={true}>
                <Redirect to="/page/RegisteredVehicle" />
              </Route>

              <Route path="/page/RegisteredVehicle" exact={true}>
                <RegisteredVehicle />
              </Route>

              <Route path="/RegisterVehicles" exact={true}>
                <Redirect to="/page/RegisterVehicles" />
              </Route>

              <Route path="/page/RegisterVehicles" exact={true}>
                <RegisterVehicles />
              </Route>

              <Route path="/RegisteredPerson" exact={true}>
                <Redirect to="/page/RegisteredPerson" />
              </Route>

              <Route path="/page/RegisteredPerson" exact={true}>
                <RegisteredPerson />
              </Route>

              <Route path="/Persons" exact={true}>
                <Redirect to="/page/Persons" />
              </Route>

              <Route path="/page/Persons" exact={true}>
                <Persons />
              </Route>

              <Route path="/RegisterPersons" exact={true}>
                <Redirect to="/page/RegisterPersons" />
              </Route>

              <Route path="/page/RegisterPersons" exact={true}>
                <RegisterPersons />
              </Route>

            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
        <IonReactRouter>
    
          <Route path="/" exact={true}>
                <Redirect to="/page/Login" />
              </Route>

              <Route path="/page/Login" exact={true}>
                <Login />
              </Route>
          
        </IonReactRouter>
      </ToastProvider>
    </IonApp>
  );
};

export default App;
