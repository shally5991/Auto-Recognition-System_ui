import React, {
  Component,
  useCallback,
  useContext,
  useState,
  useEffect,
  useRef,
  Fragment
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
import { ToastProvider, useToasts } from "react-toast-notifications";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { logOut, refresh } from "ionicons/icons";
import { Endpoints } from "../configuration/endpoints";
// Import Swiper styles
import "swiper/css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { pin, wifi, wine, warning, walk, imageOutline } from "ionicons/icons";

import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import { navigate } from "ionicons/icons";
// import { useToasts } from "react-toast-notifications";
import e from "express";
import { PersonService, RegisteredPerson } from "../services/person.service";
import axios from "axios";

import { ENV } from '../env/env';

let isDisabled = true;

interface InternalValues {
  file: any;
}

const Register: React.FC = () => {

  const [regPersonsImage, setregPersonsImage] = useState("");
  let personFile = ""

  const onFileChange = (fileChangeEvent: any) => {
    // setregPersonsImage(values.current.file)
    personFile = fileChangeEvent.target.files[0];
    // console.log(values.current.file)
  };
  const { addToast } = useToasts();
  const [regPersonsName, setregPersonsName] = useState("");
  let formData = new FormData();

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


  let isFailed = false;

  function onRegister() {
    const personService = new PersonService(new Endpoints());

    let formData = new FormData();
    formData.append('name', regPersonsName);
    formData.append('personImg', personFile);

    personService.registerPerson(formData).then((response) => {
      console.log(response);
      if (response.data.status == 201) {
        addToast(response.data.msg, {
          appearance: "success",
          autoDismiss: true,
        });
      }
    })
      .catch((error) => {
        if (error.response.data.status == 409) {

          addToast(error.response.data.msg, {
            appearance: "warning",
            autoDismiss: true,

          });
        } else {
          addToast("Request failed, Please try again", {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
  }
  return (
    <Fragment>

      <IonPage id="main">
        <IonHeader>
          <IonToolbar color="primary" class="ion-text-left">
            <IonTitle> Register Person </IonTitle>

            <IonButton slot="end" onClick={LogOut}>
              <IonIcon slot="icon-only" ios={logOut} md={logOut} />
            </IonButton>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen class="ion-padding">
          <IonItem>
            <IonLabel position="floating">Name</IonLabel>
            <IonInput
              placeholder="eg. Tim David"
              onIonChange={(e: any) => setregPersonsName(e.target.value)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Image</IonLabel>
            <br />
            <br />
            <input
              type="file" accept="image/*" onChange={(e) => onFileChange(e)}
            ></input>
          </IonItem>

          <IonToolbar>
            <IonButton id="login" onClick={onRegister}>
              Register
            </IonButton>
          </IonToolbar>
        </IonContent>
      </IonPage>
    </Fragment>
  )
}
export default Register;
