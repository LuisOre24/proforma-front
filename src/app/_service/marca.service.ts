import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Marca } from '../_model/Marca';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  snackMessage = new Subject<string>();
  refresh  = new Subject<Marca[]>();

  url : string = `${environment.HOST}/marca`;

  constructor(private http : HttpClient) { }

  getAll(){
    return this.http.get<Marca[]>(this.url);
  }

  getById(id : number){
    return this.http.get<Marca>(`${this.url}/${id}`);
  }

  register(marca : Marca){
    return this.http.post(this.url, marca);
  }

  update(marca : Marca){
    return this.http.put(this.url, marca);
  }

  delete(id : number){
    return this.http.delete(`${this.url}/${id}`);
  }

  listPageable(page : number, size : number){
    return this.http.get<any>(`${this.url}/pageable/?page=${page}&size=${size}`);
  }

}
