import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthLoginService} from 'src/app/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CommonsService} from 'src/app/services/commons/commons.service';
import { global } from 'src/app/constants/global';

@Component({
  selector: 'app-activateuser',
  templateUrl: './activateuser.component.html',
  styleUrls: ['./activateuser.component.css'],
  providers: [AuthLoginService, CommonsService],
})
export class ActivateuserComponent implements OnInit {
  public urlTree: any;
  public userid: any;
  public constants: any;
  public color: any;
  public icon: any;
  public title: any;
  public message1: any;
  public message2: any;
  public global: any;

  constructor(
    private readonly commonsService: CommonsService,
    public router: Router,
    private readonly authLoginService: AuthLoginService,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.global = global;
    this.constants = this.commonsService.getConstants();
    this.urlTree = this.router.parseUrl(this.router.url);
    this.userid = this.urlTree.queryParams.id;

    if (this.userid !== undefined) {
      this.activateUserId(this.userid);
    } else {
      this.icon = this.constants.ICON_ERROR;
      this.color = 'red';
      this.title = this.constants.TITLE_ERROR_ACTIVATE_USER;
      this.message1 = this.constants.MSG_ERROR_ID_NOT_FOUND;
      this.message2 = this.constants.MSG_ERROR_ID_NOT_FOUND2;
    }
    if (this.authLoginService.isLoggedIn()) {
      this.router.navigate([global.ROUTE_DASHBOARD]);
    }



  }

  activateUserId(userid: any) {
    this.authLoginService.activate(userid).subscribe (
      result => {
      },
      error => {
        if (error.error !== undefined && error.error.err !== undefined
          && error.error.err.usernotfound !== undefined && error.error.err.usernotfound ) {
            this.toastr.error(this.constants.MSG_ERROR_USER_NOT_FOUND);
            this.message1 = this.constants.MSG_ERROR_ACTIVATE;
            this.message2 = this.constants.MSG_ERROR_ACTIVATE_NOT_FOUND;
        }

        if (error.error !== undefined && error.error.err !== undefined
          && error.error.err.active !== undefined && error.error.err.active ) {
            this.toastr.error(this.constants.MSG_ERROR_USER_ACTIVE);
            this.message1 = this.constants.MSG_ERROR_ACTIVATE;
            this.message2 = this.constants.MSG_ERROR_ACTIVATE_USER_ACTIVE;
        }

        this.icon = this.constants.ICON_ERROR;
        this.color = 'red';
        this.title = this.constants.TITLE_ERROR_ACTIVATE_USER;

      },
        () => {
          this.message1 = this.constants.MSG_SUCCESS_ACTIVATE;
          this.message2 = this.constants.MSG_SUCCESS_ACTIVATE2;
          this.color = '';
          this.icon = this.constants.ICON_EMAIL;
          this.title = this.constants.TITLE_ACTIVATE_USER_SUCESS;
          this.toastr.info(this.constants.MSG_SUCCESSFULL_ACTIVATED);
      }
    );
  }

}
