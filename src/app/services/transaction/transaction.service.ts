import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {global} from 'src/app/constants/global';
import { Router } from '@angular/router';
import {Transaction} from 'src/app/models/Transaction';
import {ResultTransactions} from 'src/app/models/ResultTransactions';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {


  /** Cambiar a service transaction */
  private urlWSGENTRANSACTION = global.URLBASE_API + '/transaction/generateTransaction';
  private urlWSANULTRANSACTION = global.URLBASE_API + '/transaction/anulTransaction';  
  private urlWSTIMEOUTRANSACTION = global.URLBASE_API + '/transaction/timeOutTransaction';
  private urlWSCHECKTRANSACTION = global.URLBASE_API + '/transaction/checkTransaction';
  private urlWSGETLASTTRANSACTIONS = global.URLBASE_API + '/transaction/getLastTransactions';
  private urlWSGETALLTRANSACTIONS = global.URLBASE_API + '/transaction/getAllTransactions';
  private urlWSGETTOTALBALANCE = global.URLBASE_API + '/transaction/getTotalBalance';

  
    
  
  constructor(private http: HttpClient, private router: Router) {
    this.http = http;
  }

  /** Genera una transaccion de blockchain */
  public generateTransaction(data: any) {    
    return this.http.post<Transaction>(this.urlWSGENTRANSACTION, data);
  }

  /** Cancela una transaccion */
  public cancelTransaction(data: any) {
    return this.http.post<Transaction>(this.urlWSANULTRANSACTION, data);
  }

  /** Chequea la transaccion para revisar si han llegado los fondos */
   checkTransaction(data: any){
    return this.http.post<Transaction>(this.urlWSCHECKTRANSACTION, data);
  }

  /** Obtiene todas las transacciones de un cliente */
  getAllTransactions(){
    const token = localStorage.getItem('token');
    const data = {token};
    return this.http.post<ResultTransactions>(this.urlWSGETALLTRANSACTIONS, data);
  }

    /** Obtiene todas las transacciones de un cliente */
    getTotalBalance(){
      const token = localStorage.getItem('token');
      const data = {token};
      return this.http.post<ResultTransactions>(this.urlWSGETTOTALBALANCE, data);
    }

  getLastTransactions(){
    const token = localStorage.getItem('token');
    const data = {token};
    return this.http.post<ResultTransactions>(this.urlWSGETLASTTRANSACTIONS, data);
  }
  

  public timeOutTransaction(data: any) {    
    return this.http.post<Transaction>(this.urlWSTIMEOUTRANSACTION, data);
  } 

}