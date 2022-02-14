import {BrowserModule } from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {AppRoutingModule } from './app-routing.module';
import {AppComponent } from './app.component';
import {LoginComponent } from './modules/login/login.component';
import {HomeComponent } from './modules/home/home.component';
import {AuthInterceptor } from 'src/app/auth.interceptor';
import {HttpClientModule } from '@angular/common/http';
import {HTTP_INTERCEPTORS } from '@angular/common/http';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule} from '@angular/material/core';
import {ToastrModule} from 'ngx-toastr';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSliderModule } from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import {SignupComponent } from './modules/signup/signup.component';
import {LoadingComponent } from './modules/loading/loading.component';
import {PrivacypoliticsComponent } from './modules/signup/privacypolitics/privacypolitics.component';
import {TermsandconditionsComponent } from './modules/signup/termsandconditions/termsandconditions.component';
import {LostpasswordComponent } from './modules/lostpassword/lostpassword.component';
import {RecoverysuccessComponent } from './modules/lostpassword/recoverysuccess/recoverysuccess.component';
import {ActivateuserComponent } from './modules/signup/activateuser/activateuser.component';
import {FooterComponent } from './footer/footer.component';
import {HeaderComponent } from './header/header.component';
import {AdminLayoutComponent } from './modules/dashboard/admin-layout/admin-layout.component';
import {MatListModule } from '@angular/material/list';
import {MatSidenavModule } from '@angular/material/sidenav';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import { ValidateSessionComponent } from './modules/validate-session/validate-session.component';
import { HowitworkComponent } from './modules/howitwork/howitwork.component';
import { ContactComponent } from './modules/contact/contact.component';
import { TermsComponent } from './modules/terms/terms.component';
import { PrivacyComponent } from './modules/privacy/privacy.component';
import {MatTabsModule} from '@angular/material/tabs';
import { NgGistModule } from 'ng-gist';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module, RecaptchaFormsModule } from 'ng-recaptcha';
import { DialogQuestionComponent } from './modules/dialog-question/dialog-question.component';
import { QRCodeModule } from 'angular2-qrcode';
import { GatewayComponent } from '../app/modules/gateway/gateway.component';
import { CheckTransactionsComponent } from './modules/check-transactions/check-transactions.component';
import {TableModule} from 'primeng/table';
import { ModalCryptosComponent } from './modules/modal-cryptos/modal-cryptos.component';
import { ModalDetailPaymentComponent } from './modules/modal-detail-payment/modal-detail-payment.component';
import { PaymentComponent } from './modules/payment/payment.component';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    PrivacypoliticsComponent,
    TermsandconditionsComponent,
    LostpasswordComponent,
    RecoverysuccessComponent,
    ActivateuserComponent,
    FooterComponent,
    HeaderComponent,
    AdminLayoutComponent,
    LoadingComponent,
    ValidateSessionComponent,
    HowitworkComponent,
    ContactComponent,
    TermsComponent,
    PrivacyComponent,
    DialogQuestionComponent,
    GatewayComponent,
	  CheckTransactionsComponent,
	  ModalCryptosComponent,
	  ModalDetailPaymentComponent,
	  PaymentComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TableModule,
    FormsModule,
    MatTabsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      maxOpened: 1,
      preventDuplicates: true,
      autoDismiss: true,
      progressBar: true
    }),
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatSidenavModule,
    MatSliderModule,
    NgGistModule,
    RecaptchaV3Module,
    RecaptchaFormsModule,
    QRCodeModule,
    MatTooltipModule
  ],
  providers: [
    MatDatepickerModule,    
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: '6LdOMP4UAAAAAF_acFmoA8opb9imZfLjhk4Z4eVW' },    
    {
      provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
    },
    {provide: MAT_DATE_LOCALE, useValue: 'en-in'}],

  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }