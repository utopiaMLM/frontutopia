import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {global} from 'src/app/constants/global';
import { Router } from '@angular/router';
import {constantses} from 'src/app/constants/constants.es';
import {constantsen} from 'src/app/constants/constants.en';
import {ResultArticle} from 'src/app/models/ResultArticle';
import {ResultNews} from 'src/app/models/ResultNews';
import {ResultCoinGecko} from 'src/app/models/ResultCoinGecko';
import {Transaction} from 'src/app/models/Transaction';
import {ResultBlockchains} from 'src/app/models/ResultBlockchains';
import {ResultBlockchainsUser} from 'src/app/models/ResultBlockchainsUser';
import { ResultCrypto } from 'src/app/models/ResultCryptos';
import { ResultWallets } from 'src/app/models/ResultWallets';

@Injectable({
  providedIn: 'root'
})
export class CommonsService {

  private urlWSCOUNTRIES = global.URLBASE_API + '/commons/getCountries';
  private urlWSCITIES = global.URLBASE_API + '/commons/getCities';
  private urlWSCOMMENTS = global.URLBASE_API + '/commons/sendcoments';
  private urlWSNEWS = global.URLBASE_API + '/news/getnews';
  private urlWSNEWSByID = global.URLBASE_API + '/news/getNewById';
  private urlWSARTICLE = global.URLBASE_API + '/article/getArticle';
  private urlWSARTICLEByID = global.URLBASE_API + '/article/getArticleById';
  private urlWSCRYPTOS = global.URLBASE_API + '/commons/getCryptoCurrency';
  private urlWSBLOCKAINS = global.URLBASE_API + '/commons/getBlockchains';
  private urlWSALLBLOCKAINS = global.URLBASE_API + '/commons/getAllBlockchains';
  private urlWSCRYPTOGECKO = global.URLBASE_API + '/commons/getCryptoCurrencyGecko';
  private urlWSCRYPTOTOP = global.URLBASE_API + '/commons/getPriceUtopia';
  private urlWSAVEWALLETS = global.URLBASE_API + '/commons/saveWallets';
  private urlWSALLWALLETS = global.URLBASE_API + '/commons/getAllWalletsUser';

  
 /** Cambiar a service blockchain*/
  private urlWSGETBLOCKCHAINUSER = global.URLBASE_API + '/getBlockchainsUser';
  private urlWSUPDATEBLOCKCHAINUSER = global.URLBASE_API + '/updateBlockchainsUser';
  private urlWSGETPROFILEID = global.URLBASE_API + '/getDataProfileById';
  private urlWSGETCRYPTOBYPROFILEID = global.URLBASE_API + '/getCryptosByProfileById';

  
  constructor(private http: HttpClient, private router: Router) {
    this.http = http;
  }

  public getConstants(): any {
      return constantses;    
  }
  public getLang(): any {
      return global.LANGUAGE_ES;    
  }

  /** Obtiene la lista de paises */
  public getCountries() {
    const token = localStorage.getItem('token');
    const data = {token};
    return this.http.post(this.urlWSCOUNTRIES, data);
  }

  /** Obtiene la lista de blockchains */
  public getBlockchains() {
    const token = localStorage.getItem('token');
    const data = {token};
    return this.http.post<ResultBlockchains>(this.urlWSBLOCKAINS, data);
  } 

  
  /** Obtiene la lista de blockchains */
  public getAllBlockchains() {
    const token = localStorage.getItem('token');
    const data = {token};
    return this.http.post<ResultBlockchains>(this.urlWSALLBLOCKAINS, data);
  } 

  /** Obtiene la lista de paises */
  public getCities(country: any) {
    const token = localStorage.getItem('token');
    const data = {token, country};
    return this.http.post(this.urlWSCITIES, data);
  }
   /** Envia comentario */
   public sendComment(data: any) {
    return this.http.post(this.urlWSCOMMENTS, data);
  }
    /** Obtiene un listado de noticias */
   public getNews(data: any) {
    return this.http.post(this.urlWSNEWS, data);
  }

  /** Obtiene solo una noticia */
  public getNewsByID(data: any) {
    return this.http.post<ResultNews>(this.urlWSNEWSByID, data);
  }

    /** Obtiene un listado de noticias */
  public getArticle(data: any) {
    return this.http.post(this.urlWSARTICLE, data);
  }

  /** Obtiene un articulo */
  public getArticleByID(data: any) {
    return this.http.post<ResultArticle>(this.urlWSARTICLEByID, data);
  }

   /** Obtiene todas las cryptos */
   public getCryptos(data: any) {
    return this.http.post(this.urlWSCRYPTOS, data);
  }

  /** Consulta  el precio de la moneda */
  public getInfoCoingecko(data: any) {
    return this.http.post<ResultCoinGecko>(this.urlWSCRYPTOGECKO, data);
  }

  public getInfoTOP() {
    const token = localStorage.getItem('token');
    const data = {token};
    return this.http.post<ResultCoinGecko>(this.urlWSCRYPTOTOP, data);
  }


   /** Obtiene los blockchain de los usuarios */
   public getBlockchainsUser() {    
    const token = localStorage.getItem('token');
    const data = {token};
    return this.http.post<ResultBlockchainsUser>(this.urlWSGETBLOCKCHAINUSER, data);
  }

   /** Obtiene los blockchain de los usuarios */
   public updateBlockchainsUser(info:any) {    
    const token = localStorage.getItem('token');
    const data = {token, blockchains: info};
    return this.http.post<ResultBlockchainsUser>(this.urlWSUPDATEBLOCKCHAINUSER, data);
  }

   /** Obtiene la data del perfil */
   public getProfile(profileId:any) {    
    const data = {userId: profileId};
    return this.http.post(this.urlWSGETPROFILEID, data);
  }

  /** Obtiene las criptomonedas del perfil */
  public getCryptoByProfile(profileId:any) {    
    const data = {userId: profileId};
    return this.http.post<ResultCrypto>(this.urlWSGETCRYPTOBYPROFILEID, data);
  } 

  /** Obtiene los blockchain de los usuarios */
  public saveWallet(info:any) {    
    const token = localStorage.getItem('token');
    const data = {token, walletblockchains: info};
    return this.http.post<ResultBlockchainsUser>(this.urlWSAVEWALLETS, data);
  }

  public getWalletsUser() {
    const token = localStorage.getItem('token');
    const data = {token};
    return this.http.post<ResultWallets>(this.urlWSALLWALLETS, data);
  }
}
