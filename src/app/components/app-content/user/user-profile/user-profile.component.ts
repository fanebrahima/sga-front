import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JarwisService } from 'src/app/services/jarwis.service';
import { GlobalConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/services/common.service';
import { NgxSpinnerService } from "ngx-spinner";
import {Location} from '@angular/common';
import { environment } from 'src/environments/environment';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/services/auth.service';
import { AccessService } from 'src/app/services/access.service';
import { HttpErrorResponse } from '@angular/common/http';
import jwt_decode from "jwt-decode";
import { HeadersService } from 'src/app/services/headers.servive';
import { UserService } from 'src/app/services/app-content/user.service';
import { ProfileService } from 'src/app/services/app-content/profile.service';


const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  listItem: any;
  listCertificateType: any;
  listCompany: any;
  listProduct: any;
  listEntities: any;
  listEntityFirmUsers: any;
  lastOrder: any;
  lastRelationship: any;

  itemSelected: any;

  listVehicule: any;
  storeExportedData: any = [];
  getSheetHeaders: any = [];

  toast!: toastPayload;
  message:any;
  error_message: any;
  exist_error:boolean = false;
  success_message: any;
  exist_success:boolean = false;

  p: number = 1;

  first_name: string = "";
  last_name: string = "";
  profil_id!:number;
  phone: string = "";
  email: string = "";

  formGroup!: FormGroup;
  submitted = false;
  formGroup1!: FormGroup;
  submitted1 = false;

  resetPassword = false;

  user_logged!: any;

  token!: any;

  submit: boolean = false;

  current_password!: string;
  password!: string;
  password_confirmation!: string;

  showCurrentPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;

  uploadLink = environment.upload_url;

  selectedImage: any;
  logofiles: any;
  logoSrc!: string;

  signaturefiles: any;
  signatureSrc!: string;
  signature: string ="";

  constructor(
    public Jarwis: JarwisService,
    public userService: UserService,
    public profileService: ProfileService,
    private herdersService: HeadersService,
    private route:ActivatedRoute,
    private Auth: AuthService,
    private router:Router,
    private Token: TokenService,
    private _formBuilder: FormBuilder,
    private cs: CommonService,
    private _location: Location,
    private SpinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {

    this.formGroup = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      current_password: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      password_confirmation: new FormControl('', [Validators.required]),
    });

    /** spinner starts on init */
    //this.SpinnerService.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.SpinnerService.hide();
    }, 1000);

    if (!localStorage.getItem('reload')) {
      localStorage.setItem('reload', 'no reload')
      location.reload()
    } else {
      localStorage.removeItem('reload')
    }

    this.getUserLogged();

  }

  logout() {
    this.Token.remove();
    this.Auth.changeAuthStatus(false);
    this.toast = {
      message: "Votre session a expiré !",
      title: 'Erreur',
      type: 'error',
      ic: {
        timeOut: 5000,
        closeButton: true,
        progressBar: true,
      } as GlobalConfig,
    };
    this.cs.showToast(this.toast);
    this.router.navigate(['/login']);
  }

  getUserLogged(){
    this.userService.getUserProfile().subscribe((data: any) => {

      if(data.success == false){

        this.logout();

      } else {

        this.SpinnerService.hide();

        this.user_logged = data.user_logged;
        this.first_name = data.user_logged.first_name;
        this.last_name = data.user_logged.last_name;
        this.phone = data.user_logged.phone;

      }
      },
      (err: HttpErrorResponse) => {
        console.log("API indisponible");
        this.logout();

      });
  }

  resetAll() {
    this.current_password = "";
    this.password = "";
    this.password_confirmation = "";
  }

  backClicked() {
    this._location.back();
  }

  onChange(event:any) {
    this.SpinnerService.show();
  }

  onSelectSignature(event:any) {
    this.signaturefiles = event.target.files[0];
    const reader = new FileReader();
    reader.onload = event => this.signatureSrc = reader.result as string;

    reader.readAsDataURL(this.signaturefiles);
    //console.log(this.signaturefiles);
  }

  checkCurrentPassword() {
    this.showCurrentPassword = !this.showCurrentPassword;
  }

  checkNewPassword() {
    this.showNewPassword = !this.showNewPassword;
  }

  checkConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  checkPasswordValidity(value:string){
    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(value)) {
      return "Le mot de passe ne doit pas contenir d'espaces.";
    }

    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    if (!isContainsUppercase.test(value)) {
      return "Le mot de passe doit contenir au moins un caractère majuscule !";
    }

    const isContainsLowercase = /^(?=.*[a-z]).*$/;
    if (!isContainsLowercase.test(value)) {
      return "Le mot de passe doit contenir au moins un caractère minuscule!";
    }

    const isContainsNumber = /^(?=.*[0-9]).*$/;
    if (!isContainsNumber.test(value)) {
      return "Le mot de passe doit contenir au moins un caractère minuscule !";
    }

    const isContainsSymbol =
      /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
    if (!isContainsSymbol.test(value)) {
      return "Le mot de passe doit contenir au moins un symbole spécial(!,@,#,$,%,^,&,*,(,),...) !";
    }

    const isValidLength = /^.{12,999999}$/;
    if (!isValidLength.test(value)) {
      return "Le mot de passe doit comporter au moins 12 caractères !";
    }

    return null;
  }

  get f() { return this.formGroup.controls; }

  onSubmit() {
    this.submitted = true;
    if(this.formGroup.invalid){
      return;
    } else {
      this.submit = true;

      const formData:any = new FormData();

      formData.append("id",this.user_logged.id);
      formData.append("email",this.user_logged.email);
      formData.append("phone",this.phone);
      formData.append("first_name",this.first_name);
      formData.append("last_name",this.last_name);
      if(this.signaturefiles){
        formData.append("signature",this.signaturefiles,this.signaturefiles.name);
      }
      formData.append("current_password",this.current_password);
      formData.append("password",this.password);
      formData.append("password_confirmation",this.password_confirmation);

      this.userService.resetUserPassword(formData).subscribe(res => {
        this.message = res;
        if(this.message.success == false){
          this.exist_error = true;
          this.error_message = this.message.message;
          this.toast = {
            message: this.message.message,
            title: 'Erreur',
            type: 'error',
            ic: {
              timeOut: 5000,
              closeButton: true,
              progressBar: true,
            } as GlobalConfig,
          };
        } else {
          this.toast = {
            message: this.message.message,
            title: 'Succès',
            type: 'success',
            ic: {
              timeOut: 2500,
              closeButton: true,
              progressBar: true,
            } as GlobalConfig,
          };
          this.submit = !this.submit;
          this.resetPassword = !this.resetPassword;
          this.resetAll();
          // this.ngOnInit();
          this.cs.showToast(this.toast);
        }
      },
      (err: HttpErrorResponse) => {
        this.exist_error = true;
        this.error_message = err.error.message;
        this.toast = {
          message: err.error.message,
          title: 'Erreur',
          type: 'error',
          ic: {
            timeOut: 5000,
            closeButton: true,
            progressBar: true,
          } as GlobalConfig,
        };
        this.submit = !this.submit;
        this.cs.showToast(this.toast);
      });
    }

  }

}
