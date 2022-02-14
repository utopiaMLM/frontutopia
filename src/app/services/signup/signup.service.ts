import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { global} from 'src/app/constants/global';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private urlWSREST = global.URLBASE_API + '/signup';
  private urlSocialWSREST = global.URLBASE_API + '/signupsocial';

  constructor(private http: HttpClient, private router: Router) {
    this.http = http;
  }

  public signup(data: any) {
    return this.http.post(this.urlWSREST, data);
  }

  public signupSocial(data: any) {
    return this.http.post(this.urlSocialWSREST, data);
  }
}
