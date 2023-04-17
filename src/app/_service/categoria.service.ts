import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria } from '../_model/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  snackMessage = new Subject<string>();
  refresh = new Subject<Categoria[]>();
  url : string = `${environment.HOST}/categoria`;
  

  constructor(private http : HttpClient) { }

getAll(){
  return this.http.get<Categoria[]>(this.url);
}

getById(id : number){
  return this.http.get<Categoria>(`${this.url}/${id}`);
}

register(categoria : Categoria){
  return this.http.post(this.url, categoria);
}

update(categoria : Categoria){
  return this.http.put(this.url, categoria);
}

delete(id : number){
  return this.http.delete(`${this.url}/${id}`);
}

listPageable(page : number, size : number){
  return this.http.get<any>(`${this.url}/pageable/?page=${page}&size=${size}`);
}

}
