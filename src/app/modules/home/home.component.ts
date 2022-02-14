import { Component, OnInit } from '@angular/core';
import { CommonsService} from 'src/app/services/commons/commons.service';
import { global } from 'src/app/constants/global';
import { Router } from '@angular/router';
import {AuthLoginService} from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AuthLoginService, CommonsService]
})
export class HomeComponent implements OnInit {
  public constants: any;
  public global: any;
  public url:any; 
  public logged = false;
  constructor(private readonly commonsService: CommonsService, public router: Router,  private readonly authLoginService: AuthLoginService,) {
    
  }

  ngOnInit(): void {
    this.global = global;
    this.constants = this.commonsService.getConstants();
    this.isLoggedIn();
    
    if(this.router.url === '/' && !this.logged){
      this.url = this.global.ROUTE_SIGNUP;
    }
    
    if(this.router.url === '/' + this.global.ROUTE_HOME  && !this.logged) {
      this.url = '../'+this.global.ROUTE_SIGNUP;
    }
    if(this.logged && this.router.url === '/' + this.global.ROUTE_HOME){
      this.url = '../'+this.global.ROUTE_DASHBOARD;
    }
    if(this.logged && this.router.url === '/' ){
      this.url = this.global.ROUTE_DASHBOARD;
    }
  }

  isLoggedIn() {
    this.logged= this.authLoginService.isLoggedIn();
  }
}
