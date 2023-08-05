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
  LicensePlateService,
  LicensePlate,
} from "../services/licensePlate.service";
import ListItem from "../components/ListItem";
import { Endpoints } from "../configuration/endpoints";
import NotFound from "../components/NotFound";
import { useHistory } from "react-router-dom";
import { ENV } from "../env/env";
import { eventNames } from "process";
// import {pageNumber} from "../configuration/endpoints"
const Page: React.FC = () => {
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  const { name } = useParams<{ name: string }>();
  let [licensePlates, setLicensePlates] = useState<LicensePlate[]>([]);
   let [page , setPage] = useState(1);
  //  let [limit , setLimit] = useState(10);

  //  licensePlate=[]

  let isFailed = false;
  // var page = 1;
  var limit = 10;

  const getLicense = () => {
    console.log("getLicense");
    const lps = new LicensePlateService(new Endpoints());
    isFailed = false;
    console.log(page, limit);
    lps
      .getLicensePlates(page, limit)
      .then((response) => {
        console.log("RES :", response);
        if (response.data.status == 200) {
          console.log("length : ", response.data.data.docs.length);
          if (response.data.data.docs.length) {
            let newPlates: LicensePlate[] = [];
            newPlates.push(...response.data.data.docs);
            console.log(newPlates);
            setLicensePlates([
              ...licensePlates,
              ...newPlates
            ]); 
            console.log(page, limit);    
          } else {
            isFailed = true;
            setLicensePlates([]);
          }
        } else {
          isFailed = true;
          setLicensePlates([]);
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

  const downloadExcel = () => {
    const licensePlatesArr = licensePlates.map((lp) => {
      return {
        plate: lp.plate,
        time_in: lp.time_in,
        time_out: lp.time_out,
        time_visited: lp.time_visited,
      };
    });
    const workSheet = XLSX.utils.json_to_sheet(licensePlatesArr);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "License Plate");
    XLSX.writeFile(workBook, "LicensePlate.xlsx");
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
            <IonTitle>Vehicles Entries</IonTitle>
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
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">{name}</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonList>
            {licensePlates.length ? (
              <>
                {" "}
                {licensePlates.map((l) => (
                  <ListItem key={l._id} licensePlate={l} />
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
