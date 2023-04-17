import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { MarcaComponent } from './pages/marca/marca.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { ProformaDataComponent } from './pages/proforma-data/proforma-data.component';
import { ProformaComponent } from './pages/proforma/proforma.component';
import { LoginComponent } from './pages/login/login.component';
import { GuardGuard } from './_service/guard.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AtencionComponent } from './pages/atencion/atencion.component';
import { RegistroAtencionComponent } from './pages/atencion/registro-atencion/registro-atencion.component';

const routes: Routes = [
  { path : 'login', component : LoginComponent },
  { path : 'categoria', component : CategoriaComponent, canActivate : [GuardGuard]},
  { path : 'marca', component : MarcaComponent, canActivate : [GuardGuard]},
  { path : 'producto', component : ProductoComponent, canActivate : [GuardGuard]},
  { path : 'proforma', component : ProformaComponent, canActivate : [GuardGuard]},
  { path : 'proforma-data', component: ProformaDataComponent, canActivate : [GuardGuard]},
  { path : 'atencion', component: AtencionComponent, canActivate: [GuardGuard] },
  { path : 'registro-atencion', component : RegistroAtencionComponent},
  { path : '', redirectTo : 'login', pathMatch : 'full' },
  { path : 'not-found', component : NotFoundComponent },
  { path : '**', redirectTo : 'not-found'} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
