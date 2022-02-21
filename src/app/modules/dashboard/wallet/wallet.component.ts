import { Component, ElementRef, OnInit, ViewChildren, QueryList } from '@angular/core';
import {AuthLoginService} from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonsService} from 'src/app/services/commons/commons.service';
import { UtilsService } from 'src/app/utils/utils.service';
import { ProfilesService } from 'src/app/services/profiles/profiles.service';
import { global } from 'src/app/constants/global';
import { BlockchainModel} from 'src/app/models/BlockchainModel';
import { validate } from 'crypto-address-validator-ts';
import { ResultWallets } from 'src/app/models/ResultWallets';


@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css'],
  providers: [UtilsService, CommonsService, AuthLoginService, ProfilesService]  
})
export class WalletComponent implements OnInit {
  constants: any;
  global: any;
  wallet: any;
  color: any;
  resultData: any;
  balances: any;
  nSend = 0;
  result= true;
  blockchains= new Array<BlockchainModel>();  
  blockchainsUser= new  Array<any>();  
  walletsUser : ResultWallets;
  @ViewChildren('wallets[]') wallets: QueryList<ElementRef>;
  @ViewChildren('blocks[]') blocks: QueryList<ElementRef>;
  @ViewChildren('nameblockchain[]') nameblockchain: QueryList<ElementRef>;  
  @ViewChildren('message[]') message: QueryList<ElementRef>;  

  constructor(
    private readonly commonsService: CommonsService,
    private readonly authLoginService: AuthLoginService,
    private readonly profilesService: ProfilesService,
    private readonly utilsService: UtilsService,
    public router: Router,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.global = global;
    this.constants = this.commonsService.getConstants();    

    this.commonsService.getBlockchains().subscribe (
      result => {        
        this.blockchains =  result.data;   
      },
      error => {
        this.toastr.error(this.constants.MSG_ERROR_API_BLOCKCHAINS);
      },
      () => {}
    );

    this.commonsService.getWalletsUser().subscribe(
      result => {        
        this.walletsUser = result;
        this.processResult( this.walletsUser); 
      },
      error => {
        this.toastr.error("Error al obtener la wallets");
      },
      () => {}      
    )
  }

  save(){
    
    const wallets = this.wallets;
    const nameblock = this.nameblockchain.toArray();
    const block = this.blocks.toArray();
    let dataArray = [];
    
    let cont = 0;
    wallets.forEach(data=>{
      this.result = this.validateWallet(data.nativeElement.value, nameblock[cont].nativeElement.value,cont);      
      if(!this.result){
        return
      }
      cont = cont +1;
    });


    let cont2 = 0;
    if(this.result){
      wallets.forEach(data=>{
        const wallet = data.nativeElement.value;
        const blockchain = block[cont2].nativeElement.value;
        const symbol = nameblock[cont2].nativeElement.value;
        const dataBlock = {wallet,blockchain,symbol};
        dataArray.push(dataBlock);
        cont2 = cont2 +1;
      });

      this.utilsService.loading();

      this.commonsService.saveWallet(dataArray).subscribe(
        result => {        
          this.toastr.success("Se guardaron las wallets exitosamente");
          this.utilsService.closeLoading();
        },
        error => {
          this.toastr.error("Sucedió un error al intentar guardar las wallets, por favor intentelo mas tarde");
          this.utilsService.closeLoading();
        },
        () => {
          
        }      
      )
    }

  }

  validateWallet(wallet: any, blockchain: any,cont: any):boolean{
    if(blockchain === 'bsc'){
     return this.validateWalletBSC(wallet,cont);
    }
    if(blockchain === 'tron'){
      return this.validateWalletTron(wallet,cont);
    }    
  }

  validateWalletTron(wallet: any, cont: any):boolean {
    const messages = this.message.toArray();
    if(!validate(wallet, 'tron',null)){    
      messages[cont].nativeElement.innerText = "Wallet para la red de Tron incorrecta";     
      return false;     
    }else{
      messages[cont].nativeElement.innerText = "";
      return true;  
    }
    
  }
  validateWalletBSC(wallet: any, cont: any):boolean {
    const messages = this.message.toArray();
    if(!validate(wallet, 'eth',null)){    
      messages[cont].nativeElement.innerText = "Wallet para la Binance Smart Chain Incorrecta";
      return false;
    }else{
      messages[cont].nativeElement.innerText = "";    
      return true;  
    }
  }
  
  processResult(walletsUser: ResultWallets){
    const wallets = this.wallets.toArray();
    const symbolBlock = this.nameblockchain.toArray();
    let cont =  0;
    symbolBlock.forEach(data=>{
      const symbol = data.nativeElement.value;      
      const wallet = walletsUser.data.walletblockchains.filter(datos=>datos.symbol === symbol);
      if(wallet!=null){
        wallets[cont].nativeElement.value = wallet[0].wallet;
      }
      cont = cont + 1;  
    });
    
  }  


}
