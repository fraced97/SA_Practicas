import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(public http:HttpClient) { 

  }
  async getContador(){
    return await this.http.get("http://35.184.121.13:9000/obtener")
  }

}
