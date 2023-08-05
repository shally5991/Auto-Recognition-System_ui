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
  IonItem,
  IonLabel,
  IonInput,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonModal
} from "@ionic/react";
import { logOut, refresh } from "ionicons/icons";
import { download, add, personAdd } from "ionicons/icons";

import * as XLSX from "xlsx";

import Menu from "../components/Menu";
import { ToastProvider, useToasts } from "react-toast-notifications";
import { useParams } from "react-router";
import { useState, useRef, Fragment } from "react";
import { PersonService, RegisteredPerson } from "../services/person.service";
import RegisteredPersonListItem from "../components/RegisteredPersonListItem";
import { Endpoints } from "../configuration/endpoints";
import NotFound from "../components/NotFound";
import { useHistory } from "react-router-dom";
// import { ENV } from '../env/env.dev';
import { ENV } from '../env/env.dev';
import ParticlesBg from 'particles-bg'

const Page: React.FC = () => {
  const { addToast } = useToasts();
  const modal = useRef<HTMLIonModalElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { name } = useParams<{ name: string }>();
  let [regPersons, setregPersons] = useState<RegisteredPerson[]>([]);
let [page,setPage] = useState(1);
var limit = 100;
  let isFailed = false;
  const openModal = (e: any) => {
    setModalOpen(true);
  };
  let personFile = ""
  const onFileChange = (fileChangeEvent: any) => {
    // setregPersonsImage(values.current.file)
    personFile = fileChangeEvent.target.files[0];
    // console.log(values.current.file)
  };
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
      }).finally(() => {
        setModalOpen(false);
      });
  }

  const getName = () => {
    console.log("getLicense");
    const lps = new PersonService(new Endpoints());
    isFailed = false;
    lps
      .getregisteredPersons(page,limit)
      .then((response) => {
        console.log("RES :", response);
        if (response.data.status == 200) {
          console.log("length : ", response.data.data.docs.length);
          if (response.data.data.docs.length) {
            let newNames: RegisteredPerson[] = [];
            newNames.push(...response.data.data.docs);
            console.log(newNames);
            setregPersons([
              ...regPersons,
              ...newNames
            ]);
          } else {
            isFailed = true;
            setregPersons([]);
          }
        } else {
          isFailed = true;
          setregPersons([]);
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
      getName();
      ev.target.complete();
    }, 500); 
  };
  useIonViewWillEnter(() => {
    getName();
  });
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  const [regPersonsName, setregPersonsName] = useState("");
  const downloadExcel = () => {
    const regPersonsArr = regPersons.map(regPrs => {
      return {
        "name": regPrs.name
      }
    });
    const workSheet = XLSX.utils.json_to_sheet(regPersonsArr);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Registered Person");
    XLSX.writeFile(workBook, "RegisteredPerson.xlsx");
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
    window.location.replace("http://localhost:8100/page/Login");
  }
 
  return (
    <Fragment>

      <IonPage id="main">
        <IonHeader>
          <IonToolbar color="primary">
            
            <IonTitle>Registered Persons</IonTitle>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>{name}</IonTitle>

            <IonButton slot="end" onClick={downloadExcel}>
              <IonIcon slot="icon-only" ios={download} md={download} />
            </IonButton>

            <IonButton slot="end" onClick={getName}>
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
              <IonIcon icon={personAdd} />
            </IonFabButton>
          </IonFab>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">{name}</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonList>
            {regPersons.length ? (
              <>
                {" "}
                {regPersons.map((l, i) => (
                  <RegisteredPersonListItem key={i} registeredperson={l} />
                ))}
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
        </IonModal>
      </IonPage>
    </Fragment>
  )
}
export default Page;
