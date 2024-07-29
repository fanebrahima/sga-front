import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA,APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import localeEn from '@angular/common/locales/en';
import { NgApexchartsModule } from "ng-apexcharts";
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { NgxCaptchaModule } from 'ngx-captcha';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxEditorModule } from 'ngx-editor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import { HttpClientModule } from '@angular/common/http';
import { JarwisService } from './services/jarwis.service';
import { TokenService } from './services/token.service';
import { AuthService } from './services/auth.service';
import { AfterLoginService } from './services/after-login.service';
import { BeforeLoginService } from './services/before-login.service';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ListRepairerComponent } from './components/app-content/repairer/list-repairer/list-repairer.component';
import { AddRepairerComponent } from './components/app-content/repairer/add-repairer/add-repairer.component';
import { AddRepairComponent } from './components/app-content/repair/add-repair/add-repair.component';
import { ListRepairComponent } from './components/app-content/repair/list-repair/list-repair.component';
import { ListVehicleComponent } from './components/app-content/vehicle/list-vehicle/list-vehicle.component';
import { AddVehicleComponent } from './components/app-content/vehicle/add-vehicle/add-vehicle.component';
import { ListRepairWorkComponent } from './components/app-content/repair-work/list-repair-work/list-repair-work.component';
import { AddRepairWorkComponent } from './components/app-content/repair-work/add-repair-work/add-repair-work.component';
import { ListDesignationComponent } from './components/app-content/designation/list-designation/list-designation.component';
import { AddDesignationComponent } from './components/app-content/designation/add-designation/add-designation.component';
import { AddUserComponent } from './components/app-content/user/add-user/add-user.component';
import { ListUserComponent } from './components/app-content/user/list-user/list-user.component';
import { AddShockPointComponent } from './components/app-content/shock-point/add-shock-point/add-shock-point.component';
import { ListShockPointComponent } from './components/app-content/shock-point/list-shock-point/list-shock-point.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { UserProfileComponent } from './components/app-content/user/user-profile/user-profile.component';
import { ListBrandComponent } from './components/app-content/brand/list-brand/list-brand.component';
import { ListVehicleModelComponent } from './components/app-content/vehicle-model/list-vehicle-model/list-vehicle-model.component';
import { ListColorComponent } from './components/app-content/color/list-color/list-color.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { AddClientComponent } from './components/app-content/client/add-client/add-client.component';
import { ListClientComponent } from './components/app-content/client/list-client/list-client.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    PreloaderComponent,
    SidebarComponent,
    FooterComponent,
    ListRepairerComponent,
    AddRepairerComponent,
    AddRepairComponent,
    ListRepairComponent,
    ListVehicleComponent,
    AddVehicleComponent,
    ListRepairWorkComponent,
    AddRepairWorkComponent,
    ListDesignationComponent,
    AddDesignationComponent,
    AddUserComponent,
    ListUserComponent,
    AddShockPointComponent,
    ListShockPointComponent,
    ForgotPasswordComponent,
    UserProfileComponent,
    ListBrandComponent,
    ListVehicleModelComponent,
    ListColorComponent,
    AddClientComponent,
    ListClientComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgApexchartsModule,
    NgxCaptchaModule,
    NgxEditorModule,
    NgxExtendedPdfViewerModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  providers: [
    JarwisService,
    TokenService,
    AuthService,
    AfterLoginService,
    BeforeLoginService,
    {provide: ToastrService, useClass: ToastrService},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
