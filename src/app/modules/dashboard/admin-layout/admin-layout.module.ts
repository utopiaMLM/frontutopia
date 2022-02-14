import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CompanyProfileComponent } from '../company-profile/company-profile.component';
import { HomeComponent } from '../home/home.component';
import { AdminLayoutRoutes } from './admin-layout-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from 'src/app/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
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
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSliderModule } from '@angular/material/slider';
import {MatSidenavModule } from '@angular/material/sidenav';
import {PaymentsComponent } from '../payments/payments.component';
import {WalletComponent } from '../wallet/wallet.component';
import { SecurityComponent } from '../security/security.component';
import { ValidateProfileComponent } from '../validate-profile/validate-profile.component';
import { QRCodeModule } from 'angular2-qrcode';
import { ConfigurationComponent } from '../configuration/configuration.component';
import { TransactionsComponent } from '../transactions/transactions.component';
import {TableModule} from 'primeng/table';

@NgModule({
  declarations: [
    HomeComponent,
    CompanyProfileComponent,
    PaymentsComponent,
    WalletComponent,
    SecurityComponent,
    ValidateProfileComponent,
    ConfigurationComponent,
    TransactionsComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    FormsModule,
    ToastrModule,
    ReactiveFormsModule,
    RouterModule.forChild(AdminLayoutRoutes),
    MatListModule,
    MatSidenavModule,
    MatTabsModule,
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
    MatSliderModule,
    MatSidenavModule,
    QRCodeModule
  ],
  exports: [
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
  }]
})
export class AdminLayoutModule { }
