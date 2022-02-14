import { Component, OnInit} from '@angular/core';
import { AuthLoginService } from 'src/app/services/auth/auth.service';
import { UtilsService } from 'src/app/utils/utils.service';
import { ToastrService } from 'ngx-toastr';
import { CommonsService} from 'src/app/services/commons/commons.service';
import { TransactionService} from 'src/app/services/transaction/transaction.service';
import { global } from 'src/app/constants/global';
import { BlockchainModel} from 'src/app/models/BlockchainModel';
import { Transaction} from 'src/app/models/Transaction';
import { ResultTransactions } from 'src/app/models/ResultTransactions';
import { ModalDetailPaymentComponent } from 'src/app//modules/modal-detail-payment/modal-detail-payment.component';
import { formatDate} from '@angular/common';
import { MatDialog} from '@angular/material/dialog';

interface Status {
  code: number;
  value: string;
}

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
  providers: [UtilsService, AuthLoginService, CommonsService]
})

export class TransactionsComponent implements OnInit {
  
  public global: any;
  constants: any;
  blockchains= new Array<BlockchainModel>();  
  transactions: Transaction[];
  STATUS: Status[];
    
  constructor(
    private readonly authLoginService: AuthLoginService,
    private readonly commonsService: CommonsService,
    private readonly transactionService: TransactionService,
    private readonly utilsService: UtilsService,
    public dialog: MatDialog,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.global = global;
    this.constants = this.commonsService.getConstants();    

    this.STATUS = [      
      {code: 1, value: this.constants.STATUS_TRANSACTION_PENDENT },
      {code: 2, value: this.constants.STATUS_TRANSACTION_CANCEL },
      {code: 3, value: this.constants.STATUS_TRANSACTION_TIMEOUT },
      {code: 4, value: this.constants.STATUS_TRANSACTION_SUCESSFULL },
      {code: 5, value: this.constants.STATUS_TRANSACTION_INCOMPLETE },
      {code: 6, value: this.constants.STATUS_TRANSACTION_ERROR }
    
    ]
      
    this.transactionService.getAllTransactions().subscribe(
      async result => {
        this.processTransaction(result);
      },
      error => {
        this.toastr.error(this.constants.MSG_ERROR_API_BLOCKCHAINS);
      },
      () => { }
    );


    //Esto solo filtra los activos
    this.commonsService.getAllBlockchains().subscribe (
      result => {        
        this.blockchains =  result.data;   
      },
      error => {
        this.toastr.error(this.constants.MSG_ERROR_API_BLOCKCHAINS);
      },
      () => {}
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

