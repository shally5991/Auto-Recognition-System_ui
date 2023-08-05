import axios from 'axios';
import { baseUrl } from '../../configuration/api';
import { LicensePlate } from '../licensePlate.service';

export class APICallService {
  API = axios.create({
    baseURL: baseUrl
  });
  config = {     
    headers: { 'content-type': 'multipart/form-data' }
}
  async getData(subUrl: string) {
    return await this.API.get(`${subUrl}`);
  }
  async postData(subUrl: string, data: any) {
    return await this.API.post(`${subUrl}`, data);
  }
  async putData(subUrl: string, data: any) {
    return await this.API.put(`${subUrl}`, data);
  }
  async deleteData(subUrl: string, id: string) {
    return await this.API.delete(`${subUrl}/${id}`);
  }
  async postFormData(subUrl: string, data: FormData) {
    return await this.API.post(`${subUrl}`, data,this.config);
  }
}