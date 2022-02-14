import { Router} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonsService} from 'src/app/services/commons/commons.service';
import { AuthLoginService} from 'src/app/services/auth/auth.service';
import { UtilsService} from 'src/app/utils/utils.service';
import { ProfilesService} from 'src/app/services/profiles/profiles.service';
import { ToastrService } from 'ngx-toastr';
import { SponsoringCompanyModel} from 'src/app/models/SponsoringCompanyModel';


@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css'],
  providers: [UtilsService, CommonsService, AuthLoginService, ProfilesService]
})
export class CompanyProfileComponent implements OnInit {
  dataProfile: SponsoringCompanyModel;
  constants: any;
  resultCountries: any;
  resultCities: any;
  tabInfo: any;
  utils: any;
  resultadoProfile: any;
  selectedCountry = '';
  selectedCity = '';
  file: any;
  imageUrl: any;
  public companyProfile: FormGroup;
  socialProfile = false;

  constructor(
    public router: Router,
    private readonly commonsService: CommonsService,
    private readonly authLoginService: AuthLoginService,
    private readonly profilesService: ProfilesService,
    private readonly utilsService: UtilsService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.constants = this.commonsService.getConstants();
    this.utils = this.utilsService;
    this.resultCities = [];
    this.resultCountries = [];
    this.getCompanyData();

    this.companyProfile = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(4)]),
      rifRuc: new FormControl('', [Validators.maxLength(20), Validators.minLength(8)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phonehome: new FormControl('', [Validators.maxLength(16), Validators.minLength(10)]),
      phonecel: new FormControl('', [Validators.maxLength(16), Validators.minLength(10)]),
      web: new FormControl('', Validators.pattern(this.utils.web)),
      profileID:  new FormControl('', null),
    });
  }

  fillForm() {
    this.companyProfile.get('email').setValue(this.dataProfile.email);

    this.companyProfile.get('profileID').setValue(this.dataProfile.profileId);

    if (this.dataProfile.rifRuc !== undefined) {
      this.companyProfile.get('rifRuc').setValue(this.dataProfile.rifRuc);
    }
    if (this.dataProfile.name !== undefined) {
      this.companyProfile.get('name').setValue(this.dataProfile.name);
    }
    if (this.dataProfile.web !== undefined) {
      this.companyProfile.get('web').setValue(this.dataProfile.web);
    }
    if (this.dataProfile.phonecel !== undefined) {
      this.companyProfile.get('phonecel').setValue(this.dataProfile.phonecel);
    }
    if (this.dataProfile.phonehome !== undefined) {
      this.companyProfile.get('phonehome').setValue(this.dataProfile.phonehome);
    }
    if (this.dataProfile.logo !== undefined && this.dataProfile.logo !== null
      && this.dataProfile.logo !== '' ) {
      this.imageUrl = this.dataProfile.logo;
    }
  }

  saveProfile(data: SponsoringCompanyModel) {
    this.utilsService.loading();
    this.profilesService.saveProfile(data).subscribe (
      result => {
      },
      error => {
        this.utilsService.closeLoading();
        if (!this.authLoginService.verifySessionWS(error)) {
          this.toastr.error(this.constants.MSG_ERROR_SAVE_PROFILE);
        }
      },
        () => {
          this.utilsService.closeLoading();
          this.toastr.info(this.constants.MSG_SUCCESSFULL_SAVE_PROFILE);
      }
    );
  }
  getCompanyData() {
    this.utilsService.loading();
    this.profilesService.getProfile().subscribe (
      result => {
        this.dataProfile = result;        
        this.fillForm();
      },
      error => {
        this.utilsService.closeLoading();
        if (!this.authLoginService.verifySessionWS(error)) {
          this.toastr.error(this.constants.MSG_ERROR_DATA_PROFILE);
        }
      },
        () => {
          this.utilsService.closeLoading();
      }
    );
  }

  checkNumber(event: any) {
    return this.utilsService.checkNumber(event);
  }  

  uploadFile(event) {
    const reader = new FileReader();
    this.file = event.target.files[0];
    if (this.file !== undefined && this.file.size > 150000) {
      this.toastr.error(this.constants.MSG_ERROR_IMAGEN_SIZE);
    } else {
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.saveImageProfile(reader.result);
      };
    }
  }

  saveImageProfile(image: any) {
    this.utilsService.loading();
    this.profilesService.saveImageProfile(image).subscribe (
      result => {
        this.imageUrl = image;
      },
      error => {
        this.utilsService.closeLoading();
        this.toastr.error(this.constants.MSG_ERROR_SAVE_IMAGE_PROFILE);
      },
        () => {
          this.utilsService.closeLoading();
          this.toastr.info(this.constants.MSG_SUCCESS_SAVE_LOGO);
      }
    );
  }

  msgValidateName() {
    return  this.companyProfile.get('name').hasError('required') ? this.constants.LABEL_FIELD_REQUIRED :
    this.companyProfile.get('name').hasError('maxlength') ? this.constants.LABEL_MAX_LENGTH_50 :
    this.companyProfile.get('name').hasError('minlength') ? this.constants.LABEL_MIN_LENGTH_4 :
    '';
  }

  msgValidatePhoneHome() {
    return this.companyProfile.get('phonehome').hasError('maxlength') ? this.constants.LABEL_MAX_LENGTH_16 :
    this.companyProfile.get('phonehome').hasError('minlength') ? this.constants.LABEL_MIN_LENGTH_10 :
    '';
  }

  msgValidateCelPhone() {
    return  this.companyProfile.get('phonecel').hasError('maxlength') ? this.constants.LABEL_MAX_LENGTH_16 :
    this.companyProfile.get('phonecel').hasError('minlength') ? this.constants.LABEL_MIN_LENGTH_10 :
    '';
  }

  msgValidateRifRuc() {
    return this.companyProfile.get('rifRuc').hasError('maxlength') ? this.constants.LABEL_MAX_LENGTH_20 :
    this.companyProfile.get('rifRuc').hasError('minlength') ? this.constants.LABEL_MIN_LENGTH_8 :
    '';
  }
  msgValidateWeb() {
    return  this.companyProfile.get('web').hasError('pattern') ? this.constants.LABEL_INVALID_WEB : '';
  }

}
