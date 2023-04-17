import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Proforma } from '../_model/Proforma';

@Injectable({
  providedIn: 'root'
})
export class ProformaService {


  snackMessage = new Subject<string>();
  refresh = new Subject<Proforma[]>();
  url = `${environment.HOST}/proforma`;

  constructor(private http : HttpClient) { }

  getAll(){
    return this.http.get<Proforma[]>(this.url);
  }

  getById(id : number){
    return this.http.get<Proforma>(`${this.url}/${id}`);
  }

  listPageable(page : number, size : number){
    return this.http.get<any>(`${this.url}/pageable/?page=${page}&size=${size}`);
  }

  register(proforma : Proforma){
    return this.http.post(this.url,proforma);
  }
  update(proforma : Proforma){
    return this.http.put(this.url,proforma);
  }
  delete(id : number){
    return this.http.delete(`${this.url}/${id}`);
  }
  exportarpdf(proforma : Proforma){
    return this.http.post(`${this.url}/exportarpdf`, proforma, {
      responseType: 'blob'
    });
  }

}
