import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../_model/Cliente';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url : string = `${environment.HOST}/cliente`;

  constructor(private http : HttpClient) { }


  getAll(){
    return this.http.get<Cliente[]>(this.url);
  }

  getById(id: number){
    return this.http.get<Cliente>(`${this.url}/${id}`);
  }

  getCliente(documento : string){
    return this.http.get<Cliente>(`${this.url}/search/${documento}`);
  }

  registrar(cliente : Cliente){
    return this.http.post(this.url,cliente);
  }

  update(cliente : Cliente){
    return this.http.put(this.url, cliente);
  }

  delete(id : number){
    return this.http.delete(`${this.http}/${id}`);
  }



}
