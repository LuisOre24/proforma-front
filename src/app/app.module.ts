import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MarcaComponent } from './pages/marca/marca.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms';
import { CategoriaDialogComponent } from './pages/categoria/categoria-dialog/categoria-dialog.component';
import { MarcaDialogComponent } from './pages/marca/marca-dialog/marca-dialog.component';
import { ProductoDialogComponent } from './pages/producto/producto-dialog/producto-dialog.component';
import { ProformaComponent } from './pages/proforma/proforma.component';
import { ProformaDataComponent } from './pages/proforma-data/proforma-data.component';
import { LoginComponent } from './pages/login/login.component';

import { JwtModule } from "@auth0/angular-jwt";
import { GuardInterceptor } from './_service/guard.interceptor';
import { environment } from 'src/environments/environment';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProformaDetalleComponent } from './pages/proforma-data/proforma-detalle/proforma-detalle.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AtencionComponent } from './pages/atencion/atencion.component';
import { RegistroAtencionComponent } from './pages/atencion/registro-atencion/registro-atencion.component';
import { RegistroPagoComponent } from './pages/atencion/registro-pago/registro-pago.component';


export function getToken() {
  let tk = JSON.stringify(sessionStorage.getItem(environment.TOKEN_NAME)).replace(/["]+/g, '');
  let token = tk != null ? tk : '';
  return token;
  
}



@NgModule({
  declarations: [
    AppComponent,
    MarcaComponent,
    CategoriaComponent,
    ProductoComponent,
    CategoriaDialogComponent,
    MarcaDialogComponent,
    ProductoDialogComponent,
    ProformaComponent,
    ProformaDataComponent,
    LoginComponent,
    NotFoundComponent,
    ProformaDetalleComponent,
    AtencionComponent,
    RegistroAtencionComponent,
    RegistroPagoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
        allowedDomains: ['http://134.209.117.9','localhost:8080'],
        disallowedRoutes: ['http://134.209.117.9/sys-app/v1/auth/admin/authenticate','http://localhost:8080/v1/auth/admin/authenticate']
      },
    }),
  ],
  providers: [  
    /* LoginService,
    GuardGuard, */
    [
      {
        provide: HTTP_INTERCEPTORS,
        useClass : GuardInterceptor,
        multi:true
      },
      { provide: LocationStrategy, useClass: HashLocationStrategy }
    ]
  ],
  bootstrap: [AppComponent]

  /*
  *{
      provide: HTTP_INTERCEPTORS,
      useClass: GuardInterceptor  ,
      multi: true
    },
  */
})
export class AppModule { }
