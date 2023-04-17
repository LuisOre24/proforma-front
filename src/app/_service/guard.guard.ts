import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {

  constructor(private router : Router, private loginService : LoginService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
  //SI ESTAS LOGEADO
  let login = this.loginService.isLogged();
  

  if (!login) {
    sessionStorage.clear();
    this.router.navigate(['/login']);
    return false;
  } 
  else {
    //SI TOKEN ESTA VIGENTE
   return true;
  }
}

}
