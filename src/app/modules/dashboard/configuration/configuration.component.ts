import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthLoginService } from 'src/app/services/auth/auth.service';
import { UtilsService } from 'src/app/utils/utils.service';
import { ToastrService } from 'ngx-toastr';
import { CommonsService} from 'src/app/services/commons/commons.service';
import { BlockchainModel} from 'src/app/models/BlockchainModel';
import { BlockchainUserModel} from 'src/app/models/BlockchainUserModel';
import { global } from 'src/app/constants/global';

export interface Data {
  name: string;
  position: number;
  mandatory: string;
  description: string;
}

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css'],
  providers: [UtilsService, AuthLoginService, CommonsService]
})
export class ConfigurationComponent implements OnInit {
  public global: any;
  blockchains= new Array<BlockchainModel>();  
  blockchainsUser= new  Array<any>();  
  constants: any;
  checkboxblock =[];
  checked= new Array<boolean>();
  datos = new BlockchainUserModel();
  datainfo: Data[];

  constructor(
    private readonly authLoginService: AuthLoginService,
    private readonly commonsService: CommonsService,
    private readonly utilsService: UtilsService,
    private toastr: ToastrService) { }

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

    this.commonsService.getBlockchainsUser().subscribe(
      result => {        
        this.blockchainsUser = result.blockchains;
      },
      error => {
        this.toastr.error(this.constants.MSG_ERROR_API_BLOCKCHAINS);
      },
      () => {}      
    )

    

    this.datainfo = [
      {position: 1, name: 'profileId', mandatory: this.constants.LABEL_YES, description:  this.constants.LABEL_DESCRIPTION_PROFILE_ID},
      {position: 2, name: 'amount', mandatory: this.constants.LABEL_YES, description:  this.constants.LABEL_DESCRIPTION_AMOUNT},
      {position: 3, name: 'purchaseId', mandatory: this.constants.LABEL_YES, description:  this.constants.LABEL_DESCRIPTION_PURCHASE_ID},
      {position: 4, name: 'buyerName', mandatory: this.constants.LABEL_NO, description:  this.constants.LABEL_DESCRIPTION_BUYER_NAME},
      {position: 5, name: 'buyerEmail', mandatory: this.constants.LABEL_NO, description:  this.constants.LABEL_DESCRIPTION_BUYER_EMAIL},
      {position: 6, name: 'description', mandatory: this.constants.LABEL_NO, description:  this.constants.LABEL_DESCRIPTION_DESCRIPTION},
      ];
  }

  onChange($event) {
    if($event.checked){
      if(this.blockchainsUser.filter(datos => datos !== $event.source.value)){
        this.blockchainsUser.push($event.source.value);
      }
    }

    if(!$event.checked){
      if(this.blockchainsUser.filter(datos => datos === $event.source.value)){
        this.blockchainsUser = this.blockchainsUser.filter(datos => datos !== $event.source.value);
      }
    }
  }

  containValue(value, blockchainsUser): boolean {          
    if(value!==undefined && blockchainsUser.indexOf(value) != -1){
      return true;
    }else{
      return false;
    }    
  }

    updateBlochcainsUser(){
      this.utilsService.loading();
      this.commonsService.updateBlockchainsUser(this.blockchainsUser).subscribe(
        result => {              
          this.blockchainsUser = result.blockchains;
        },
        error => {
          this.utilsService.closeLoading();
          this.toastr.error(this.constants.MSG_ERROR_UPDATE_BLOCKCHAINS);
        },
        () => {
          this.toastr.info(this.constants.MSG_SUCCESSFULL_UPDATED);       
          this.utilsService.closeLoading();    
        }      
      )
    }   
}
