import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { global } from 'src/app/constants/global';
import { AuthLoginService } from 'src/app/services/auth/auth.service';
import { UtilsService } from 'src/app/utils/utils.service';
import { CommonsService } from 'src/app/services/commons/commons.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TransactionService } from 'src/app/services/transaction/transaction.service';

@Component({
  selector: 'app-check-transactions',
  templateUrl: './check-transactions.component.html',
  styleUrls: ['./check-transactions.component.css'],
  providers: [UtilsService, AuthLoginService, CommonsService, TransactionService]
})
export class CheckTransactionsComponent implements OnInit, OnDestroy {

  public constants: any;
  public global: any;
  public collapsed= false;
  public transactionFound= false;
  public transactionId: any;
  public clientName: any;
  public clientEmail: any;
  public clientWallet: any;
  public creationDate: any;
  public cryptoToSend: any;
  public transactionWallet: any;
  public statusTransaction: any;
  public textColor: any;
  public processdate: any;
  public amount: number;
  public logo: any;
  public web: any;
  public storeName: any;
  public storeWeb: any;
  public description: any;

  constructor(
    private readonly commonsService: CommonsService,
    private readonly utilsService: UtilsService,
    private readonly transactionService: TransactionService,
    public router: Router,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    
    if(localStorage.getItem('lang') ===undefined || localStorage.getItem('lang') === null ){
      localStorage.setItem('lang', this.global.LANGUAGE_EN);
    } 
    
    this.global = global;    
    this.constants = this.commonsService.getConstants();  
  }

  /** Consulta una transacción */
  queryTransaction(){
    this.textColor = "red";
    const lang = this.commonsService.getLang(); 
    const transactionId = this.transactionForm.get('transactionId').value;
    let data = {lang, transactionId}
    this.utilsService.loading();
    
    this.transactionService.checkTransaction(data).subscribe (

      result => { 

        const transaction = result['transaction'];
                
        if(transaction.status === this.global.STATUS_TRANSACTION_PENDENT && transaction.isTimeOut === false){

          localStorage.setItem('trx', transaction.transactionId);
          this.router.navigate([this.global.ROUTE_GATEWAY]);
          this.toastr.success(this.constants.MSG_TRANSACTION_FOUND);          

        }else{

          this.transactionId= transaction.transactionId;
          this.transactionFound = true;
          this.clientName = transaction.clientName;
          this.amount= transaction.amount;
          this.clientEmail = transaction.clientEmail;
          this.clientWallet= transaction.clientWallet;
          this.creationDate = transaction.creationDate;
          this.processdate = transaction.processdate;
          this.cryptoToSend = transaction.cryptoToSend+" "+transaction.symbol;
          this.transactionWallet = transaction.wallet;
          this.storeName = transaction.storeName;
          this.storeWeb = transaction.storeWeb;
          this.description = transaction.description;
          

          if(transaction.status === this.global.STATUS_TRANSACTION_CANCEL){
            this.statusTransaction = this.constants.LABEL_TRANSACTION_CANCEL;            
          }

          if(transaction.status === this.global.STATUS_TRANSACTION_TIMEOUT){
            this.statusTransaction =  this.constants.LABEL_TRANSACTION_TIMEOUT;
          }

          if(transaction.status === this.global.STATUS_TRANSACTION_ERROR){
            this.statusTransaction =  this.constants.LABEL_TRANSACTION_ERROR;
          }

          if(transaction.status === this.global.STATUS_TRANSACTION_SUCESSFULL){
            this.statusTransaction =  this.constants.LABEL_TRANSACTION_SUCESSFULL;
            this.textColor = "green";
          }

          if(transaction.status === this.global.STATUS_TRANSACTION_INCOMPLETE){
            this.statusTransaction =  this.constants.LABEL_TRANSACTION_INCOMPLETE;
            this.textColor = "green";
          }
        }
      },
      error => {
        this.utilsService.closeLoading();
        if (error.error !== undefined && error.error.err !== undefined) {
          if (error.error.err.transactionnotfound !== undefined){
            this.toastr.error(this.constants.MSG_ERROR_TRANSACTION_NOT_FOUND);
          }else if(error.error.err.cryptonotfound !==  undefined
            || error.error.err.cryptoerror !== undefined) {
              this.toastr.error(this.constants.MSG_ERROR_QUERY_TRANSACTION);
          }
        }
        return true;
      },
      () => {
        this.utilsService.closeLoading();
      });
  }

  msgValidateTransactionID(){
    return  this.transactionForm.get('transactionId').hasError('required') ? this.constants.LABEL_FIELD_REQUIRED :
    this.transactionForm.get('transactionId').hasError('minlength') ? this.constants.LABEL_MIN_LENGTH_24 : '';
  }

  checkAnother() {    
    this.router.navigateByUrl("/", {skipLocationChange: true})
    .then(() => this.router.navigate([this.global.ROUTE_CHECK_TRANSACTION]));
  }

  
  ngOnDestroy(): void {
    
  }

  public transactionForm = new FormGroup({
    transactionId: new FormControl('', [Validators.required, Validators.minLength(24)]),
  });


  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  changelanguage(lang: any) {
    localStorage.setItem('lang', lang);
    this.constants = this.commonsService.getConstants();    
  }
}