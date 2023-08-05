import { IonItem, IonLabel, IonRippleEffect, IonThumbnail, IonGrid, IonCol, IonRow } from "@ionic/react";
import { LicensePlate } from "../services/licensePlate.service";
import "./ListItem.css";
// let baseUrl = 'http://localhost:1234/api/';
interface ListItemProps {
  licensePlate: LicensePlate;
}

const ListItem: React.FC<ListItemProps> = ({ licensePlate }) => {

  return (
    <IonItem className="ion-activatable ripple-parent">
      <div className="ion-padding"></div>
      <IonGrid>
        <IonRow className="ion-align-items-center">
          <IonCol sizeMd="4" size="12">
            <img className="thumbnailImage" src={`http://localhost:1234/images/register_users/${licensePlate.plateImg}`} />
          </IonCol>
          <IonCol sizeMd="8" size="12">
            <IonLabel className="ion-text-wrap">

              <table>
                {/* <IonThumbnail slot="start" className="thumbnail">
    <img src={licensePlate.plateImg} />
  </IonThumbnail> */}
                <tbody>
                  <tr>
                    <td>Plate</td>
                    <td className="plateName">: {licensePlate.plate}</td>
                  </tr>
                  {licensePlate.time_visited ? (
                    <tr>
                      <td className="red">Visited</td>
                      <td>: {licensePlate.time_visited}</td>
                    </tr>
                  ) : (
                    <></>
                  )}
                  {licensePlate.time_in ? (
                    <tr>
                      <td className="green">In</td>
                      <td>: {licensePlate.time_in}</td>
                    </tr>
                  ) : (
                    <></>
                  )}
                  {licensePlate.time_out ? (
                    <tr>
                      <td >Out</td>
                      <td>: {licensePlate.time_out}</td>
                    </tr>
                  ) : (
                    <></>
                  )}
                  {/* <tr>
                <td>Image</td>
                <td>
                  : <img src={licensePlate.plateImg} />{" "}
                </td>
              </tr> */}
                </tbody>
              </table>
            </IonLabel>
          </IonCol>
        </IonRow>
      </IonGrid>
      <IonRippleEffect></IonRippleEffect>
      <div className="ion-padding"></div>
    </IonItem>
  );
};

export default ListItem;
