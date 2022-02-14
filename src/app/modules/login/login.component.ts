import { Component, OnInit, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserModel} from 'src/app/models/UserModel';
import { UtilsService} from 'src/app/utils/utils.service';
import { Router } from '@angular/router';
import {AuthLoginService} from 'src/app/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { OnExecuteData, ReCaptchaV3Service } from 'ng-recaptcha';
import { DOCUMENT} from '@angular/common';
import { CommonsService} from 'src/app/services/commons/commons.service';
import { global } from 'src/app/constants/global';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UtilsService, AuthLoginService, CommonsService]
})

export class LoginComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public constants: any;
  public global: any;
  public isAuthenticated = false;
  public token: any;
  public resultToken: any;
  public expiresToken: number;
  public expiresCode: number;
  
  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(this.utilsService.emailPattern)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(14), Validators.minLength(8)])    
  });

  public codeForm = new FormGroup({
    code: new FormControl('', [Validators.required, Validators.maxLength(5), Validators.minLength(5)])
  });

  constructor(
    private readonly commonsService: CommonsService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private readonly utilsService: UtilsService,
    private readonly authLoginService: AuthLoginService,
    public router: Router,
    @Inject(DOCUMENT) private document: any,
    @Inject(PLATFORM_ID) private platformId: any,
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
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.document.body.classList.remove('recaptcha');
  }

  /**
   * Se autentica
   */
  onLogin(login: UserModel) {
    this.utilsService.loading();
    this.recaptchaV3Service.execute('importantAction')
    .subscribe((token) => {
        const lang = this.commonsService.getLang();     
        const data = {email: login.email, password: login.password, captcha_token: token, subject: this.constants.SUBJECT_ACCESS_CODE, lang};
        this.authLoginService.login(data).subscribe(
            result => {
              this.token = result.token;
              this.resultToken = result;
            },
            error => {
              this.utilsService.closeLoading();
              if (error.error !== undefined && error.error.err !== undefined) {
                if (error.error.err.inactive !== undefined) {
                  this.toastr.error(this.constants.MSG_ERROR_USER_INACTIVE);
                } else if (error.error.err.user_error !== undefined) {
                    this.toastr.error(this.constants.MSG_ERROR_AUTH);
                }else if (error.error.err.errorcaptcha !== undefined) {
                  this.toastr.error(this.constants.MSG_ERROR_CAPTCHA);
                } else if (error.error.err.usernotfound !== undefined) {
                  this.toastr.error(this.constants.MSG_ERROR_USER_INVALID);
                }
              }
            },
            () => {
                this.utilsService.closeLoading();
                this.isAuthenticated = true;
        });
      });
  }

onLoginCode(login: UserModel) {
    this.utilsService.loading();
    this.recaptchaV3Service.execute('importantAction')
    .subscribe((token) => {
        const data = {token: this.token , captcha_token: token, codeGenerated: login.code};
        this.authLoginService.getValidateCode(data).subscribe(
            result => {
            },
            error => {
              this.utilsService.closeLoading();
              if (error.error !== undefined && error.error.err !== undefined) {
                if (error.error.err.usercodenotfound !== undefined) {
                  this.toastr.error(this.constants.MSG_ERROR_USER_CODE);                  
                }else if (error.error.err.minutes_exceed !== undefined) {
                    this.toastr.error(this.constants.MSG_ERROR_MINUTES_EXCEED);
                    this.router.navigate([global.ROUTE_PANEL_HOME]);
                }else if (error.error.err.errorcaptcha !== undefined) {
                  this.toastr.error(this.constants.MSG_ERROR_CAPTCHA);
                }
              }
            },
            () => {
                this.utilsService.closeLoading();
                this.isAuthenticated = true;
                this.authLoginService.setSession(this.resultToken);
                this.toastr.info(this.constants.MSG_SUCCESSFULL_AUTH);                                
                this.router.navigate([global.ROUTE_PANEL_HOME]);
        });
      });
  }

  /**
   * error messages of password
   */
  msgValidatePassword() {
    return  this.loginForm.get('password').hasError('required') ? this.constants.LABEL_FIELD_REQUIRED :
    this.loginForm.get('password').hasError('maxlength') ? this.constants.LABEL_MAX_LENGTH_14 :
    this.loginForm.get('password').hasError('minlength') ? this.constants.LABEL_MIN_LENGTH_8 :
    '';
  }

  checkNumber(e: KeyboardEvent) {
    this.utilsService.checkNumber(e);
  }

  /**
   * Error messages of Email
   *
   */
  msgValidateEmail() {
    return this.loginForm.get('email').hasError('pattern') ? this.constants.LABEL_INVALID_EMAIL :
    this.loginForm.get('email').hasError('required') ? this.constants.LABEL_FIELD_REQUIRED :
     '';
  }

  /**
   * Error messages of code
   *
   */
  msgValidateCode(){
    return  this.codeForm.get('code').hasError('required') ? this.constants.LABEL_FIELD_REQUIRED :
    this.codeForm.get('code').hasError('maxlength') ? this.constants.LABEL_MAX_LENGTH_14 :
    '';
  }
}
