import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthLoginService } from 'src/app/services/auth/auth.service';
import { UtilsService } from 'src/app/utils/utils.service';
import { ToastrService } from 'ngx-toastr';
import {PasswordModel} from 'src/app/models/PasswordModel';
import { CommonsService} from 'src/app/services/commons/commons.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css'],
  providers: [UtilsService, AuthLoginService, CommonsService]
})
export class SecurityComponent implements OnInit {
  constants: any;
  tabInfo: any;
  utils: any;
  hide1 = true;
  hide2 = true;
  hide3 = true;
  public security: FormGroup;

  constructor(
    private readonly authLoginService: AuthLoginService,
    private readonly commonsService: CommonsService,
    private readonly utilsService: UtilsService,
    private toastr: ToastrService) { }

    ngOnInit(): void {
      this.constants = this.commonsService.getConstants();
      this.utils = this.utilsService;
      this.security = new FormGroup({
        oldpassword: new FormControl('', [Validators.required, Validators.maxLength(14), Validators.minLength(8)]),
        newpassword: new FormControl('', [Validators.required, Validators.maxLength(14), Validators.minLength(8)]),
        passwordRepeat: new FormControl('', [Validators.required, Validators.maxLength(14), Validators.minLength(8)]),
      });
    }

    onSave(data: PasswordModel) {
      if ( data.newpassword !== data.passwordRepeat ) {
        this.security.get('passwordRepeat').setErrors({nomatch: true});
        this.toastr.warning(this.constants.MSG_ERROR_PASSWORD_NOMATCH);
      } else {
        const newpassw = data.newpassword;
        const oldpassw = data.oldpassword;
        const token = localStorage.getItem('token');
        const dataPassword = {oldpassword: oldpassw, newpassword: newpassw, token };
        this.utilsService.loading();
        this.authLoginService.changepassword(dataPassword).subscribe (
          result => {
          },
          error => {
            this.utilsService.closeLoading();
            if (!this.authLoginService.verifySessionWS(error)) {
              if (error.error !== undefined && error.error.err !== undefined) {
                const errorPassword = error.error.err.nomatch;
                const samepassword = error.error.err.samepassword;

                if (errorPassword !== undefined) {
                  this.security.get('oldpassword').setErrors({error: true});
                  this.toastr.warning(this.constants.MSG_ERROR_PASSWORD_NOT_MATCH);
                } else if (samepassword !== undefined) {
                  this.security.get('newpassword').setErrors({error: true});
                  this.toastr.warning(this.constants.MSG_ERROR_PASSWORD_SAME_OLD);
                }
              }
            }
          },
            () => {
              this.utilsService.closeLoading();
              this.toastr.info(this.constants.MSG_SUCCESSFULL_PASSWORD_CHANGED);
          }
        );
      }
    }

    msgValidateOldPassword() {
      return  this.security.get('oldpassword').hasError('required') ? this.constants.LABEL_FIELD_REQUIRED :
      this.security.get('oldpassword').hasError('maxlength') ? this.constants.LABEL_MAX_LENGTH_14 :
      this.security.get('oldpassword').hasError('minlength') ? this.constants.LABEL_MIN_LENGTH_8 :
      '';
    }
    msgValidateNewPassword() {
      return  this.security.get('newpassword').hasError('required') ? this.constants.LABEL_FIELD_REQUIRED :
      this.security.get('newpassword').hasError('maxlength') ? this.constants.LABEL_MAX_LENGTH_14 :
      this.security.get('newpassword').hasError('minlength') ? this.constants.LABEL_MIN_LENGTH_8 :
      '';
    }

    msgValidatePasswordRepeat() {
      return  this.security.get('passwordRepeat').hasError('required') ? this.constants.LABEL_FIELD_REQUIRED :
      this.security.get('passwordRepeat').hasError('maxlength') ? this.constants.LABEL_MAX_LENGTH_14 :
      this.security.get('passwordRepeat').hasError('minlength') ? this.constants.LABEL_MIN_LENGTH_8 :
      this.security.get('passwordRepeat').hasError('nomatch') ? this.constants.LABEL_PASSWORD_NOTMACH :
      '';
    }

}
