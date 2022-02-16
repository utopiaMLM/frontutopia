import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { RecoverysuccessComponent } from './modules/lostpassword/recoverysuccess/recoverysuccess.component';
import { ActivateuserComponent } from './modules/signup/activateuser/activateuser.component';
import { AdminLayoutComponent } from './modules/dashboard/admin-layout/admin-layout.component';
import { ValidateSessionComponent } from './modules/validate-session/validate-session.component';
import { global } from 'src/app/constants/global';
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
  { path: global.ROUTE_CHECK_TRANSACTION, component: CheckTransactionsComponent },
  { path: global.ROUTE_PAYMENT + '/:amount/:userId/:buyerName/:buyerEmail/:packageId/:description', component: PaymentComponent },  
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
