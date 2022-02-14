import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonsService} from 'src/app/services/commons/commons.service';
import { TransactionService } from 'src/app/services/transaction/transaction.service';
import { UtilsService } from 'src/app/utils/utils.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthLoginService} from 'src/app/services/auth/auth.service';
import { MatDialog} from '@angular/material/dialog';
import { SponsoringCompanyModel } from 'src/app/models/SponsoringCompanyModel';
import { ResultCrypto } from 'src/app/models/ResultCryptos';
import { BlockchainCryptoModel } from 'src/app/models/BlockchainCryptoModel';
import { ResultCoinGecko } from 'src/app/models/ResultCoinGecko';
import { DialogQuestionComponent } from 'src/app/modules/dialog-question/dialog-question.component';
import { ModalCryptosComponent } from 'src/app//modules/modal-cryptos/modal-cryptos.component';
import * as moment from 'moment';
import { Transaction } from 'src/app/models/Transaction';
import { global } from 'src/app/constants/global';
import { CryptoCurrencyModel } from 'src/app/models/CryptoCurrencyModel';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers: [UtilsService, AuthLoginService,  CommonsService, TransactionService]
})

export class PaymentComponent implements OnInit, OnDestroy {
  resultProfile: SponsoringCompanyModel;
  public resultCoinGecko: ResultCoinGecko;
  public dataCryptos: ResultCrypto;
  public blockchainCrypto= new Array<BlockchainCryptoModel>();
  public constants: any;
  private params: any;
  public color: any;
  public icon: any;
  public title: any;
  public message1: any;
  public message2: any;
  public global: any;
  public cryptos = [];  
  public getCrypto = false;
  public cryptoSelected: CryptoCurrencyModel;
  public selectedToken: any;
  profileId: any;
  purchaseId: any;
  collapsed = true;
  amount: any;
  buyerName: string;
  buyerEmail: string;
  description: string;
  msgError: any;
  isError = false;  
  logo: any;
  symbol: any;
  price: any;
  total: any;  
  color2:any;
  sendtotal: any;  
  imageToken: any;
  digits: any;
  digitsT:any;
  contador = 180;
  contadorT= 0;
  id: any;  
  idT: any;
  transactionDone: boolean;
  transaction: Transaction;
  wallet: any;
  isAnulated = false;
  msgSuccess = "";
  iconSuccess = "";
  colorSuccess = "";  
  loop = 0;
  secondsForCheck = 60;
  isCompleted = false;
  msgCompleted: any;
  iconCompleted: any;
  colorCompleted: any;
  descriptionArray = [];
  valores: any;
  priceBronze = 100;
  priceSilver = 200;
  priceGold = 500;
  totalValueBronze = 0;
  totalValueSilver = 0;
  totalValueGold = 0;
  totalAmpunt = 0;
  descriptionText = [];
  isDateStart = false;
  tokenPrice = 0;
  totalAmount = 0;


  public paymentForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(this.utilsService.emailPattern)]),
    name: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(4)])
  });


  constructor(private readonly commonsService: CommonsService, private route: ActivatedRoute,
    private readonly authLoginService: AuthLoginService, private readonly transactionService: TransactionService,
    public dialog: MatDialog, public router: Router, private readonly utilsService: UtilsService, private toastr: ToastrService) {}

