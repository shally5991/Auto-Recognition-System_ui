import {
  IonItem,
  IonLabel,
  IonRippleEffect
} from '@ionic/react';

const NotFound: React.FC = () => {
  return (
    <IonItem className="ion-activatable ripple-parent">
      <div slot="start" className="dot dot-unread"></div>
      <IonLabel className="ion-text-wrap">
        Data not found
      </IonLabel>
      <IonRippleEffect></IonRippleEffect>
    </IonItem>
  );
};

export default NotFound;
