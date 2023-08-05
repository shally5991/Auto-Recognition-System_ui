import React, { useEffect } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonCard,
  IonText
} from "@ionic/react";
import "./Login.css";
import "swiper/css";
import { ENV } from "../env/env.dev";
import ParticlesBg from 'particles-bg'


const Login: React.FC = () => {
  async function logIn() {
    // const domain = ENV.DOMAIN;
    // const clientId = ENV.CLIENT_ID;
    // const audience = ENV.AUDIENCE;
    // const scope = ENV.SCOPE;
    // const responseType = ENV.RESPONSE_TYPE;
    // const redirectUri = ENV.REDIRECT_URI;
    try {
      // const response = await fetch(
      //   `https://${domain}/authorize?` +
      //     `audience=${audience}&` +
      //     `scope=${scope}&` +
      //     `response_type=${responseType}&` +
      //     `client_id=${clientId}&` +    
      //     `redirect_uri=${redirectUri}`,
      //   {
      //     redirect: "manual",
      //   }
      // );
      // window.location.replace(response.url);
      window.location.replace("http://localhost:8100/page/Vehicles");

    } catch (error) {
      console.error("LoginButton Error :", error);
    }
  }
  // useEffect(() => {
  //   logIn();
  // }, []);

  return (
    <IonPage>
      <IonContent  className="background">  
      <ParticlesBg type="cobweb" num={500}  color="#ff0000" bg={true} />
      <h5 className="Heading">
        Auto-Recognition System
      </h5>
      <p className="para">
      <IonText ><b>License Plate Recognition</b></IonText> is able to detect the license plate of each car passing by, OCR the characters on the plate, and then store this information in a database so the owner of the vehicle can be billed for the toll.
      <br />
      <br />
      <IonText ><b>Face Recognition</b></IonText> system use computer algorithms to pick out specific, distinctive details about a person's face. These details, such as distance between the eyes or shape of the chin, are then converted into a mathematical representation and compared to data on other faces collected in a face recognition database
      </p>
      <br />
      <br />
      <br />
      <br />
      <br />
      <IonButton color="tertiary" className = "buttonLogin" onClick={()=>logIn()}>
        Login
      </IonButton>
        
      </IonContent>
    </IonPage>
  );
};
export default Login;
