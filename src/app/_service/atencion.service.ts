import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Atencion } from '../_model/Atencion';

@Injectable({
  providedIn: 'root'
})
export class AtencionService {


  snackMessage = new Subject<string>();
  refresh = new Subject<Atencion[]>();
  url : string = `${environment.HOST}/atencion`;

  constructor(private http : HttpClient) { }


  getAll(){
    return this.http.get<Atencion[]>(this.url);
  }

  getById( id : number){
    return this.http.get<Atencion>(`${this.url}/${id}`);
  }

  register(atencion : Atencion){
    return this.http.post(this.url, atencion);
  }

  update(atencion : Atencion){
    return this.http.put(this.url, atencion);
  }

  delete(id : number){
    return this.http.delete(`${this.url}/${id}`);
  }

  listPageable(page : number, size : number){
    return this.http.get<any>(`${this.url}/pageable/?page=${page}&size=${size}`);
  }

}
