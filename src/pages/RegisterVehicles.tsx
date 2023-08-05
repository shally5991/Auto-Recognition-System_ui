import React, {
  Component,
  useCallback,
  useContext,
  useState,
  useEffect,
  Fragment,
} from "react";
import { IonVirtualScroll, NavContext } from "@ionic/react";
import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonThumbnail,
  IonNote,
} from "@ionic/react";
import "./Login.css";
// import { ToastProvider, useToast } from "@agney/ir-toast";
import { ToastProvider, useToasts } from 'react-toast-notifications';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import {
  LicensePlateService,
  RegisteredLicensePlate,
} from "../services/licensePlate.service";
// Import Swiper styles
import "swiper/css";
import { logOut, refresh } from "ionicons/icons";
import { pin, wifi, wine, warning, walk } from "ionicons/icons";
import { Endpoints } from "../configuration/endpoints";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import { navigate } from "ionicons/icons";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ENV } from '../env/env';

let isDisabled = true;
const Register: React.FC = () => {
    // toast = useToasts()
    const { addToast } = useToasts()
 
  const [numberPlate, setnumberPlate] = useState<string>("");

  function ShowPassword() {
    let password = document.getElementById(
      "Password"
    ) as HTMLInputElement | null;
    if (password != null) {
      if (password.type === "password") {
        password.type = "text";
      } else {
        password.type = "password";
      }
    }
  }
  let history = useHistory();
  async function LogOut() {
    const domain = ENV.DOMAIN;
    const clientId = ENV.CLIENT_ID;
    const returnTo = ENV.RETURN_TO;
    const response = await fetch(
      `https://${domain}/logout?client_id=${clientId}&returnTo=${returnTo}`,
      { redirect: "manual" }
    );
    console.log("After Logout :", response.url);
    window.location.replace(response.url);
  }

  const onRegister = () => {
    
    const lps = new LicensePlateService(new Endpoints());
    lps
    .registerLicensePlate({ plate: numberPlate })
    // console.log(numberPlate)
    .then((response:any)=>{
        console.log(response)
        if(response.data.status==201){
            addToast(response.data.msg, {
                appearance: 'success',
                autoDismiss: true,
              })
        }
    })
    .catch((error:any)=>{
        console.log(error)
        if(error.response.data.status==409){
            
            addToast(error.response.data.msg, {
                appearance: 'warning',
                autoDismiss: true,
                position: "bottom-right"
                 
              })
        }
        else{
            addToast("Request failed, Please try again", {
                appearance: 'error',
                autoDismiss: true,
              })
        }
    })
  };
  return (
    <Fragment>
      
      <IonPage id="main">
        <IonHeader>
          <IonToolbar color="primary" class="ion-text-left">
            <IonTitle> Register Vehicle </IonTitle>
            <IonButton slot="end" onClick={LogOut}>
              <IonIcon slot="icon-only" ios={logOut} md={logOut} />
            </IonButton>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen class="ion-padding">
          <IonItem>
            <IonLabel position="floating">Number Plate</IonLabel>
            <IonInput
              placeholder="eg. UP80AZ2420"
              onIonChange={(e: any) => setnumberPlate(e.target.value)}
            ></IonInput>
          </IonItem>
          <IonToolbar>
            <IonButton id="login" onClick={onRegister}>
              Register
            </IonButton>
          </IonToolbar>
        </IonContent>
      </IonPage>
    </Fragment>
  );
};
export default Register;
