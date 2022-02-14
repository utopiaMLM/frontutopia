import { Component, OnInit, Inject} from '@angular/core';
import {AuthLoginService} from 'src/app/services/auth/auth.service';
import {CommonsService} from 'src/app/services/commons/commons.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { global } from 'src/app/constants/global';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [AuthLoginService, CommonsService]
})
export class HeaderComponent implements OnInit {
  public constants: any;
  public global: any;
  public showNavBar = false;
  collapsed = true;
  message: string;

  constructor(
    private readonly authLoginService: AuthLoginService,
    private readonly commonsService: CommonsService,
    public router: Router,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.global = global;
    this.constants = this.commonsService.getConstants();
  }

  changelanguage(lang: any) {
    localStorage.setItem('lang', lang);
    this.constants = this.commonsService.getConstants();    
    const snapshot = this.router.routerState.snapshot.url.split('/');
    let route = snapshot[1];
    const redirect = '/';

    if (route === this.global.ROUTE_DASHBOARD && snapshot.length == 2 ) {
        route = this.global.ROUTE_DASHBOARD;
        this.router.navigateByUrl("/", {skipLocationChange: false}).then(() => this.router.navigate([route]));
    }    else
    
    if (route === this.global.ROUTE_DASHBOARD && snapshot.length > 2 ) {
      route =  this.global.ROUTE_DASHBOARD + '/' + snapshot[2];
      this.router.navigateByUrl("/", {skipLocationChange: false}).then(() => this.router.navigate([route]));
    } else

    if(snapshot[0]==="" && route===this.global.ROUTE_HOME){      
      this.router.navigateByUrl(redirect, {skipLocationChange: true}).then(() => this.router.navigate([this.global.ROUTE_HOME]));
    }
    else 
    if(snapshot[0]==="" && route===""){      
      this.router.navigateByUrl(redirect, {skipLocationChange: true}).then(() => this.router.navigate([this.global.ROUTE_HOME]));
    }else{
      this.router.navigateByUrl(redirect, {skipLocationChange: true}).then(() => this.router.navigate([snapshot[1]]));
    }
  }

  goToPanel() {
    this.router.navigate([this.global.ROUTE_DASHBOARD]);
  }

  closeSession() {
    this.authLoginService.closeSession();
    this.toastr.info(this.constants.MSG_SUCCESSFULL_CLOSE);
    this.router.navigate([global.ROUTE_HOME]);    
  }

  isLoggedIn() {
    return this.authLoginService.isLoggedIn();
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

}
