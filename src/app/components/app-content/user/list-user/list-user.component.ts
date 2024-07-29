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
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

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
  formGroupAdd!: FormGroup;
  formGroupEdit!: FormGroup;
  formGroup2!: FormGroup;
  submitted = false;
  submitted2 = false;
  submitted3 = false;

  first_name: string = "";
  last_name: string = "";
  profil_id!:number;
  password: string = "";
  phone: string = "";
  email: string = "";
  address: string = "";
  status_id!: number;
  repairer_id!: number;
  signature: string ="";

  user_logged!: any;
  npage!: number;
  token!: any;
  decode_token!: any;
  user_logged_id!: any;

  information!: string;
  start: number = 0;

  submit: boolean = false;

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

  uploadLink = environment.upload_url;

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
    this.getItems();
    this.makePassword(12);
    this.getProfiles();
    this.getRepairers();

    this.formGroup = new FormGroup({
      profil_id: new FormControl('', [Validators.required]),
      first_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    });

    this.formGroup2 = new FormGroup({
      role: new FormControl('', [Validators.required]),
      //entityfirm_id: new FormControl('', [Validators.required]),
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required]),
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

  getUserLogged(){
    this.userService.getUserProfile().subscribe((data: any) => {

      if(data.success == false){

        this.logout();

      } else {

        this.SpinnerService.hide();

        this.user_logged = data.user_logged;

      }
      },
      (err: HttpErrorResponse) => {
        console.log("API indisponible");
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

  resetAll() {
    this.formGroup.reset();
    this.first_name = "";
    this.last_name = "";
    this.email = "";
    this.phone = "";
  }

  onSelectLogo(event:any) {
    this.logofiles = event.target.files[0];
    const reader = new FileReader();
    reader.onload = event => this.logoSrc = reader.result as string;

    reader.readAsDataURL(this.logofiles);
    //console.log(this.logofiles);
  }

  onSelectSignature(event:any) {
    this.signaturefiles = event.target.files[0];
    const reader = new FileReader();
    reader.onload = event => this.signatureSrc = reader.result as string;

    reader.readAsDataURL(this.signaturefiles);
    //console.log(this.signaturefiles);
  }

  onChange(event:any) {
    this.SpinnerService.show();
    this.getItems();
  }

  getItems(){
    this.userService.getUser(this.current_page).subscribe((data: any) => {
      this.listItem = data.users.data;

      this.current_page = data.users.current_page;
      this.first_page_url = data.users.first_page_url;
      this.from = data.users.from;
      this.last_page = data.users.last_page;
      this.last_page_url = data.users.last_page_url;
      this.links = data.users.links;
      this.next_page_url = data.users.next_page_url;
      this.per_page = data.users.per_page;
      this.prev_page_url = data.users.prev_page_url;
      this.to = data.users.to;
      this.total = data.users.total;

      this.SpinnerService.hide();

    });
  }

  search(){
    this.SpinnerService.show();
    this.userService.getUserSearch(this.current_page,this.information).subscribe((data: any) => {
      this.listItem = data.users.data;

      this.current_page = data.users.current_page;
      this.first_page_url = data.users.first_page_url;
      this.from = data.users.from;
      this.last_page = data.users.last_page;
      this.last_page_url = data.users.last_page_url;
      this.links = data.users.links;
      this.next_page_url = data.users.next_page_url;
      this.per_page = data.users.per_page;
      this.prev_page_url = data.users.prev_page_url;
      this.to = data.users.to;
      this.total = data.users.total;

      this.SpinnerService.hide();

    })
  }

  paginate(){
    if(this.information){
      this.search()
    } else {
      this.SpinnerService.show();
      this.userService.getUserPaginate(this.current_page).subscribe((data: any) => {
        this.listItem = data.users.data;

        this.current_page = data.users.current_page;
        this.first_page_url = data.users.first_page_url;
        this.from = data.users.from;
        this.last_page = data.users.last_page;
        this.last_page_url = data.users.last_page_url;
        this.links = data.users.links;
        this.next_page_url = data.users.next_page_url;
        this.per_page = data.users.per_page;
        this.prev_page_url = data.users.prev_page_url;
        this.to = data.users.to;
        this.total = data.users.total;

        this.SpinnerService.hide();

      })
    }
  }

  nextPage() {
    this.SpinnerService.show();
    this.current_page = this.current_page + 1;
    this.paginate();
  }

  previousPage() {
    this.SpinnerService.show();
    this.current_page = this.current_page - 1;
    this.paginate();
  }

  otherPageLeft1() {
    this.current_page = this.current_page - 1;
    this.paginate();
  }

  otherPageLeft2() {
    this.current_page = this.current_page - 2;
    this.paginate();
  }

  otherPageRigth1() {
    this.current_page = this.current_page + 1;
    this.paginate();
  }

  otherPageRigth2() {
    this.current_page = this.current_page + 2;
    this.paginate();
  }

  firstPage() {
    this.current_page = 1;
    this.paginate();
  }

  lastPage() {
    this.current_page = this.last_page;
    this.paginate();
  }

  itemAdd() {
    this.addItem = true;
    this.itemDetail = false;
    this.ableItem = false;
    this.disableItem = false;
    this.resetAll();
  }

  itemEdit(item:any) {
    this.editItem = true;
    this.itemDetail = false;
    this.resetItem = false;
    this.ableItem = false;
    this.disableItem = false;
    this.itemSelected = item;
    this.email = this.itemSelected.email;
    this.phone = this.itemSelected.phone;
    this.first_name = this.itemSelected.first_name;
    this.last_name = this.itemSelected.last_name;
    this.profil_id = this.itemSelected.profil_id;
    this.repairer_id = this.itemSelected.repairer_id;
    this.signature = this.itemSelected.signature;
    this.status_id = this.itemSelected.status_id;
  }

  itemDetails(item:any) {
    this.editItem = false;
    this.itemDetail = true;
    this.resetItem = false;
    this.ableItem = false;
    this.disableItem = false;
    this.itemSelected = item;
    this.email = this.itemSelected.email;
    this.phone = this.itemSelected.phone;
    this.first_name = this.itemSelected.first_name;
    this.last_name = this.itemSelected.last_name;
    this.profil_id = this.itemSelected.profil_id;
    this.repairer_id = this.itemSelected.repairer_id;
    this.signature = this.itemSelected.signature;
    this.status_id = this.itemSelected.status_id;
  }

  itemAble(item:any) {
    this.editItem = false;
    this.itemDetail = false;
    this.resetItem = false;
    this.ableItem = true;
    this.disableItem = false;
    this.itemSelected = item;
    this.email = this.itemSelected.email;
    this.phone = this.itemSelected.phone;
    this.first_name = this.itemSelected.first_name;
    this.last_name = this.itemSelected.last_name;
    this.profil_id = this.itemSelected.profil_id;
    this.repairer_id = this.itemSelected.repairer_id;
    this.signature = this.itemSelected.signature;
    this.status_id = this.itemSelected.status_id;
  }

  itemDisable(item:any) {
    this.editItem = false;
    this.itemDetail = false;
    this.resetItem = false;
    this.ableItem = false;
    this.disableItem = true;
    this.itemSelected = item;
    this.email = this.itemSelected.email;
    this.phone = this.itemSelected.phone;
    this.first_name = this.itemSelected.first_name;
    this.last_name = this.itemSelected.last_name;
    this.profil_id = this.itemSelected.profil_id;
    this.repairer_id = this.itemSelected.repairer_id;
    this.signature = this.itemSelected.signature;
    this.status_id = this.itemSelected.status_id;
  }

  itemReset(item:any) {
    this.editItem = false;
    this.itemDetail = false;
    this.resetItem = true;
    this.ableItem = false;
    this.disableItem = false;
    this.itemSelected = item;
    this.email = this.itemSelected.email;
    this.phone = this.itemSelected.phone;
    this.first_name = this.itemSelected.first_name;
    this.last_name = this.itemSelected.last_name;
    this.profil_id = this.itemSelected.profil_id;
    this.repairer_id = this.itemSelected.repairer_id;
    this.signature = this.itemSelected.signature;
    this.status_id = this.itemSelected.status_id;
  }

  hide_message() {
    this.exist_error = false;
    this.exist_success = false;
  }

  getProfiles(){
    this.profileService.getProfiles().subscribe((data: any) => {
      this.listProfiles = data.profils;
    })
  }

  getRepairers(){
    this.repairerService.getAllRepairers().subscribe((data: any) => {
      this.listRepairer = data.repairers;
    })
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

  get f() { return this.formGroupAdd.controls; }


  get f3() { return this.formGroupEdit.controls; }

  reset(){
    this.submit = true;
    const formData:any = new FormData();
    formData.append("id",this.itemSelected.id);
    this.userService.reset(formData).subscribe(res => {
      this.message = res;
      if(this.message.success == false){
        this.error_message = this.message.message;
        this.submit = false;
        this.exist_error = true;
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
        //this.ableUserAccountMail();
        this.submit = false;
        this.itemSelected = !this.itemSelected;
        this.resetAll();
        this.ngOnInit();
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
    })
  }

  enable(){
    this.submit = true;
    const formData:any = new FormData();
    formData.append("id",this.itemSelected.id);
    this.userService.enable(formData).subscribe(res => {
      this.message = res;
      if(this.message.success == false){
        this.error_message = this.message.message;
        this.submit = false;
        this.exist_error = true;
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
        //this.ableUserAccountMail();
        this.submit = false;
        this.itemSelected = !this.itemSelected;
        this.resetAll();
        this.ngOnInit();
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
    })
  }

  disable(){
    this.submit = true;
    const formData:any = new FormData();
    formData.append("id",this.itemSelected.id);
    this.userService.disableUser(formData).subscribe(res => {
      this.message = res;
      if(this.message.success == false){
        this.error_message = this.message.message;
        this.submit = false;
        this.exist_error = true;
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
        //this.disableUserAccountMail();
        this.submit = false;
        this.itemSelected = !this.itemSelected;
        this.resetAll();
        this.ngOnInit();
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
    })
  }

  get f2() { return this.formGroup2.controls; }

  update(){
    this.submit = true;
    const formData:any = new FormData();
    formData.append("id",this.itemSelected.id);
    formData.append("email",this.email);
    formData.append("phone",this.phone);
    formData.append("first_name",this.first_name);
    formData.append("last_name",this.last_name);
    formData.append("profil_id",this.profil_id);
    formData.append("repairer_id",this.repairer_id);
    if(this.signaturefiles){
      formData.append("signature",this.signaturefiles,this.signaturefiles.name);
    }

    this.userService.update(formData).subscribe(res => {
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
        this.editItem = !this.editItem;
        this.itemSelected = !this.itemSelected;
        this.ngOnInit();
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
    })
  }

}
