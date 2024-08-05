import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AfterLoginService } from './services/after-login.service';
import { BeforeLoginService } from './services/before-login.service';
import { ListDesignationComponent } from './components/app-content/designation/list-designation/list-designation.component';
import { AddDesignationComponent } from './components/app-content/designation/add-designation/add-designation.component';
import { ListRepairerComponent } from './components/app-content/repairer/list-repairer/list-repairer.component';
import { AddRepairerComponent } from './components/app-content/repairer/add-repairer/add-repairer.component';
import { ListVehicleComponent } from './components/app-content/vehicle/list-vehicle/list-vehicle.component';
import { AddVehicleComponent } from './components/app-content/vehicle/add-vehicle/add-vehicle.component';
import { ListRepairComponent } from './components/app-content/repair/list-repair/list-repair.component';
import { AddRepairComponent } from './components/app-content/repair/add-repair/add-repair.component';
import { ListRepairWorkComponent } from './components/app-content/repair-work/list-repair-work/list-repair-work.component';
import { AddRepairWorkComponent } from './components/app-content/repair-work/add-repair-work/add-repair-work.component';
import { ListUserComponent } from './components/app-content/user/list-user/list-user.component';
import { AddUserComponent } from './components/app-content/user/add-user/add-user.component';
import { ListShockPointComponent } from './components/app-content/shock-point/list-shock-point/list-shock-point.component';
import { AddShockPointComponent } from './components/app-content/shock-point/add-shock-point/add-shock-point.component';
import { UserProfileComponent } from './components/app-content/user/user-profile/user-profile.component';
import { ListBrandComponent } from './components/app-content/brand/list-brand/list-brand.component';
import { ListVehicleModelComponent } from './components/app-content/vehicle-model/list-vehicle-model/list-vehicle-model.component';
import { ListColorComponent } from './components/app-content/color/list-color/list-color.component';
import { ListClientComponent } from './components/app-content/client/list-client/list-client.component';
import { AddClientComponent } from './components/app-content/client/add-client/add-client.component';
import { ListInsurerComponent } from './components/app-content/insurer/list-insurer/list-insurer.component';
import { PrensentationComponent } from './components/prensentation/prensentation.component';
import { QrcodeComponent } from './components/qrcode/qrcode.component';

const routes: Routes = [
  {
    path:'login',
    component: LoginComponent,
    canActivate: [BeforeLoginService]
  },
  {
    path:'',
    component: DashboardComponent,
    canActivate: [AfterLoginService]
  },
  // {
  //   path:'**',
  //   component: PageNotFoundComponent,
  //   canActivate: [AfterLoginService]
  // },
  // {
  //   path:'accueil',
  //   component: DashboardComponent,
  //   canActivate: [AfterLoginService]
  // },

  {
    path:'list-user',
    component: ListUserComponent,
    canActivate: [AfterLoginService]
  },
  {
    path:'add-user',
    component: AddUserComponent,
    canActivate: [AfterLoginService]
  },
  {
    path:'user-profile',
    component: UserProfileComponent,
    canActivate: [AfterLoginService]
  },

  {
    path:'list-designation',
    component: ListDesignationComponent,
    canActivate: [AfterLoginService]
  },
  {
    path:'add-designation',
    component: AddDesignationComponent,
    canActivate: [AfterLoginService]
  },

  {
    path:'list-shock-point',
    component: ListShockPointComponent,
    canActivate: [AfterLoginService]
  },
  {
    path:'add-shock-point',
    component: AddShockPointComponent,
    canActivate: [AfterLoginService]
  },

  {
    path:'list-repairer',
    component: ListRepairerComponent,
    canActivate: [AfterLoginService]
  },
  {
    path:'add-repairer',
    component: AddRepairerComponent,
    canActivate: [AfterLoginService]
  },

  {
    path:'list-client',
    component: ListClientComponent,
    canActivate: [AfterLoginService]
  },
  {
    path:'add-client',
    component: AddClientComponent,
    canActivate: [AfterLoginService]
  },

  {
    path:'list-insurer',
    component: ListInsurerComponent,
    canActivate: [AfterLoginService]
  },

  {
    path:'list-vehicle',
    component: ListVehicleComponent,
    canActivate: [AfterLoginService]
  },
  {
    path:'add-vehicle',
    component: AddVehicleComponent,
    canActivate: [AfterLoginService]
  },

  {
    path:'list-repair',
    component: ListRepairComponent,
    canActivate: [AfterLoginService]
  },
  {
    path:'add-repair',
    component: AddRepairComponent,
    canActivate: [AfterLoginService]
  },

  {
    path:'list-repair-work',
    component: ListRepairWorkComponent,
    canActivate: [AfterLoginService]
  },
  {
    path:'add-repair-work',
    component: AddRepairWorkComponent,
    canActivate: [AfterLoginService]
  },

  {
    path:'list-brand',
    component: ListBrandComponent,
    canActivate: [AfterLoginService]
  },

  {
    path:'list-vehicle-model',
    component: ListVehicleModelComponent,
    canActivate: [AfterLoginService]
  },

  {
    path:'list-color',
    component: ListColorComponent,
    canActivate: [AfterLoginService]
  },

  {
    path:'presentation',
    component: PrensentationComponent,
    canActivate: [AfterLoginService]
  },

  {
    path:'qr-code',
    component: QrcodeComponent,
    canActivate: [AfterLoginService]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
