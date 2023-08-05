import { Endpoints } from "../configuration/endpoints";
import { APICallService } from "./api/api-call.service";

export interface Person {
    _id: number,
    cameraid: string;
    time_in?: string,
    time_out?: string,
    name: string,
    time_visited?:string,
    isRegister:string
    personImg:string
    hasNextPage:boolean
}
export interface RegisteredPerson {
    name:string,
    personImg:string
    
}


export class PersonService extends APICallService {

    constructor(
        private endPoints: Endpoints
    ) { super(); }

    getPersons(page:number,limit:number): Promise<any> {
        return this.getData(`${this.endPoints.person}?page=${page}&limit=${limit}`);
    }
    getregisteredPersons(page:number,limit:number): Promise<any> {
        return this.getData(`${this.endPoints.registeredperson}?page=${page}&limit=${limit}`);
    }
    registerPerson(data:FormData):Promise<any>{
        return this.postFormData(this.endPoints.registeredperson,data);
    }
    

}