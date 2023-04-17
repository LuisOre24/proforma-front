import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtRequest } from 'src/app/_model/JwtRequest';
import { LoginService } from 'src/app/_service/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;

  usuario! : string;
  password! : string;

  form! : UntypedFormGroup

  constructor(private loginService : LoginService, private router : Router, private snack : MatSnackBar) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      'usuario' : new FormControl(''),
      'password' : new FormControl('')
    });

  }

  iniciarSesion(){
    let user = new JwtRequest();
    user.username = this.usuario;
    user.password = this.password;
    this.loginService.login(user).subscribe(data => {
      if(data){
        let jwt = JSON.stringify(data.jwtToken).replace(/["]+/g, '');
        sessionStorage.setItem(environment.TOKEN_NAME,jwt);
        this.snack.open("Bienvenido", "AVISO", {
          duration : 3000
        });
        this.router.navigate(['proforma']);
      }
      else{
        //this.clearFields();
        this.router.navigate(['login']);
        this.snack.open("Error en Credenciales", "AVISO", {
          duration : 3000
        });
      }
    });
  }

  clearFields(){
    console.log("clear fields");
    this.password = "";
    this.form = new FormGroup({
      'usuario' : new FormControl('')
    });
  }

}
