import {
  IonAvatar,
  IonItem,
  IonLabel,
  IonRippleEffect,
} from '@ionic/react';
import { RegisteredPerson } from '../services/person.service';
import './ListItem.css';
let baseUrl = 'http://localhost:1234/api/';
interface ListItemProps {
  registeredperson: RegisteredPerson;
}

const ListItem: React.FC<ListItemProps> = ({ registeredperson }) => {
  return (
    <IonItem className="ion-activatable ripple-parent">
      <div slot="start" ></div>
      <IonAvatar slot="start">
        <img src={`http://localhost:1234/images/register_users/${registeredperson.personImg}`} />
      </IonAvatar>
      <IonLabel className="ion-text-wrap">
        <table>
          <tbody>
            <tr>
              <td> </td><td> {registeredperson.name}</td>
            </tr>
            {/* <tr>
                <td></td><td><img src = {registeredperson.personImg}/></td>
              </tr> */}

          </tbody>
        </table>
      </IonLabel>
      <IonRippleEffect></IonRippleEffect>
    </IonItem>
  );
};

export default ListItem;
