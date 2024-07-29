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
import { DesignationService } from 'src/app/services/app-content/designation.service';
import { Designation } from 'src/app/models/designation.model';


@Component({
  selector: 'app-list-designation',
  templateUrl: './list-designation.component.html',
  styleUrls: ['./list-designation.component.css']
})
export class ListDesignationComponent implements OnInit {

  listItem: any;

  itemSelected: any;

  selectedImage: any;
  logofiles: any;
  logoSrc!: string;

  avatarfiles: any;
  avatarSrc!: string;

  toast!: toastPayload;
  message:any;
  error_message: any;
  exist_error:boolean = false;
  phone_error: any;
  success_message: any;
  exist_success:boolean = false;

  formGroupAdd!: FormGroup;
  formGroupEdit!: FormGroup;
  formGroup2!: FormGroup;
  submitted = false;
  submitted2 = false;
  submitted3 = false;

  label!: string;
  status_id!: number;

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

  table = [
      {
          "id": "57",
          "label": "Aile AV D"
      },
      {
          "id": "52",
          "label": "Aile AV G"
      },
      {
          "id": "65",
          "label": "Armature AR"
      },
      {
          "id": "64",
          "label": "Armature AV"
      },
      {
          "id": "51",
          "label": "Calandre"
      },
      {
          "id": "58",
          "label": "Capot moteur + chanière (rec)"
      },
      {
          "id": "59",
          "label": "Charnieres G/D de capot moteur"
      },
      {
          "id": "45",
          "label": "Feu Anti Brouillard Gd"
      },
      {
          "id": "55",
          "label": "Feu D'Aile Avg"
      },
      {
          "id": "46",
          "label": "Feu De Pionte D'Aile Avg"
      },
      {
          "id": "61",
          "label": "Gache De Capot Moteur "
      },
      {
          "id": "53",
          "label": "Joue d'aile AV G"
      },
      {
          "id": "70",
          "label": "Montant D de Pare-Brise"
      },
      {
          "id": "69",
          "label": "Montant G De Pare-Brise"
      },
      {
          "id": "42",
          "label": "Pare-chocs AV"
      },   
      {
          "id": "47",
          "label": "Phare gauche"
      }
    ];

  constructor(
    public Jarwis: JarwisService,
    public designationService: DesignationService,
    public userService: UserService,
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

    // this.saveAll();

    /** spinner starts on init */
    this.SpinnerService.show();
    
    this.getUserLogged();
    this.getItems();

    this.formGroupAdd = new FormGroup({
      label: new FormControl('', [Validators.required]),
    });

    this.formGroupEdit = new FormGroup({
      label: new FormControl('', [Validators.required]),
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
    this.formGroupAdd.reset();
    this.formGroupEdit.reset();

    this.label = "";
  }

  getItems(){
    this.designationService.getDesignation(this.current_page).subscribe((data: any) => {
      this.listItem = data.designations.data;

      this.current_page = data.designations.current_page;
      this.first_page_url = data.designations.first_page_url;
      this.from = data.designations.from;
      this.last_page = data.designations.last_page;
      this.last_page_url = data.designations.last_page_url;
      this.links = data.designations.links;
      this.next_page_url = data.designations.next_page_url;
      this.per_page = data.designations.per_page;
      this.prev_page_url = data.designations.prev_page_url;
      this.to = data.designations.to;
      this.total = data.designations.total;

      this.SpinnerService.hide();

    });    
  }

  search(){
    this.SpinnerService.show();
    this.designationService.getDesignationSearch(this.current_page,this.information).subscribe((data: any) => {
      this.listItem = data.designations.data;

      this.current_page = data.designations.current_page;
      this.first_page_url = data.designations.first_page_url;
      this.from = data.designations.from;
      this.last_page = data.designations.last_page;
      this.last_page_url = data.designations.last_page_url;
      this.links = data.designations.links;
      this.next_page_url = data.designations.next_page_url;
      this.per_page = data.designations.per_page;
      this.prev_page_url = data.designations.prev_page_url;
      this.to = data.designations.to;
      this.total = data.designations.total;

      this.SpinnerService.hide();

    })
  }

  paginate(){
    if(this.information){
      this.search()
    } else {
      this.SpinnerService.show();
      this.designationService.getDesignationPaginate(this.current_page).subscribe((data: any) => {
        this.listItem = data.designations.data;

      this.current_page = data.designations.current_page;
      this.first_page_url = data.designations.first_page_url;
      this.from = data.designations.from;
      this.last_page = data.designations.last_page;
      this.last_page_url = data.designations.last_page_url;
      this.links = data.designations.links;
      this.next_page_url = data.designations.next_page_url;
      this.per_page = data.designations.per_page;
      this.prev_page_url = data.designations.prev_page_url;
      this.to = data.designations.to;
      this.total = data.designations.total;

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
    this.label = this.itemSelected.label;
    this.status_id = this.itemSelected.status_id;
  }

  itemDetails(item:any) {
    this.editItem = false;
    this.itemDetail = true;
    this.resetItem = false;
    this.ableItem = false;
    this.disableItem = false;
    this.itemSelected = item;
    this.label = this.itemSelected.label;
    this.status_id = this.itemSelected.status_id;
  }

  itemAble(item:any) {
    this.editItem = false;
    this.itemDetail = false;
    this.resetItem = false;
    this.ableItem = true;
    this.disableItem = false;
    this.itemSelected = item;
    this.label = this.itemSelected.label;
    this.status_id = this.itemSelected.status_id;
  }

  itemDisable(item:any) {
    this.editItem = false;
    this.itemDetail = false;
    this.resetItem = false;
    this.ableItem = false;
    this.disableItem = true;
    this.itemSelected = item;
    this.label = this.itemSelected.label;
    this.status_id = this.itemSelected.status_id;
  }

  hide_message() {
    this.exist_error = false;
    this.exist_success = false;
  }

  saveAll(): void {
    const designation = new Designation();
    designation.table = this.table;

    this.designationService.addAll(designation).subscribe();
  }

  get f() { return this.formGroupAdd.controls; }

  save(): void {
    this.submitted = true;

    if (this.formGroupAdd.invalid) {
      return;

    } else {

      this.submit = !this.submit;

      const formData = new FormData();

      formData.append('label',this.label);

      this.designationService.add(formData).subscribe(res => {
        this.message = res;
        if(this.message.success == false){
          this.submit = !this.submit;
          this.error_message = this.message.message;
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
          this.submit = false;
          this.addItem = !this.addItem;
          this.itemSelected = !this.itemSelected;
          this.ngOnInit();
        }
        this.cs.showToast(this.toast);
      },
      (err: HttpErrorResponse) => {
        this.exist_error = true;
        this.exist_error = err.error.errors;
        this.submit = false;
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
        this.SpinnerService.hide();
        this.cs.showToast(this.toast);
      });

    }
  }

  get f3() { return this.formGroupEdit.controls; }

  enable(){
    this.submit = true;
    const formData:any = new FormData();
    formData.append("id",this.itemSelected.id);
    this.designationService.enable(formData).subscribe(res => {
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
    
    this.designationService.disable(formData).subscribe(res => {
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
    formData.append("label",this.label);
    formData.append("id",this.itemSelected.id);
    

    this.designationService.update(formData).subscribe(res => {
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
