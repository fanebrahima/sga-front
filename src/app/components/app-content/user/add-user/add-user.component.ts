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
import { RepairerService } from 'src/app/services/app-content/repairer.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  listItem: any;
  listProfiles: any;
  listRepairer: any;

  itemSelected: any;

  selectedImage: any;
  logofiles: any;
  logoSrc!: string;

  signaturefiles: any;
  signatureSrc!: string;

  toast!: toastPayload;
  message:any;
  error_message: any;
  exist_error:boolean = false;
  phone_error: any;
  success_message: any;
  exist_success:boolean = false;

  formGroup!: FormGroup;
  formGroupByRepaier!: FormGroup;
  submitted = false;
  submittedByRepaier = false;

  first_name: string = "";
  last_name: string = "";
  profil_id!:number;
  repairer_id!:number;
  password: string = "";
  phone: string = "";
  email: string = "";
  address: string = "";
  status_id!: number;
  partner_id!: number;
  signature: string ="";

  user_logged!: any;
  npage!: number;
  token!: any;
  decode_token!: any;
  user_logged_id!: any;

  information!: string;
  start: number = 0;

  submit: boolean = false;
  submitByRepaier: boolean = false;

  addItem: boolean = false;
  editItem: boolean = false;
  itemDetail: boolean = false;
  resetItem: boolean = false;
  ableItem: boolean = false;
  disableItem: boolean = false;

  activeDropdown!: any;
  open: boolean = false;
  addUserDropdown: boolean = false;
  toggle!: any;

  current_page: number=1;
  first_page_url!: string;
  from!: number;
  last_page!: number;
  last_page_url!: string;
  links!: any;
  next_page_url!: string;
  per_page!: number;
  prev_page_url!: string;
  to!: number;
  total!: number;

  permissions!: any;
  permitted: boolean = false;

  constructor(
    public Jarwis: JarwisService,
    public userService: UserService,
    public profileService: ProfileService,
    public repairerService: RepairerService,
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

    registerLocaleData( fr,'fr-FR' );
    //this.submit = false;

    /** spinner starts on init */
    this.SpinnerService.show();


    this.getUserLogged();
    this.makePassword(12);
    this.getProfiles();
    this.getRepairers();

    this.formGroup = new FormGroup({
      profil_id: new FormControl('', [Validators.required]),
      first_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    });

    this.formGroupByRepaier = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    });

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

  resetAll() {
    this.formGroup.reset();
  }

  hide_message() {
    this.exist_error = false;
    this.exist_success = false;
  }

  getUserLogged(){
    this.userService.getUserProfile().subscribe((data: any) => {
      this.user_logged = data.user_logged;

      if(this.user_logged.profil_id == 3){
        this.profil_id = 3;
        this.repairer_id = this.user_logged.repairer_id;
      }

    },
    (err: HttpErrorResponse) => {
        //console.log("API indisponible");
        this.logout();
    });
  }

  notPermission() {
    this.toast = {
      message: "Action non autorisée !",
      title: 'Attention',
      type: 'warning',
      ic: {
        timeOut: 5000,
        closeButton: true,
        progressBar: true,
      } as GlobalConfig,
    };
    this.cs.showToast(this.toast);
    this._location.back();
  }

  getProfiles(){
    this.profileService.getProfiles().subscribe((data: any) => {
      this.listProfiles = data.profils;
    })
  }

  backClicked() {
    this._location.back();
  }

  changeProfil(event: any) {
    this.profil_id = event;
    this.repairer_id = 1;
  }

  getRepairers(){
    this.repairerService.getAllRepairers().subscribe((data: any) => {
      this.listRepairer = data.repairers;
    })
  }
  onSelectSignature(event:any) {
    this.signaturefiles = event.target.files[0];
    const reader = new FileReader();
    reader.onload = event => this.signatureSrc = reader.result as string;

    reader.readAsDataURL(this.signaturefiles);
    // console.log(this.signaturefiles);
  }


  makePassword(length:number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&^&*()-+={}[]:;<>?';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    this.password = result;
  }

  get f() { return this.formGroup.controls; }

  save(){
    this.submitted = true;
    if(this.formGroup.invalid){
      return;
    } else {
      this.submit = true;
      const formData:any = new FormData();
      formData.append("email",this.email);
      formData.append("phone",this.phone);
      formData.append("first_name",this.first_name);
      formData.append("last_name",this.last_name);
      formData.append("profil_id",this.profil_id);
      formData.append("repairer_id",this.repairer_id);
      if(this.signaturefiles){
        formData.append("signature",this.signaturefiles,this.signaturefiles.name);
      }

      if(this.profil_id == 1 || this.profil_id == 2){
        this.userService.add(formData).subscribe(res => {
          this.message = res;
          if(this.message.success == false){
            this.submit = false;
            this.error_message = this.message.message;
            this.exist_error = false;
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
            this.SpinnerService.hide();
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
            this.submit = false;
            this.addItem = !this.addItem;
            this.itemSelected = !this.itemSelected;
            this._location.back();
          }
          this.cs.showToast(this.toast);
        },
        (err: HttpErrorResponse) => {
          this.exist_error = true;
          this.error_message = err.error.message;
          this.submit = false;
          this.toast = {
            message: err.error.error,
            title: 'Erreur',
            type: 'error',
            ic: {
              timeOut: 5000,
              closeButton: true,
              progressBar: true,
            } as GlobalConfig,
          };
          this.submit = false;
          this.SpinnerService.hide();
          this.cs.showToast(this.toast);
        });
      } else {
        this.userService.addByRepairer(formData).subscribe(res => {
          this.message = res;
          if(this.message.success == false){
            this.submit = false;
            this.error_message = this.message.message;
            this.exist_error = false;
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
            this.SpinnerService.hide();
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
            this.submit = false;
            this.addItem = !this.addItem;
            this.itemSelected = !this.itemSelected;
            this._location.back();
          }
          this.cs.showToast(this.toast);
        },
        (err: HttpErrorResponse) => {
          this.exist_error = true;
          this.error_message = err.error.message;
          this.submit = false;
          this.toast = {
            message: err.error.error,
            title: 'Erreur',
            type: 'error',
            ic: {
              timeOut: 5000,
              closeButton: true,
              progressBar: true,
            } as GlobalConfig,
          };
          this.submit = false;
          this.SpinnerService.hide();
          this.cs.showToast(this.toast);
        });
      }
    }
  }
  get fByRepaier() { return this.formGroupByRepaier.controls; }
  saveByRepairer(){
    this.submittedByRepaier = true;
    if(this.formGroupByRepaier.invalid){
      return;
    } else {
      this.submitByRepaier = true;
      const formData:any = new FormData();
      formData.append("email",this.email);
      formData.append("phone",this.phone);
      formData.append("first_name",this.first_name);
      formData.append("last_name",this.last_name);
      formData.append("profil_id",this.profil_id);
      formData.append("repairer_id",this.repairer_id);
      if(this.signaturefiles){
        formData.append("signature",this.signaturefiles,this.signaturefiles.name);
      }

      this.userService.addByRepairer(formData).subscribe(res => {
        this.message = res;
        if(this.message.success == false){
          this.submitByRepaier = false;
          this.error_message = this.message.message;
          this.exist_error = false;
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
          this.SpinnerService.hide();
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
          this.submitByRepaier = false;
          this.addItem = !this.addItem;
          this.itemSelected = !this.itemSelected;
          this._location.back();
        }
        this.cs.showToast(this.toast);
      },
      (err: HttpErrorResponse) => {
        this.exist_error = true;
        this.error_message = err.error.message;
        this.submitByRepaier = false;
        this.toast = {
          message: err.error.error,
          title: 'Erreur',
          type: 'error',
          ic: {
            timeOut: 5000,
            closeButton: true,
            progressBar: true,
          } as GlobalConfig,
        };
        this.submitByRepaier = false;
        this.SpinnerService.hide();
        this.cs.showToast(this.toast);
      });
    }
  }
}


