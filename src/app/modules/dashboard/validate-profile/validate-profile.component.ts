import { Component, OnInit } from '@angular/core';
import { AuthLoginService} from 'src/app/services/auth/auth.service';
import { Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonsService} from 'src/app/services/commons/commons.service';
import { global } from 'src/app/constants/global';

@Component({
  selector: 'app-validate-profile',
  templateUrl: './validate-profile.component.html',
  styleUrls: ['./validate-profile.component.css'],
  providers: [CommonsService]
})
export class ValidateProfileComponent implements OnInit {

  global: any;
  route: string;
  componentName: string;
  showComponent: boolean;
  constants: any;

  constructor(
    private readonly commonsService: CommonsService,
    public router: Router,
    public authService: AuthLoginService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.global = global;
    this.constants = this.commonsService.getConstants();    
    console.log("this.router.routerState.snapshot.url -> ", this.router.routerState.snapshot.url);
    
    const snapshot = this.router.routerState.snapshot.url.split('/'); 
    if(snapshot.length==2){
      this.route = snapshot[1];
    }else if(snapshot.length==3){   
      this.route = snapshot[2];
    }
    console.log("this.route ", this.route);    
    this.acessByProfile(this.route);
  }

  acessByProfile(route: any) {

    this.authService.verifyRoleAndModule(route).then(result => {
      if (result) {
        this.componentName = route;
        this.showComponent = true;
      } else {
        this.showComponent = false;
        this.toastr.error(this.constants.MSG_ERROR_ACCESS_INVALID);
        this.router.navigate([global.ROUTE_HOME]);
      }
    }).catch(error => {
      this.showComponent = false;
      this.toastr.error(this.constants.MSG_ERROR_ACCESS_INVALID);
      this.router.navigate([global.ROUTE_HOME]);
    });
  }

}
