import { Component, OnInit } from '@angular/core';
import {AuthLoginService} from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonsService} from 'src/app/services/commons/commons.service';
import { global } from 'src/app/constants/global';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
  providers: [AuthLoginService, CommonsService]
})
export class AdminLayoutComponent implements OnInit {
  MENU_USER: any[];
  constants: any;
  datos: {role?: any, provider?: any, ok?: false};

  constructor(
    private readonly commonsService: CommonsService,
    private readonly authLoginService: AuthLoginService,
    public router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.constants = this.commonsService.getConstants();    

    const MENU_ROLE_USER =  [
      {menu: this.constants.LABEL_PANEL, route: global.ROUTE_DASHBOARD_HOME, icon: 'dashboard'},
      {menu: this.constants.LABEL_PROFILE, route: global.ROUTE_COMPANY_PROFILE, icon: 'person'},
      {menu: this.constants.LABEL_CONFIG, route: global.ROUTE_CONFIGURATION, icon: 'settings'},
      {menu: this.constants.LABEL_TRANSACTIONS, route: global.ROUTE_TRANSACTIONS, icon: 'view_list'},
      {menu: this.constants.LABEL_WALLET, route: global.ROUTE_WALLET, icon: 'account_balance_wallet'},      
      {menu: this.constants.LABEL_SECURITY, route: global.ROUTE_SECURITY, icon: 'https'},
      {menu: this.constants.LABEL_CLOSE_SESION, icon: 'power_settings_new'}
    ];
        
    this.MENU_USER = MENU_ROLE_USER;
    
  }

  closeSession() {
    this.authLoginService.closeSession();
    this.toastr.info(this.constants.MSG_SUCCESSFULL_CLOSE);
    this.router.navigate([global.ROUTE_HOME]);
  }
}
