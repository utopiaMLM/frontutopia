import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CommonsService} from 'src/app/services/commons/commons.service';
import { global } from 'src/app/constants/global';
import { BlockchainCryptoModel } from 'src/app/models/BlockchainCryptoModel';
import { CryptoCurrencyModel } from 'src/app/models/CryptoCurrencyModel';
import { ToastrService } from 'ngx-toastr';
import { Transaction} from 'src/app/models/Transaction';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-modal-detail-payment',
  templateUrl: './modal-detail-payment.component.html',
  styleUrls: ['./modal-detail-payment.component.css']
})
export class ModalDetailPaymentComponent implements OnInit {

  transaction: Transaction;
  constants: any;
  global: any;  
  color: any;

  constructor(
    public dialogRef: MatDialogRef<ModalDetailPaymentComponent>,
    private toastr: ToastrService,
    private readonly commonsService: CommonsService,
    @Inject(MAT_DIALOG_DATA) public data: Transaction) {
      this.getData(data);
    }

  
    ngOnInit(): void {
      this.global = global;
      this.constants = this.commonsService.getConstants();
    }

      
    
    getData(data) {
      this.transaction = data.transaction;

      if (this.transaction.code_status === global.STATUS_TRANSACTION_PENDENT) {        
        this.color = "blue";          

      } else if (this.transaction.code_status === global.STATUS_TRANSACTION_SUCESSFULL) {        
        this.color = "green";          

      } else if (this.transaction.code_status === global.STATUS_TRANSACTION_INCOMPLETE) {
        this.color = "yellow";

      }else if (this.transaction.code_status === global.STATUS_TRANSACTION_CANCEL || this.transaction.code_status === global.STATUS_TRANSACTION_TIMEOUT)  {
        this.color = "orange";          

      } else if (this.transaction.code_status === global.STATUS_TRANSACTION_ERROR) {
        this.color = "red";          
      }
    }

    close(){
      this.dialogRef.close();
    }

}
