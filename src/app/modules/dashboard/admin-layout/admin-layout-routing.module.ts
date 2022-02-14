import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ValidateProfileComponent } from '../validate-profile/validate-profile.component';
import { global } from 'src/app/constants/global';


export const AdminLayoutRoutes: Routes = [
  {path:  '', component: ValidateProfileComponent },
  { path: global.ROUTE_DASHBOARD_HOME, component: ValidateProfileComponent },
  { path: global.ROUTE_COMPANY_PROFILE, component: ValidateProfileComponent },
  { path: global.ROUTE_CONFIGURATION, component: ValidateProfileComponent },
  { path: global.ROUTE_WALLET, component: ValidateProfileComponent },
  { path: global.ROUTE_TRANSACTIONS, component: ValidateProfileComponent },
  { path: global.ROUTE_PAYMENTS, component: ValidateProfileComponent },
  { path: global.ROUTE_SECURITY, component: ValidateProfileComponent },
];
