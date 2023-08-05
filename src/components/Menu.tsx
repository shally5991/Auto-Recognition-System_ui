import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import {
  mailOutline,
  car,
  personCircle,
  personOutline,
  personCircleOutline,
  peopleCircle,
  carSport
} from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Vehicles Entries',
    url: 'Vehicles',
    iosIcon: mailOutline,
    mdIcon: car
  },
  {
    title: 'Registered Vehicles',
    url: 'RegisteredVehicle',
    iosIcon: mailOutline,
    mdIcon: carSport
  },
  
  {
    title: 'Persons Entries',
    url: 'Persons',
    iosIcon: mailOutline,
    mdIcon: personCircle
  },
  {
    title: 'Registered Persons',
    url: 'RegisteredPerson',
    iosIcon: mailOutline,
    mdIcon: peopleCircle
  },
  
];
const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Navigation</IonListHeader>
          
          <IonNote></IonNote>



          {appPages.map((appPage, index) => {
            
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel aria-disabled>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
