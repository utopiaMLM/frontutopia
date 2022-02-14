import { Component, OnInit, Inject, OnDestroy, Injectable, PLATFORM_ID } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {UserModel} from 'src/app/models/UserModel';
import {UtilsService} from 'src/app/utils/utils.service';
import {AuthLoginService} from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { OnExecuteData, ReCaptchaV3Service } from 'ng-recaptcha';
import { DOCUMENT} from '@angular/common';
import { CommonsService} from 'src/app/services/commons/commons.service';
import { global } from 'src/app/constants/global';

@Component({
  selector: 'app-lostpassword',
  templateUrl: './lostpassword.component.html',
  styleUrls: ['./lostpassword.component.css'],
  providers: [UtilsService, AuthLoginService, CommonsService]
})
export class LostpasswordComponent implements OnInit, OnDestroy {
  public constants: any;
  public global: any;
  private subscription: Subscription;

  public passwordLostForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(this.utilsService.emailPattern)]),
  });

  constructor(
    private readonly commonsService: CommonsService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private readonly utilsService: UtilsService,
    private readonly authLoginService: AuthLoginService,
    @Inject(DOCUMENT) private document: any,
    @Inject(PLATFORM_ID) private platformId: any,
    public router: Router,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.global = global;
    this.constants = this.commonsService.getConstants();
    if (this.authLoginService.isLoggedIn()) {
      this.router.navigate([global.ROUTE_DASHBOARD]);
    } else {
      this.subscription = this.recaptchaV3Service.onExecute
      .subscribe((data: OnExecuteData) => {
      });
      this.document.body.classList.add('recaptcha');
      this.constants = this.commonsService.getConstants();
    }
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.document.body.classList.remove('recaptcha');
  }
  /**
   * Recupera el password
   */
  onSubmit(login: UserModel) {
    this.utilsService.loading();
    this.recaptchaV3Service.execute('importantAction')
    .subscribe((token) => {
      const lang = this.commonsService.getLang();
      const data = {captcha_token : token, email: login.email, subject: this.constants.SUBJECT_LOST_EMAIL, lang};

      this.authLoginService.lostPassword(data).subscribe (
        result => {

        },
        error => {
          this.utilsService.closeLoading();
          if (error.error !== undefined && error.error.err !== undefined) {
            if (error.error.err.usernotfound !== undefined && error.error.err.usernotfound ) {
              this.toastr.error(this.constants.MSG_ERROR_EMAIL_NOT_FOUND);
            }
            if (error.error.err.inactive !== undefined  && error.error.err.inactive ) {
              this.toastr.error(this.constants.MSG_ERROR_USER_INACTIVE);
            }
            if (error.error.err.provider !== undefined  && error.error.err.provider ) {
              this.toastr.error(this.constants.MSG_ERROR_USER_SOCIAL_NETWORK);
            }
            if (error.error.err.erroremail !== undefined  && error.error.err.erroremail ) {
              this.toastr.error(this.constants.MSG_ERROR_SEND_EMAIL);
            }
            if (error.error.err.errorcaptcha !== undefined) {
              this.toastr.error(this.constants.MSG_ERROR_CAPTCHA);
            }
          }
        },
          () => {
            this.utilsService.closeLoading();
            this.passwordLostForm.reset();
            this.toastr.info(this.constants.MSG_SUCCESSFULL_SEND_PASSWORD);
            this.router.navigate([global.ROUTE_RECOVERYSUCCESS]);
        });
      });
  }

  close() {
    this.passwordLostForm.reset();
    this.router.navigate([global.ROUTE_LOGIN]);
  }

  /**
   * Error messages of Email
   *
   */
  msgValidateEmail() {
    return this.passwordLostForm.get('email').hasError('pattern') ? this.constants.LABEL_INVALID_EMAIL :
    this.passwordLostForm.get('email').hasError('required') ? this.constants.LABEL_FIELD_REQUIRED :
     '';
  }
}
