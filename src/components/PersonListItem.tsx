import { IonItem, IonLabel, IonRippleEffect, IonThumbnail, IonList, IonAvatar } from "@ionic/react";
import { Person } from "../services/person.service";
import "./ListItem.css";
let baseUrl = "http://localhost:1234/api/";
interface ListItemProps {
  Person: Person;
}

const ListItem: React.FC<ListItemProps> = ({ Person }) => {
  return (
    // <IonList>

    // </IonList>
    // console.log(Person)
    <IonItem className="ion-activatable ripple-parent">
      <div slot="start" ></div>
      <IonAvatar slot="start">
        <img src={`http://localhost:1234/images/register_users/${Person.personImg}`} />
      </IonAvatar>
      <IonLabel className="ion-text-wrap">
        <table>
          <tbody>

            {/* <IonThumbnail  item-start className="thumbnail">
                <img src={Person.personImg} />
              </IonThumbnail> */}
            <td>Name</td>
            <td className="plateName">: {Person.name}</td>

            {Person.time_visited ? (
              <tr>

                <td className="red">Visited</td>
                <td>: {Person.time_visited}</td>
              </tr>
            ) : (
              <></>
            )}
            {Person.time_in ? (
              <tr>

                <td className="green">In</td>
                <td>: {Person.time_in}</td>
              </tr>
            ) : (
              <></>
            )}
            {Person.time_out ? (
              <tr>

                <td>Out</td>
                <td>: {Person.time_out}</td>
              </tr>
            ) : (
              <></>
            )}
            {/* <tr>
                <td>Image</td><td>: <img src = {Person.personImg}/> </td>
              </tr> */}
          </tbody>
        </table>
      </IonLabel>
    </IonItem>
  );
};

export default ListItem;
