import { Component, OnInit } from '@angular/core';
import { AuthLoginService} from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { global } from 'src/app/constants/global';
import { CommonsService} from 'src/app/services/commons/commons.service';

@Component({
  selector: 'app-validate-session',
  templateUrl: './validate-session.component.html',
  styleUrls: ['./validate-session.component.css'],
  providers: [AuthLoginService, CommonsService]
})
export class ValidateSessionComponent implements OnInit {
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


  ngOnInit(): void {
    this.global = global;
    this.constants = this.commonsService.getConstants();
    const snapshot = this.router.routerState.snapshot.url.split('/');
    if (snapshot.length > 2) {
      this.toastr.warning(this.constants.MSG_ERROR_ACCESS_INVALID);
      this.router.navigate([global.ROUTE_HOME]);
    } else {
      this.route = snapshot[1];
      this.validateSession(this.route);
    }
  }

  validateSession(route: any) {
    this.authService.validateSession().then(result => {
      if (result) {
        this.componentName = route;
        this.showComponent = true;
      } else {
        this.showComponent = false;
        this.toastr.warning(this.constants.MSG_ERROR_AUTHENTICATED);
        this.router.navigate([global.ROUTE_HOME]);
      }
    });
  }
}
