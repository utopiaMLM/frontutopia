import { Component, OnInit} from '@angular/core';
import { AuthLoginService } from 'src/app/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CommonsService} from 'src/app/services/commons/commons.service';
import { TransactionService} from 'src/app/services/transaction/transaction.service';
import { Transaction} from 'src/app/models/Transaction';
import { ResultTransactions } from 'src/app/models/ResultTransactions';
import { ModalDetailPaymentComponent } from 'src/app//modules/modal-detail-payment/modal-detail-payment.component';
import { formatDate} from '@angular/common';
import { MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';

export interface PeriodicElement {
  date: Date;
  amount: number;
  status: string;
  client: string;
  crypto: string;
}

export interface Status {
  code: number;
  value: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AuthLoginService, CommonsService]
})
export class HomeComponent implements OnInit {

  
  public global: any;
  constants: any;
  transactions: Transaction[];
  total: any;
  STATUS: Status[];
  
  cancelados = 0;
  incompletos = 0;
  timeouts = 0;
  exitosos = 0;

  constructor(
    private readonly commonsService: CommonsService,
    private readonly authLoginService: AuthLoginService,
    private readonly transactionService: TransactionService,
    public dialog: MatDialog,
    public router: Router,
    private toastr: ToastrService) { }


  ngOnInit(): void {
    this.constants = this.commonsService.getConstants();
    this.total = '0.0';

    this.STATUS = [      
      {code: 1, value: this.constants.STATUS_TRANSACTION_PENDENT },
      {code: 2, value: this.constants.STATUS_TRANSACTION_CANCEL },
      {code: 3, value: this.constants.STATUS_TRANSACTION_TIMEOUT },
      {code: 4, value: this.constants.STATUS_TRANSACTION_SUCESSFULL },
      {code: 5, value: this.constants.STATUS_TRANSACTION_INCOMPLETE },
      {code: 6, value: this.constants.STATUS_TRANSACTION_ERROR }
    
    ]
      
    this.transactionService.getLastTransactions().subscribe(
      async result => {
        this.processTransaction(result);
      },
      error => {
        this.toastr.error(this.constants.MSG_ERROR_API_BLOCKCHAINS);
      },
      () => { }
    );
   
  }

  processTransaction(result: ResultTransactions){    
    
    this.transactions = new Array<Transaction>();

    if(result.transactions!=null){      
      result.transactions.forEach(element => {
        element.creationDate = formatDate( element.creation_date, 'dd/MM/y hh:mm:ss a', 'en-US');
        if(element.processdate!== undefined){
          element.process_date= formatDate( element.processdate, 'dd/MM/y hh:mm:ss a', 'en-US');
        }        
        element.code_status = element.status;
        element.status = this.processStatus(element.status);
        element.cryptoToSend = element.cryptoToSend + " " +element.symbol;
        this.transactions.push(element);
      });      
    }
    
  }
  processStatus(status: number): any {

    if(status === 1){
      this.exitosos = this.exitosos + 1;  
    }
    if(status === 5){
      this.incompletos = this.incompletos + 1;  
    }
    if(status === 3){
      this.timeouts = this.timeouts + 1;  
    }
    if(status === 2){
      this.cancelados = this.cancelados + 1;  
    }

    return this.STATUS.find(data=>data.code === status).value; 

    
  }


    
 /**
   * Abre el dialogo de confirmación para crear la transaccion
   */
  viewDetails(element: Transaction): void {
    const dialogRef = this.dialog.open(ModalDetailPaymentComponent, {
      panelClass: 'mat-modal-with-background',
      disableClose: false,
      width:"100%",
      data: {transaction: element }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
