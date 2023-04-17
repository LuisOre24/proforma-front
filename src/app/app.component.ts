import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoginService } from './_service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  

  logged = false;

  constructor(public loginService: LoginService, private router : Router, private title : Title){ 
    this.title.setTitle("System Solutions");  
  }

  ngOnInit() : void{
  }

  cerrarSesion(){
    this.loginService.logout();
    this.router.navigate(['login']);
  }

  isLogged(){
    this.loginService.isLogged();
  }

}


