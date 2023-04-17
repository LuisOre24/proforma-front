import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Producto } from '../_model/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  snackMessage = new Subject<string>();
  refresh = new Subject<Producto[]>();
  url : string = `${environment.HOST}/producto`;

  constructor(private http : HttpClient) { }

  getAll(){
    return this.http.get<Producto[]>(this.url)
  }

  getById(id : number){
    return this.http.get<Producto>(`${this.url}/id`);
  }

  listPageable(page : number, size : number){
    return this.http.get<any>(`${this.url}/pageable?page=${page}&size=${size}`);
  }

  register(producto : Producto){
    return this.http.post(this.url, producto);
  }

  update(producto : Producto){
    return this.http.put(this.url, producto)
  }

  delete(id : number){
    return this.http.delete(`${this.url}/${id}`);
  }

  /* search(keyword : string){
    return this.http.get(`${this.url}/search/${keyword}`).pipe(map((res: Response) => res.json));
  } */

}
