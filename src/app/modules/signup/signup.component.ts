import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserModel} from 'src/app/models/UserModel';
import { UtilsService} from 'src/app/utils/utils.service';
import { AuthLoginService} from 'src/app/services/auth/auth.service';
import { SignupService} from 'src/app/services/signup/signup.service';
import { Router } from '@angular/router';
import { MatDialog} from '@angular/material/dialog';
import { PrivacypoliticsComponent} from './privacypolitics/privacypolitics.component';
import { TermsandconditionsComponent} from './termsandconditions/termsandconditions.component';
import { Subscription } from 'rxjs';
import { OnExecuteData, ReCaptchaV3Service } from 'ng-recaptcha';
import { DOCUMENT} from '@angular/common';
import { CommonsService} from 'src/app/services/commons/commons.service';
import { global } from 'src/app/constants/global';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [UtilsService, AuthLoginService, CommonsService]
})
export class SignupComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public constants: any;
  hide = true;
  hide1 = true;
  dialogRef: any;
  public global: any;
  isSigned = false;


  public signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(this.utilsService.emailPattern)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(14), Validators.minLength(8)]),
    passwordRepeat: new FormControl('', [Validators.required, Validators.maxLength(14), Validators.minLength(8)]),
    name: new FormControl('',  [Validators.required, Validators.maxLength(30), Validators.minLength(8)])
    });

  constructor(
    private readonly commonsService: CommonsService,
    public dialog: MatDialog,
    private recaptchaV3Service: ReCaptchaV3Service,
    private readonly utilsService: UtilsService,
    private readonly authLoginService: AuthLoginService,
    private readonly signupService: SignupService,
    @Inject(DOCUMENT) private document: any,
    public router: Router,
    private toastr: ToastrService) {
  }

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

  onSave(data: UserModel) {
    if ( data.password !== data.passwordRepeat ) {
      this.signUpForm.get('passwordRepeat').setErrors({nomatch: true});
      this.toastr.warning(this.constants.MSG_ERROR_PASSWORD_NOMATCH);
    } else {
      this.utilsService.loading();
      this.recaptchaV3Service.execute('importantAction')
      .subscribe((token) => {
        const lang = this.commonsService.getLang();        
        const user = {password: data.password, email: data.email, name: data.name,
          subject: this.constants.SUBJECT_SIGNUP_SUCCESSFULL, captcha_token: token, lang};
        this.signupService.signup(user).subscribe (
          result => {
          },
          error => {
            this.utilsService.closeLoading();
            if (error.error !== undefined && error.error.err !== undefined) {
              if (error.error.err.errors !== undefined &&
                error.error.err.errors.email !== undefined
                && error.error.err.errors.email.kind === 'unique') {
                this.signUpForm.get('email').setErrors({repeat: true});
                this.toastr.warning(this.constants.MSG_ERROR_REPEAT_EMAIL);
              }
              if (error.error.err.errorcaptcha !== undefined) {
                this.toastr.error(this.constants.MSG_ERROR_CAPTCHA);
              }
            }
          },
            () => {
              this.utilsService.closeLoading();
              this.toastr.info(this.constants.MSG_SUCCESSFULL_SIGNUP);
              this.signUpForm.reset();
              this.isSigned = true;
              //this.router.navigate([global.ROUTE_SIGNUPSUCCESS]);
        });
      });
    }
  }

  openTermsDialog(): void {
    const dialogRef = this.dialog.open(TermsandconditionsComponent, {
      panelClass: 'mat-modal-with-background'
    });
    dialogRef.afterClosed().subscribe();
  }

  openPoliticsDialog() {
    const dialogRef = this.dialog.open(PrivacypoliticsComponent, {
      panelClass: 'mat-modal-with-background'
    });
    dialogRef.afterClosed().subscribe();
  }

  close() {
    this.signUpForm.reset();
    this.router.navigate([global.ROUTE_HOME]);
  }

  msgValidatePassword() {
    return  this.signUpForm.get('password').hasError('required') ? this.constants.LABEL_FIELD_REQUIRED :
    this.signUpForm.get('password').hasError('maxlength') ? this.constants.LABEL_MAX_LENGTH_14 :
    this.signUpForm.get('password').hasError('minlength') ? this.constants.LABEL_MIN_LENGTH_8 :
    '';
  }

  msgValidatePasswordRepeat() {
    return  this.signUpForm.get('passwordRepeat').hasError('required') ? this.constants.LABEL_FIELD_REQUIRED :
    this.signUpForm.get('passwordRepeat').hasError('maxlength') ? this.constants.LABEL_MAX_LENGTH_14 :
    this.signUpForm.get('passwordRepeat').hasError('minlength') ? this.constants.LABEL_MIN_LENGTH_8 :
    this.signUpForm.get('passwordRepeat').hasError('nomatch') ? this.constants.LABEL_PASSWORD_NOTMACH :
    '';
  }

 
  msgValidateUsername() {
    return  this.signUpForm.get('username').hasError('required') ? this.constants.LABEL_FIELD_REQUIRED :
    this.signUpForm.get('username').hasError('maxlength') ? this.constants.LABEL_MAX_LENGTH_12 :
    this.signUpForm.get('username').hasError('minlength') ? this.constants.LABEL_MIN_LENGTH_6 :
    '';
  }

  msgValidateEmail() {
    return this.signUpForm.get('email').hasError('pattern') ? this.constants.LABEL_INVALID_EMAIL :
    this.signUpForm.get('email').hasError('required') ? this.constants.LABEL_FIELD_REQUIRED :
     '';
  }

  msgValidateName() {
    return this.signUpForm.get('name').hasError('maxlength') ? this.constants.LABEL_MAX_LENGTH_30 :
    this.signUpForm.get('name').hasError('minlength') ? this.constants.LABEL_MIN_LENGTH_8 :
    this.signUpForm.get('name').hasError('required') ? this.constants.LABEL_FIELD_REQUIRED :
     '';
  }
}
