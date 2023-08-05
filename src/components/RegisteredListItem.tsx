import {
    IonItem,
    IonLabel,
    IonRippleEffect
  } from '@ionic/react';
  import { RegisteredLicensePlate } from '../services/licensePlate.service';
  import './ListItem.css';
  let baseUrl = 'http://localhost:1234/api/';
  interface ListItemProps {
    registeredlicensePlate: RegisteredLicensePlate;
    index : number
  }
  
  const ListItem: React.FC<ListItemProps> = ({ registeredlicensePlate, index }) => {
    return (
      <IonItem className="ion-activatable ripple-parent">
        <div slot="start"></div>
        <IonLabel className="ion-text-wrap">
          <table>
            <tbody>
              <tr>
              <td>{index}</td><td> .  </td><td>{registeredlicensePlate.plate}</td>
              </tr>
            </tbody>
          </table>
        </IonLabel>
        <IonRippleEffect></IonRippleEffect>
      </IonItem>
    );
  };
  
  export default ListItem;
  