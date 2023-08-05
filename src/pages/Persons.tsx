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
} from "@ionic/react";
import { logOut, refresh } from "ionicons/icons";
import { download } from "ionicons/icons";

import * as XLSX from "xlsx";
import { useParams } from "react-router";
import { Fragment, useState } from "react";
import {
  PersonService,
  Person,
} from "../services/person.service";
import PersonListItem from "../components/PersonListItem";
import { Endpoints } from "../configuration/endpoints";
import NotFound from "../components/NotFound";
import { useHistory } from "react-router-dom";
import { ENV } from '../env/env.dev';
const Page: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  let [Persons, setPersons] = useState<Person[]>([]);
  let [page , setPage] = useState(1);
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  let isFailed = false;
  var limit = 10
  const getName = () => {
    console.log("getLicense");
    const lps = new PersonService(new Endpoints());
    isFailed = false;
    lps
      .getPersons(page,limit)
      .then((response) => {
        console.log("RES :", response);
        if (response.data.status == 200) {
          console.log("length : ", response.data.data.docs.length);
          if (response.data.data.docs.length) {
            let newNames: Person[] = [];
            newNames.push(...response.data.data.docs);
            console.log("9999999999999999",newNames);
            setPersons([
              ...Persons,
              ...newNames
            ]);
          } else {
            isFailed = true;
            setPersons([]);
          }
        } else {
          isFailed = true;
          setPersons([]);
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

  const downloadExcel = () => {
    const personArr = Persons.map(prs => {
      return {
        "name": prs.name, "time_in": prs.time_in, "time_out": prs.time_out, "time_visited": prs.time_visited
      }
    })
    const workSheet = XLSX.utils.json_to_sheet(personArr);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Person");
    XLSX.writeFile(workBook, "Person.xlsx");
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
    // window.location.replace(response.url);
    window.location.replace("http://localhost:8100/page/Login");

  }

  

  return (
    <Fragment>
      
      <IonPage id="main">
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>
              Persons Entries
            </IonTitle>
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
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">{name}</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonList>
            {Persons.length ? (
              <>
                {" "}
                {Persons.map((l) => (
                  <PersonListItem key={l._id} Person={l} />
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
      </IonPage>
    </Fragment>
  );
};

export default Page;