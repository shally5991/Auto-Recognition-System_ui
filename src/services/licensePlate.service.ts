import { Endpoints } from "../configuration/endpoints";
import { APICallService } from "./api/api-call.service";

export interface LicensePlate {
    _id: number,
    cameraid: string;
    time_in?: string,
    time_out?: string,
    plate: string,
    time_visited?:string,
    isRegister:string,
    plateImg:string,
    hasNextPage:string
}
export interface RegisteredLicensePlate {
    plate:string
}


export class LicensePlateService extends APICallService {

    constructor(
        private endPoints: Endpoints
    ) { super(); }

    getLicensePlates(page:number,limit:number): Promise<any> {
        return this.getData(`${this.endPoints.licensePlate}?page=${page}&limit=${limit}`);
    }
    getregisteredLicensePlates(page:number,limit:number): Promise<any> {
        return this.getData(`${this.endPoints.registeredlicensePlate}?page=${page}&limit=${limit}`);
    }
    registerLicensePlate(data:RegisteredLicensePlate):Promise<any>{
        return this.postData(this.endPoints.registeredlicensePlate,data);
    }
}
