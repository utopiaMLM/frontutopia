import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { RecoverysuccessComponent } from './modules/lostpassword/recoverysuccess/recoverysuccess.component';
import { ActivateuserComponent } from './modules/signup/activateuser/activateuser.component';
import { AdminLayoutComponent } from './modules/dashboard/admin-layout/admin-layout.component';
import { ValidateSessionComponent } from './modules/validate-session/validate-session.component';
import { HowitworkComponent } from './modules/howitwork/howitwork.component';
import { ContactComponent } from './modules/contact/contact.component';
import { TermsComponent } from './modules/terms/terms.component';
import { PrivacyComponent } from './modules/privacy/privacy.component';
import { global } from 'src/app/constants/global';
import { GatewayComponent } from '../app/modules/gateway/gateway.component';
import {CheckTransactionsComponent} from '../app/modules/check-transactions/check-transactions.component';
import { PaymentComponent } from './modules/payment/payment.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  { path: global.ROUTE_HOME, component: HomeComponent},
  { path: global.ROUTE_LOGIN, component: ValidateSessionComponent },
  { path: global.ROUTE_PASSWORDRECOVERY, component: ValidateSessionComponent },
  { path: global.ROUTE_SIGNUP, component: ValidateSessionComponent },  
  { path: global.ROUTE_RECOVERYSUCCESS, component: RecoverysuccessComponent },
  { path: global.ROUTE_ACTIVATE_USER_SUCCESS, component: ActivateuserComponent },
  { path: global.ROUTE_HOW_IT_WORK, component: HowitworkComponent },
  { path: global.ROUTE_CONTACT, component: ContactComponent },
  { path: global.ROUTE_TERMS, component: TermsComponent },
  { path: global.ROUTE_PRIVACY, component: PrivacyComponent },
  { path: global.ROUTE_GATEWAY, component: GatewayComponent },  
  { path: global.ROUTE_CHECK_TRANSACTION, component: CheckTransactionsComponent },
  { path: global.ROUTE_GATEWAY , component: GatewayComponent },  
  { path: global.ROUTE_GATEWAY + '/:profileId', component: GatewayComponent },  
  { path: global.ROUTE_GATEWAY + '/:profileId/:amount', component: GatewayComponent },  
  { path: global.ROUTE_GATEWAY + '/:profileId/:amount/:purchaseId', component: GatewayComponent },  
  { path: global.ROUTE_GATEWAY + '/:profileId/:amount/:purchaseId/:buyerName', component: GatewayComponent },  
  { path: global.ROUTE_GATEWAY + '/:profileId/:amount/:purchaseId/:buyerName/:buyerEmail', component: GatewayComponent },  
  { path: global.ROUTE_GATEWAY + '/:profileId/:amount/:purchaseId/:buyerName/:buyerEmail/:description', component: GatewayComponent },  

  { path: global.ROUTE_PAYMENT , component: PaymentComponent },  
  { path: global.ROUTE_PAYMENT + '/:amount', component: PaymentComponent },  
  { path: global.ROUTE_PAYMENT + '/:amount/:purchaseId', component: PaymentComponent },  
  { path: global.ROUTE_PAYMENT + '/:amount/:purchaseId/:buyerName', component: PaymentComponent },  
  { path: global.ROUTE_PAYMENT + '/:amount/:purchaseId/:buyerName/:buyerEmail', component: PaymentComponent },  
  { path: global.ROUTE_PAYMENT + '/:amount/:purchaseId/:buyerName/:buyerEmail/:description', component: PaymentComponent },  

  {
    path : global.ROUTE_DASHBOARD,
    component: AdminLayoutComponent,
    loadChildren : () => import('./modules/dashboard/admin-layout/admin-layout.module')
    .then(m => m.AdminLayoutModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
