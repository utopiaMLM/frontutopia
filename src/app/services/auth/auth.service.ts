import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonsService} from 'src/app/services/commons/commons.service';
import {global} from 'src/app/constants/global';
import { tap } from 'rxjs/operators';
import { LoginModel } from 'src/app/models/Login';

@Injectable()
export class AuthLoginService  {
  constants: any;
  public email: any;
  private urlWSREST = global.URLBASE_API ;
  private WSRESTLOGIN = this.urlWSREST + '/login';
  private WSRESTROLE = this.urlWSREST + '/getRoleUser';
  private WSRESTPASSWLOST = this.urlWSREST + '/passwordlost';
  private WSRESTACTIVATEUSER = this.urlWSREST + '/activateuser';
  private WSRESTCHANGEPASSWORD = this.urlWSREST + '/changepassword';
  private WSRESTCODE= this.urlWSREST + '/validateCode';
   

  PROFILE_ROLE_USER =  [
    {route: global.ROUTE_DASHBOARD},
    {route: global.ROUTE_DASHBOARD_HOME},
    {route: global.ROUTE_COMPANY_PROFILE},
    {route: global.ROUTE_WALLET},
    {route: global.ROUTE_TRANSACTIONS},
    {route: global.ROUTE_CONFIGURATION},
    {route: global.ROUTE_SECURITY}
  ];

  PROFILE_ROLE_ADMIN = [
    {route: global.ROUTE_DASHBOARD_HOME},
    {route: global.ROUTE_WALLET},
    {route: global.ROUTE_SECURITY},
  ];

  constructor(
      private commonsService: CommonsService, private http: HttpClient,
      private router: Router, private toastr: ToastrService) {
    this.http = http;
    this.constants = this.commonsService.getConstants();
  }

  public activate(iduser: string) {
    return this.http.post(this.WSRESTACTIVATEUSER, {iduser});
  }


  public login(data: any) {
    return this.http.post<LoginModel>(this.WSRESTLOGIN, data);
  }

  public lostPassword(data: any) {
    return this.http.post(this.WSRESTPASSWLOST, data);
  }

  public changepassword(data: any) {
    return this.http.post(this.WSRESTCHANGEPASSWORD, data);
  }

  public getRole() {
    const token = localStorage.getItem('token');
    return this.http.post(this.WSRESTROLE, {token});
  }

  public getValidateCode(data: any) {
    return this.http.post(this.WSRESTCODE, data);
  }
  

  public setSession(authResult) {    
    const expiresAt = moment().add(authResult.expiresToken, 'second');
    localStorage.setItem('token', authResult.token) ;
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
  }

  public closeSession() {
    this.logout();
  }

  public isLoggedIn(): boolean {
      const result = moment().isBefore(this.getExpiration());
      if (!result) {
         this.logout();
      }
      return result;
  }

  public isLoggedOut() {
      return !this.isLoggedIn();
  }

  private getExpiration() {
      const expiration = localStorage.getItem('expires_at');
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
  }

  public verifySession() {
    if (this.isLoggedOut()) {
      this.toastr.error(this.constants.MSG_ERROR_SESSION_INVALID);
      this.router.navigate([global.ROUTE_HOME]);
    }
  }

  validateSession() {
    return new Promise((resolve, reject) => {
      resolve(!this.isLoggedIn());
    });
  }

  verifyRoleAndModule(route: any) {
    return new Promise((resolve, reject) => {
      let datos: {role?: any, ok?: false};
      this.getRole().subscribe (
        result => {
          datos = result;
          if (datos.role === global.ROLE_USER) {
            resolve(this.verifyAcces(route, this.PROFILE_ROLE_USER));
          } else if (datos.role === global.ROLE_ADMIN) {            
            resolve(this.verifyAcces(route, this.PROFILE_ROLE_ADMIN));
          }
        }, error => {
          this.verifySessionWS(error);
        });
      });
  }

 private verifyAcces(route: any, menu: any[]): boolean {
    const data = menu.find(info => info.route === route);
    if (data === undefined) {
      return false;
    } else {
      return true;
    }
  }


  public verifySessionWS(error: any): boolean {

    if (error.error !== undefined && error.error.err !== undefined
      && error.error.err.tokeninvalid !== undefined ) {
      this.closeSession();
      this.toastr.error(this.constants.MSG_ERROR_SESSION_INVALID);
      this.router.navigate([global.ROUTE_HOME]);
      return true;
    }
    return false;
  }
}
