import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { EMPTY, Observable } from "rxjs";
import { catchError } from 'rxjs/operators';
import { environment } from "src/environments/environment";

@Injectable()
export class GuardInterceptor implements HttpInterceptor {

    constructor(private router: Router, private snack : MatSnackBar) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = JSON.stringify(sessionStorage.getItem(environment.TOKEN_NAME)).replace(/["]+/g, '');
        
        if(token != null){
            req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(req).pipe(catchError((error) => {

            if( error.status == 400){
                this.snack.open('Error en la Solicitud', "ALERTA", {
                    duration : 2000
                });
            }
            else if(error.status == 401){
                this.snack.open('Credenciales Erradas', "ALERTA", {
                    duration : 3000
                });
                sessionStorage.clear();
                this.router.navigate(['login']);
            }
            else if(error.status == 403){
                this.snack.open('Requiere Privilegios', "ALERTA", {
                    duration : 3000
                });
            }
            else if(error.status == 404){
                this.snack.open('Recurso inexistente', "ALERTA", {
                    duration : 3000
                });
            }
            else if(error.status == 500){
                sessionStorage.clear();
                this.router.navigate(['login']);
                this.snack.open('ERROR EN EL SERVIDOR' + error.message, "ERROR", {
                    duration : 5000
                });
            }
            else{
                sessionStorage.clear();
                this.router.navigate(['login']);
                this.snack.open(error.message, "ERROR", {
                    duration : 5000
                });
            }
            return EMPTY;
        }));
    }

}