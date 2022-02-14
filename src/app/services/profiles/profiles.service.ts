import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SponsoringCompanyModel} from 'src/app/models/SponsoringCompanyModel';
import {global} from 'src/app/constants/global';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  private URLWSPROFILE = global.URLBASE_API + '/getDataProfile';
  private URLWSSAVEPROFILE = global.URLBASE_API + '/saveDataProfile';
  private  URLWSSAVEIMAGEPROFILE = global.URLBASE_API + '/saveImageProfile';
  private  URLWSWALLET = global.URLBASE_API + '/wallets/createOrGetWallet';

  constructor(private http: HttpClient, private router: Router) {
    this.http = http;
  }

    /** Obtiene la data del perfil */
    public getProfile() {
      const token = localStorage.getItem('token');
      const data = {token};
      return this.http.post(this.URLWSPROFILE, data);
    }

     /** Guarda la data del perfil */
     public saveProfile(datos: SponsoringCompanyModel) {
      const token = localStorage.getItem('token');
      const data = {token, datos};
      return this.http.post(this.URLWSSAVEPROFILE, data);
    }

    /** Guarda la imagen de perfil */
    public saveImageProfile(image) {
      const token = localStorage.getItem('token');
      const data = {token, image};
      return this.http.post(this.URLWSSAVEIMAGEPROFILE, data);
    }

    /** Guarda la imagen de perfil */
    public getWallet(blockchain) {
      const token = localStorage.getItem('token');
      const data = {token, blockchain};
      return this.http.post(this.URLWSWALLET, data);
    }
}
