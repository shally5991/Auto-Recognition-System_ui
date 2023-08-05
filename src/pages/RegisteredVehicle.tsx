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
  IonFab,
  IonFabButton,
  IonModal,
  IonItem,
  IonLabel,
  IonInput,
  IonInfiniteScroll,
  IonInfiniteScrollContent
} from "@ionic/react";
import { logOut, refresh } from "ionicons/icons";
import { download, add } from "ionicons/icons";

import * as XLSX from "xlsx";

import Menu from "../components/Menu";
import "./Registered.css";
import { useParams } from "react-router";
import { Fragment, useState, useRef } from "react";
import {
  LicensePlateService,
  RegisteredLicensePlate,
} from "../services/licensePlate.service";
import { ToastProvider, useToasts } from "react-toast-notifications";
import RegisteredListItem from "../components/RegisteredListItem";
import { Endpoints } from "../configuration/endpoints";
import NotFound from "../components/NotFound";
import { useHistory } from "react-router-dom";
import { POSITION } from "react-toastify/dist/utils";
import { ENV } from '../env/env.dev';
const Page: React.FC = () => {
  let [page , setPage] = useState(1);
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  const modal = useRef<HTMLIonModalElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { name } = useParams<{ name: string }>();
  let [reglicensePlates, setregLicensePlates] = useState<
    RegisteredLicensePlate[]
  >([]);
var limit = 100
  let isFailed = false;
  const { addToast } = useToasts();

  const [numberPlate, setnumberPlate] = useState<string>("");
  const openModal = () => {
    setModalOpen(true);
  };

  const getLicense = () => {
    console.log("getLicense");
    const lps = new LicensePlateService(new Endpoints());
    isFailed = false;
    lps
      .getregisteredLicensePlates(page,limit)
      .then((response) => {
          console.log("RES :", response);
        if (response.data.status == 200) {
          console.log("length ", typeof response.data.data.docs);
          console.log(response.data.data.docs);
          if (response.data.data.docs.length) {
            let newregPlates: RegisteredLicensePlate[] = [];
            newregPlates.push(...response.data.data.docs);          
            setregLicensePlates([
              ...reglicensePlates,
              ...newregPlates
            ]); 
          } else {
            isFailed = true;
            setregLicensePlates([]);
          }
        } else {
          isFailed = true;
          setregLicensePlates([]);
        }
      })
      .catch((err) => {
        console.error(err.message);
        isFailed = true;
      });
  };

 
const loadData = (ev: any) => {
    setTimeout(() => {
      setPage(page+1)
      getLicense();
      ev.target.complete();
    }, 500); 
  };


  useIonViewWillEnter(() => {
    getLicense();
  });

  const onRegister = () => {
    const lps = new LicensePlateService(new Endpoints());
    lps
      .registerLicensePlate({ plate: numberPlate })
      // console.log(numberPlate)
      .then((response: any) => {
        console.log(response);
        if (response.data.status == 201) {
          addToast(response.data.msg, {
            appearance: "success",
            autoDismiss: true,
          });
        }
      })
      .catch((error: any) => {
        console.log(error);
        if (error.response.data.status == 409) {
          addToast(error.response.data.msg, {
            appearance: "warning",
            autoDismiss: true,
            position: "bottom-right",
          });
        } else {
          addToast("Request failed, Please try again", {
            appearance: "error",
            autoDismiss: true,
          });
        }
      }).finally(()=>{
        setModalOpen(false);
      });
  };
  const downloadExcel = () => {
    const reglicensePlatesArr = reglicensePlates.map(regPlt => {
      return {
        "plate": regPlt.plate
      }
    });
    const workSheet = XLSX.utils.json_to_sheet(reglicensePlatesArr);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Registered License Plate");
    XLSX.writeFile(workBook, "RegisteredLicensePlate.xlsx");
  };
  let history = useHistory();
  async function LogOut() {
    // const domain = ENV.DOMAIN;
    // const clientId = ENV.CLIENT_ID;
    // const returnTo = ENV.RETURN_TO;
    // const response = await fetch(
    //   `https://${domain}/logout?client_id=${clientId}&returnTo=${returnTo}`,
    //   { redirect: "manual" }
    // );
    // console.log("After Logout :", response.url);
    // window.location.assign("http://localhost:8100/page/Login");
    // window.location.replace("http://localhost:8100/page/Login");
    window.location.replace("http://localhost:8100/page/Login");

  }
  
  return (
    <Fragment>

      <IonPage id="main">
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Registered Vehicles</IonTitle>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>{name}</IonTitle>

            <IonButton slot="end" onClick={downloadExcel}>
              <IonIcon slot="icon-only" ios={download} md={download} />
            </IonButton>

            <IonButton slot="end" onClick={getLicense}>
              <IonIcon slot="icon-only" ios={refresh} md={refresh} />
            </IonButton>

            <IonButton slot="end" onClick={LogOut}>
              <IonIcon slot="icon-only" ios={logOut} md={logOut} />
            </IonButton>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton onClick={openModal}>
              <IonIcon icon={add} />
            </IonFabButton>
          </IonFab>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">{name}</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">{name}</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonList>
            {reglicensePlates.length ? (
              <>
                {" "}
                {reglicensePlates.map((l ,index) => (
                  <RegisteredListItem
                    key={l.plate}
                    registeredlicensePlate={l}
                    index={index}
                  />
                ))}{" "}
              </>
            ) : (
              <NotFound />
            )}
          </IonList>
          <IonInfiniteScroll
            onIonInfinite={loadData}
            threshold="100px"
            disabled={isInfiniteDisabled}
          >
            <IonInfiniteScrollContent
              loadingSpinner="bubbles"
              loadingText="Loading more data..."
            ></IonInfiniteScrollContent>
          </IonInfiniteScroll>
        </IonContent>
        <IonModal ref={modal} trigger="open-modal" isOpen={modalOpen} onDidDismiss={() => setModalOpen(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Register</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setModalOpen(false)}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
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
        </IonModal>
      </IonPage>
    </Fragment>
  );
};

export default Page;