ngOnInit(): void {
    this.global = global;    
    let description = "";
    this.constants = this.commonsService.getConstants();    
    this.profileId = this.global.profileID;

    this.amount = 0;
    this.buyerName = "";
    this.buyerEmail = "";
    this.description = "";

    this.icon = this.constants.ICON_ERROR;          
    this.color = 'red';    
    this.color2 = '#383839';
    this.resultProfile = new SponsoringCompanyModel();   

    if(localStorage.getItem('lang') ===undefined || localStorage.getItem('lang') === null ){
      localStorage.setItem('lang', this.global.LANGUAGE_EN);
    } 
      
    if(this.getTransactionNow()){

      this.params = this.route.params.subscribe(params => { 
        if(this.validateParams(params)){
          this.commonsService.getProfile(this.profileId).subscribe(
            result => {
              this.resultProfile = result;
              this.paymentForm.get('email').setValue(this.buyerEmail);
              this.paymentForm.get('name').setValue(this.buyerName);         
              this.totalAmount = this.amount;
            },
            error => {
              this.msgError =  this.constants.MSG_ERROR_PROFILE_NOT_FOUND;
              this.isError =  true;  
            },
            () => {  
              this.commonsService.getCryptoByProfile(this.profileId).subscribe(
                result => {    
                  this.dataCryptos = result;
                  this.blockchainCrypto = this.dataCryptos.cryptos;                
                },
                error => {
                  this.msgError =  this.constants.MSG_ERROR_CRYPTOS_NOT_FOUND;                
                  this.isError =  true; 
                },
                () => {
      
              });
          });
        }      
      });
    }   
  }

   /**
   * Crea una transacción
   */
  createTransaction() {
    this.utilsService.loading();
    const lang = this.commonsService.getLang();

    const data = {
      profileId: this.profileId,
      clientName: this.paymentForm.get('name').value,
      clientEmail: this.paymentForm.get('email').value,
      amount: this.totalAmount,
      description: "",
      cryptoSelected: this.selectedToken._id,
      blockchainSelected: this.selectedToken.blockchain[0],
      priceCryptoSelected: this.price,
      cryptoToSend: parseFloat(this.sendtotal),
      symbol: this.selectedToken.symbol,  
      blockchainSymbol: this.selectedToken.blockchainSymbol,
      smartcontract: this.selectedToken.smartcontract, 
      //purchaseId: this.purchaseId,
      subject:  this.constants.LABEL_TRANSACTION,
      lang};

    this.transactionService.generateTransaction(data).subscribe (
      result => {
        if (this.id) {
          clearInterval(this.id);
        }
        
        this.utilsService.closeLoading();
        this.transactionDone = true;
        this.toastr.info(this.constants.MSG_SUCCESS_TRANSACTION);
        this.imageToken = this.selectedToken.image;
        this.transaction = result;        
        this.wallet = this.transaction.wallet;        
        this.contadorT = this.transaction.timeOut;
        this.symbol = this.selectedToken.symbol;

        //generate trx en sesion
        localStorage.setItem('trx', this.transaction.transactionId);
        this.idT = setInterval(() => {
          this.decrementTimeTransaction();
        }, 1000);
        },
      error => {
        this.utilsService.closeLoading();
        this.toastr.info(this.constants.MSG_ERROR_TRANSACTION);

      },
      () => {
        this.utilsService.closeLoading();
      }
    );
  }


  /**
   * Chequea si el usuario tiene o no tiene una transaccion
   * al momento de cargar la pagina
   * 
   */
  getTransactionNow(): boolean{

    const transactionId = localStorage.getItem('trx');

    if(transactionId != null){

      const data = {transactionId};

      this.transactionService.checkTransaction(data).subscribe (
        result => {

          this.processResult(result);

          if (this.id) {
            clearInterval(this.id);
          }
          if (this.idT) {
            clearInterval(this.idT);
          }
          this.transactionDone = true;          
          this.transaction = result['transaction'];        
          this.wallet = this.transaction.wallet;        
          this.contadorT = this.transaction.timeOut;         
          this.sendtotal = this.transaction.cryptoToSend;
          this.symbol = this.transaction.symbol;    
          this.imageToken = this.transaction.image;
          this.amount = this.transaction.amount;

          this.idT = setInterval(() => {
           this.decrementTimeTransaction();
          }, 1000);

          this.getCrypto = true;

          return false;

        },
        error => {
          if (error.error !== undefined && error.error.err !== undefined) {
            if (error.error.err.transactionnotfound !== undefined 
              || error.error.err.transactioncanceled !== undefined
              || error.error.err.cryptonotfound !==  undefined
              || error.error.err.cryptoerror !== undefined) {
              localStorage.removeItem('trx');
              this.ngOnDestroy();           
            }
          }
          return true;
        },
        () => {
  
        }
      );
    }else{
      return true;
    }    
  }

 
  /**
   * Chequea el status de la transaccion para verificar si las monedas fueron enviadas
   * para eso llama a un ws que se encarga de validar el contenido de las wallets
   * y actualizar el estado de la transaccion
   */
  checkTransaction() {

    this.utilsService.loading();
    const lang = this.commonsService.getLang();
    const data = { transactionId: this.transaction.transactionId,lang};

    this.transactionService.checkTransaction(data).subscribe(
      result => {

        this.utilsService.closeLoading();

       this.processResult(result);
      },
      error => {
        this.utilsService.closeLoading();
        localStorage.removeItem('trx');
        this.ngOnDestroy();                      
      },
      () => {
        this.utilsService.closeLoading();
      }
    );
  }
  processResult(result: Transaction) {
   
    if (result.continue === undefined) {
      this.ngOnDestroy();
      this.isCompleted = true;
      localStorage.removeItem('trx');
    }

    if (result.complete !== undefined) {
      this.toastr.success(this.constants.MSG_SUCCESSFUL_TRANSACTION);
      this.msgCompleted =  this.constants.MSG_SUCCESSFUL_TRANSACTION;
      this.iconCompleted = this.constants.ICON_SUCCESS;  
      this.colorCompleted = "blue";          

    } else if (result.incomplete  !== undefined ) {
      this.toastr.success(this.constants.MSG_SUCCESSFUL_TRANSACTION);
      this.msgCompleted =  this.constants.MSG_SUCCESSFUL_TRANSACTION;
      this.iconCompleted = this.constants.ICON_SUCCESS;  
      this.colorCompleted = "blue";          

    } else if (result.timeout  !== undefined) {
      this.toastr.warning(this.constants.MSG_ERROR_TIMEOUT_TRANSACTION);
      this.msgCompleted =  this.constants.MSG_ERROR_TIMEOUT_TRANSACTION;
      this.iconCompleted = this.constants.ICON_ERROR;  
      this.colorCompleted = "red";

    }else if (result.witherrors  !== undefined) {
      this.toastr.warning(this.constants.MSG_ERROR_TRANSACTION_WITH_ERRORS);
      this.msgCompleted =  this.constants.MSG_ERROR_TRANSACTION_WITH_ERRORS;
      this.iconCompleted = this.constants.ICON_ERROR;  
      this.colorCompleted = "red";          

    }else if (result.cancel  !== undefined) {
      this.toastr.warning(this.constants.MSG_ERROR_TRANSACTION_CANCELED);        
      this.msgCompleted =  this.constants.MSG_ERROR_TRANSACTION_CANCELED;
      this.iconCompleted = this.constants.ICON_ERROR;  
      this.colorCompleted = "red";          
    }
  }

    /**
   * Anula la transacción
   */
  anulateTransaction() {
    
    this.iconSuccess = this.constants.ICON_SUCCESS;
    this.colorSuccess = 'blue';

    this.utilsService.loading();
    const lang = this.commonsService.getLang();
    const subject = this.constants.MSG_ANUL_TRANSACTION;

    const data = { transactionId: this.transaction.transactionId, subject,lang };

    this.transactionService.cancelTransaction(data).subscribe (
      result => {
        localStorage.removeItem("trx");
        this.utilsService.closeLoading();
        this.toastr.info(this.constants.MSG_SUCCESS_ANUL_TRANSACTION);
        this.isAnulated= true;
        this.transactionDone = true;
        this.isError = false;
        this.msgSuccess = this.constants.MSG_SUCCESS_TRANSACTION_ANULATED;
        this.ngOnDestroy();
      },
      error => {
        this.utilsService.closeLoading();
        if (error.error !== undefined && error.error.err !== undefined){
            this.toastr.error(this.constants.MSG_ERROR_CANCEL_TRANSACTION);
        }
      },
      () => {
        this.utilsService.closeLoading();
      }
    );
  }
  
    
  /**
   * Da por terminado el tiempo de la transacción
   */
  timeoutTransaction(){
    this.iconSuccess = this.constants.ICON_TIEMOUT;
    this.colorSuccess = 'blue';

    this.utilsService.loading();
    const lang = this.commonsService.getLang();
    const subject = this.constants.MSG_TIMEOUT_TRANSACTION+this.transaction.transactionId;

    const data = { transactionId: this.transaction.transactionId, subject,lang };

    this.transactionService.timeOutTransaction(data).subscribe (
      result => {
        this.ngOnDestroy();
        localStorage.removeItem("trx");
        this.utilsService.closeLoading();
        this.toastr.info(this.constants.MSG_ERROR_TIMEOUT_TRANSACTION);
        this.isAnulated= true;
        this.transactionDone = true;
        this.isError = false;
        this.msgSuccess = this.constants.MSG_ERROR_TIMEOUT_TRANSACTION;

      },
      error => {
        this.utilsService.closeLoading();
        if (error.error !== undefined && error.error.err !== undefined){
            this.toastr.error(this.constants.MSG_ERROR_CANCEL_TRANSACTION);
        }
        this.ngOnDestroy();
      },
      () => {
        this.utilsService.closeLoading();
      }
    );
  }

  getValueTokenTOP(){
    this.utilsService.loading();
    this.commonsService.getInfoTOP().subscribe (
      result => {
        this.getCrypto = true;
        this.resultCoinGecko = result;
        this.price = this.resultCoinGecko.data;
        this.sendtotal = (this.totalAmount /  this.price) ;
        this.sendtotal = this.sendtotal.toFixed(4);
        this.utilsService.closeLoading();
        this.contador = 180;
        if (this.id) {
          clearInterval(this.id);
        }
        this.id = setInterval(() => {
          this.decrementTime();
          }, 1000);


      },
      error => {
        this.utilsService.closeLoading();
        this.getCrypto = false;
        this.toastr.error(this.constants.MSG_ERROR_API_PRECIO);
        if (this.id) {
          clearInterval(this.id);
        }        
      },
      () => {
        this.utilsService.closeLoading();
        this.paymentForm.markAllAsTouched();
      });
}


  /**
  * Obtiene el valor de la moneda consultada a traves del api de coingecko
  */
 getValueToken() {

    const data = {url: this.selectedToken.url, symbol: this.selectedToken.namequery};
    this.utilsService.loading();
    this.commonsService.getInfoCoingecko(data).subscribe (
      result => {
        this.getCrypto = true;
        this.resultCoinGecko = result;
        this.price = this.resultCoinGecko.data.usd;
        this.sendtotal = (this.totalAmount /  this.price) ;
        this.sendtotal = this.sendtotal.toFixed(4);
        this.utilsService.closeLoading();
        this.contador = 180;
        if (this.id) {
          clearInterval(this.id);
        }
        this.id = setInterval(() => {
          this.decrementTime();
          }, 1000);


      },
      error => {
        this.utilsService.closeLoading();
        this.getCrypto = false;
        this.toastr.error(this.constants.MSG_ERROR_API_PRECIO);
        if (this.id) {
          clearInterval(this.id);
        }        
      },
      () => {
        this.utilsService.closeLoading();
        this.paymentForm.markAllAsTouched();
      });
}

  /** Valida el email */
  validateEmail(email) {
    const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExpression.test(String(email).toLowerCase());
   }

   msgValidateEmail(){
    return  this.paymentForm.get('email').hasError('required') ? this.constants.MSG_ERROR_INVALID_EMAIL :
    this.paymentForm.get('email').hasError('email') ? this.constants.MSG_ERROR_INVALID_EMAIL :
    '';
   }

   msgValidateName(){
    return  this.paymentForm.get('name').hasError('required') ? this.constants.LABEL_FIELD_REQUIRED :
    this.paymentForm.get('name').hasError('maxlength') ? this.constants.LABEL_MAX_LENGTH_50 :
    this.paymentForm.get('name').hasError('minlength') ? this.constants.LABEL_MIN_LENGTH_4 :
    '';
   }

  msgValidateFormPayment() {
    return  this.paymentForm.get('paymentForm').hasError('required') ? this.constants.LABEL_FIELD_REQUIRED :
    '';
  }

 /**
   * Abre el dialogo de confirmación para crear la transaccion
   */
  openCoins(): void {
    const dialogRef = this.dialog.open(ModalCryptosComponent, {
      panelClass: 'mat-modal-with-background',
      disableClose: true,
      data: {dataCrypto: this.blockchainCrypto }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.cryptoSelected = result.cryptoSelected;
      this.selectedToken = this.cryptoSelected;
      if(this.selectedToken.symbol === 'TOP' ){
        this.getValueTokenTOP();
      }else{
        this.getValueToken();
      } 

    });
  }
  
 /**
   * Abre el dialogo de confirmación para crear la transaccion
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogQuestionComponent, {
      panelClass: 'mat-modal-with-background',
      disableClose: true,
      data: {question: this.constants.LABEL_QUESTION_TRANSACTION, type: 'create' },
      width: '260px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'accept') {
        this.createTransaction();
      }
    });
  }

  
  /**
   * Abre el dialogo de confirmación para anular la transacción
   */
  openDialogAnul(): void {
    const dialogRef = this.dialog.open(DialogQuestionComponent, {
      panelClass: 'mat-modal-with-background',
      disableClose: true,
      data: {question: this.constants.LABEL_QUESTION_ANUL_TRANSACTION, type: 'anul'},
      width: '260px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'anul') {
        this.anulateTransaction();
      }
    });
  }

  /**
   * Decrementa el tiempo en segundo de la transaccion
   */
  decrementTimeTransaction()  {
    this.loop = this.loop + 1;
    this.digitsT = this.timeConvert(this.contadorT);
    this.contadorT = this.contadorT - 1;    
    if (this.contadorT < 1) { //Es timeout           
      this.ngOnDestroy();
      this.checkTransaction();      
      return true;
    } else if (this.loop === this.secondsForCheck) {//Cada 60 segundos reviso la transaccion
      this.loop = 0;
      this.checkTransaction();     
    }
  }

  /**
   * Decrementa el tiempo en segundo de la transaccion
  */
  decrementTime() {
    this.digits = this.timeConvert(this.contador);
    this.contador = this.contador - 1;    
    if (this.contador <= 0 ) {      
      this.getValueToken();
    }
  }

  /**
   * Formatea el tiempo en segundos
   */
  timeConvert(secs) {
    return moment.unix(secs).utc().format('m [minutes and] s [seconds]');
  }

  
  /** Funciones de header */
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

