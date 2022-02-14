import { Component, OnInit, Inject, OnDestroy} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {UtilsService} from 'src/app/utils/utils.service';
import { ToastrService } from 'ngx-toastr';
import { CommonsService } from 'src/app/services/commons/commons.service';
import { Subscription } from 'rxjs';
import { OnExecuteData, ReCaptchaV3Service } from 'ng-recaptcha';
import { DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [UtilsService, CommonsService]
})
export class ContactComponent implements OnInit, OnDestroy {
  public constants: any;
  private subscription: Subscription;
  public contactForm: FormGroup;

  constructor(
    private recaptchaV3Service: ReCaptchaV3Service,
    private readonly commonsService: CommonsService,
    private readonly utilsService: UtilsService,
    @Inject(DOCUMENT) private document: any,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.constants = this.commonsService.getConstants();
    this.contactForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(8)]),
      comment: new FormControl('', [Validators.required, Validators.maxLength(400), Validators.minLength(20)]),
    });
    this.subscription = this.recaptchaV3Service.onExecute
    .subscribe((data: OnExecuteData) => {
    });
    this.document.body.classList.add('recaptcha');
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.document.body.classList.remove('recaptcha');
  }

  onSend(data: any) {
    this.utilsService.loading();
    this.recaptchaV3Service.execute('importantAction')
    .subscribe((token) => {
      data.captcha_token = token;
      data.subject = this.constants.SUBJECT_SEND_COMMENTS;
      this.commonsService.sendComment(data).subscribe (
        result => {

        },
        error => {
          this.utilsService.closeLoading();
          if (error.error.err.errorcaptcha !== undefined) {
            this.toastr.error(this.constants.MSG_ERROR_CAPTCHA);
          } else {
            this.toastr.error(this.constants.MSG_ERROR_SEND_COMMENT);
          }

        },
          () => {
            this.utilsService.closeLoading();
            this.toastr.info(this.constants.MSG_SUCCESSFULL_SEND_COMMENT);
            this.clean();
        }
      );

    });
  }
  clean() {    
    this.contactForm.get('comment').setValue("");
    this.contactForm.get('name').setValue("");
    this.contactForm.get('email').setValue("");
  }

  msgValidateComment() {
    return  this.contactForm.get('comment').hasError('required') ? this.constants.LABEL_FIELD_REQUIRED :
    this.contactForm.get('comment').hasError('maxlength') ? this.constants.LABEL_MAX_LENGTH_400 :
    this.contactForm.get('comment').hasError('minlength') ? this.constants.LABEL_MIN_LENGTH_20 :
    '';
  }

  msgValidateName() {
    return  this.contactForm.get('name').hasError('required') ? this.constants.LABEL_FIELD_REQUIRED :
    this.contactForm.get('name').hasError('maxlength') ? this.constants.LABEL_MAX_LENGTH_50  :
    this.contactForm.get('name').hasError('minlength') ? this.constants.LABEL_MIN_LENGTH_8 :
    '';
  }

  msgValidateEmail() {
    return this.contactForm.get('email').hasError('pattern') ? this.constants.LABEL_INVALID_EMAIL :
    this.contactForm.get('email').hasError('required') ? this.constants.LABEL_FIELD_REQUIRED :
     '';
  }

}
