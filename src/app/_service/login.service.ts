import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtRequest } from '../_model/JwtRequest';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url : string = `${environment.HOST}/auth/admin/authenticate`;

  constructor(private http : HttpClient) { }

  login(jwtRquest : JwtRequest){
    return this.http.post<any>(this.url,jwtRquest, {
      headers : new HttpHeaders().set('No-Auth', 'True')
    });
  }

  isLogged(){
    let jwt  = sessionStorage.getItem(environment.TOKEN_NAME);
    if(jwt!=null){
      return true
    }
    return false
  }

  logout(){
      sessionStorage.clear();
  }

  getToken(){
    let jwt  = sessionStorage.getItem(environment.TOKEN_NAME);
  }

}