/** Funciones de header */
changelanguage(lang: any) {
  localStorage.setItem('lang', lang);
  this.constants = this.commonsService.getConstants();    
}

    /** On destroy */  
    ngOnDestroy() {
      if (this.id) {
        clearInterval(this.id);
      }
      if(this.idT){
        clearInterval(this.idT);
      }
    }
 /**
   * Toma los parametros de la url
   * 
   * @param params 
   * 
   */
  validateParams(params:any):boolean{

    if (params.amount === undefined || isNaN(params.amount)) {
      this.isError =  true;  
      this.msgError =  this.constants.LABEL_ERROR_AMOUNT;
      return false;
    }else{
      this.amount = params.amount;
    }
    
    /*if (params.purchaseId === undefined) {
      this.isError =  true;  
      this.msgError =  this.constants.LABEL_ERROR_PURCHASE_ID;
      return false;
    }else{
      this.purchaseId = params.purchaseId;
    }*/

    if (params.buyerName !== undefined && params.buyerName.trim() ==='') {
      this.isError =  true;  
      this.msgError =  this.constants.LABEL_ERROR_BUYER_NAME;
      return false;
    }else{
      this.buyerName = params.buyerName;
    }

    if (params.buyerEmail !== undefined && !this.validateEmail(params.buyerEmail)) {
      this.isError =  true;  
      this.msgError =  this.constants.LABEL_ERROR_BUYER_EMAIL;
      return false;
    }else{
      this.buyerEmail = params.buyerEmail;
    }

    if (params.description !== undefined) {
      this.description = params.description;
    }
    this.isError= false;
    return true;

  }
}


