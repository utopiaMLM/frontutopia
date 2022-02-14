import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CommonsService} from 'src/app/services/commons/commons.service';
import { global } from 'src/app/constants/global';
import { BlockchainCryptoModel } from 'src/app/models/BlockchainCryptoModel';
import { CryptoCurrencyModel } from 'src/app/models/CryptoCurrencyModel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-cryptos',
  templateUrl: './modal-cryptos.component.html',
  styleUrls: ['./modal-cryptos.component.css']
})
export class ModalCryptosComponent implements OnInit {

  constants: any;
  global: any;  
  public dataCrypto = new Array<BlockchainCryptoModel>();
  public cryptoSelected: CryptoCurrencyModel;

  constructor(
    public dialogRef: MatDialogRef<ModalCryptosComponent>,
    private toastr: ToastrService,
    private readonly commonsService: CommonsService,
    @Inject(MAT_DIALOG_DATA) public data: Array<BlockchainCryptoModel>) {
      this.getData(data);
    }

    getData(data) {
      this.dataCrypto = data.dataCrypto;      
    }

    ngOnInit(): void {
      this.global = global;
      this.constants = this.commonsService.getConstants();
    }

    doSelect() {
      if(this.cryptoSelected === undefined ||this.cryptoSelected === null){
        this.toastr.warning(this.constants.MSG_ERROR_CRYPTO_SELECT);
      }else{
        this.dialogRef.close({cryptoSelected: this.cryptoSelected});
      }
      
    }


    getValueToken(crypto: CryptoCurrencyModel){
      this.cryptoSelected = crypto;
    }
}
