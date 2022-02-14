import { Component, OnInit } from '@angular/core';
import {AuthLoginService} from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonsService} from 'src/app/services/commons/commons.service';
import { UtilsService } from 'src/app/utils/utils.service';
import { ProfilesService } from 'src/app/services/profiles/profiles.service';
import { global } from 'src/app/constants/global';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css'],
  providers: [UtilsService, CommonsService, AuthLoginService, ProfilesService],
})
export class WalletComponent implements OnInit {
  constants: any;
  global: any;
  wallet: any;
  color: any;
  resultData: any;
  balances: any;
  nSend = 0;

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
  }

}
