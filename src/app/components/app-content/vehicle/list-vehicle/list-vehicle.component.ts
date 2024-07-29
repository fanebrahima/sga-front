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
import { VehicleService } from 'src/app/services/app-content/vehicle.service';
import { BrandService } from 'src/app/services/app-content/brand.service';
import { ColorService } from 'src/app/services/app-content/color.service';


@Component({
  selector: 'app-list-vehicle',
  templateUrl: './list-vehicle.component.html',
  styleUrls: ['./list-vehicle.component.css']
})
export class ListVehicleComponent implements OnInit {

  listItem: any;
  listBrand: any;
  listColor: any;

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

  license_plate: string = "";
  brand: string = "";
  model: string = "";
  type: string = "";
  option: string = "";
  color: string = "";
  mileage: string = "0";
  status_id!: number;
  brand_id!: any;
  color_id!: any;

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

  constructor(
    public Jarwis: JarwisService,
    public vehicleService: VehicleService,
    public userService: UserService,
    public brandService: BrandService,
    public colorService: ColorService,
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
    this.getBrands();
    this.getColors();

    this.formGroupAdd = new FormGroup({
      license_plate: new FormControl('', [Validators.required]),
    });

    this.formGroupEdit = new FormGroup({
      license_plate: new FormControl('', [Validators.required]),
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

    this.license_plate = "";
    this.brand = "";
    this.model = "";
    this.type = "";
    this.option = "";
    this.color = "";
    this.mileage = "";
  }

  getBrands(){
    this.brandService.getAllBrands().subscribe((data: any) => {
      this.listBrand = data.brands;
    })
  }

  getColors(){
    this.colorService.getAllColors().subscribe((data: any) => {
      this.listColor = data.colors;
    })
  }

  changeBrand(event: any) {
    if(event){
      this.brandService.getBrandById(event).subscribe((data: any) => {
        if(data.brand.label != 'null'){
          this.brand_id = data.brand.id;
        }
      });
    }
  }

  changeColor(event: any) {
    if(event){
      this.colorService.getColorById(event).subscribe((data: any) => {
        if(data.color.label != 'null'){
        this.color_id = data.color.id;
        }
      });
    }
  }

  getItems(){
    this.vehicleService.getVehicle(this.current_page).subscribe((data: any) => {
      this.listItem = data.vehicles.data;

      this.current_page = data.vehicles.current_page;
      this.first_page_url = data.vehicles.first_page_url;
      this.from = data.vehicles.from;
      this.last_page = data.vehicles.last_page;
      this.last_page_url = data.vehicles.last_page_url;
      this.links = data.vehicles.links;
      this.next_page_url = data.vehicles.next_page_url;
      this.per_page = data.vehicles.per_page;
      this.prev_page_url = data.vehicles.prev_page_url;
      this.to = data.vehicles.to;
      this.total = data.vehicles.total;

      this.SpinnerService.hide();

    });
  }

  search(){
    this.SpinnerService.show();
    this.vehicleService.getVehicleSearch(this.current_page,this.information).subscribe((data: any) => {
      this.listItem = data.vehicles.data;

      this.current_page = data.vehicles.current_page;
      this.first_page_url = data.vehicles.first_page_url;
      this.from = data.vehicles.from;
      this.last_page = data.vehicles.last_page;
      this.last_page_url = data.vehicles.last_page_url;
      this.links = data.vehicles.links;
      this.next_page_url = data.vehicles.next_page_url;
      this.per_page = data.vehicles.per_page;
      this.prev_page_url = data.vehicles.prev_page_url;
      this.to = data.vehicles.to;
      this.total = data.vehicles.total;

      this.SpinnerService.hide();

    })
  }

  paginate(){
    if(this.information){
      this.search()
    } else {
      this.SpinnerService.show();
      this.vehicleService.getVehiclePaginate(this.current_page).subscribe((data: any) => {
        this.listItem = data.vehicles.data;

      this.current_page = data.vehicles.current_page;
      this.first_page_url = data.vehicles.first_page_url;
      this.from = data.vehicles.from;
      this.last_page = data.vehicles.last_page;
      this.last_page_url = data.vehicles.last_page_url;
      this.links = data.vehicles.links;
      this.next_page_url = data.vehicles.next_page_url;
      this.per_page = data.vehicles.per_page;
      this.prev_page_url = data.vehicles.prev_page_url;
      this.to = data.vehicles.to;
      this.total = data.vehicles.total;

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
    this.license_plate = this.itemSelected.license_plate;
    this.brand_id = this.itemSelected.brand_id;
    this.color_id = this.itemSelected.color_id;
    if(this.itemSelected.model){
      this.model = this.itemSelected.model;
    }
    if(this.itemSelected.type){
      this.type = this.itemSelected.type;
    }
    if(this.itemSelected.option){
      this.option = this.itemSelected.option;
    }
    if(this.itemSelected.mileage){
      this.mileage = this.itemSelected.mileage;
    }
    this.status_id = this.itemSelected.status_id;
  }

  itemDetails(item:any) {
    this.editItem = false;
    this.itemDetail = true;
    this.resetItem = false;
    this.ableItem = false;
    this.disableItem = false;
    this.itemSelected = item;
    this.license_plate = this.itemSelected.license_plate;
    this.brand_id = this.itemSelected.brand_id;
    this.model = this.itemSelected.model;
    this.type = this.itemSelected.type;
    this.option = this.itemSelected.option;
    this.color_id = this.itemSelected.color_id;
    this.mileage = this.itemSelected.mileage;
    this.status_id = this.itemSelected.status_id;
  }

  itemAble(item:any) {
    this.editItem = false;
    this.itemDetail = false;
    this.resetItem = false;
    this.ableItem = true;
    this.disableItem = false;
    this.itemSelected = item;
    this.license_plate = this.itemSelected.license_plate;
    this.brand_id = this.itemSelected.brand_id;
    this.model = this.itemSelected.model;
    this.type = this.itemSelected.type;
    this.option = this.itemSelected.option;
    this.color_id = this.itemSelected.color_id;
    this.mileage = this.itemSelected.mileage;
    this.status_id = this.itemSelected.status_id;
  }

  itemDisable(item:any) {
    this.editItem = false;
    this.itemDetail = false;
    this.resetItem = false;
    this.ableItem = false;
    this.disableItem = true;
    this.itemSelected = item;
    this.license_plate = this.itemSelected.license_plate;
    this.brand_id = this.itemSelected.brand_id;
    this.model = this.itemSelected.model;
    this.type = this.itemSelected.type;
    this.option = this.itemSelected.option;
    this.color_id = this.itemSelected.color_id;
    this.mileage = this.itemSelected.mileage;
    this.status_id = this.itemSelected.status_id;
  }

  hide_message() {
    this.exist_error = false;
    this.exist_success = false;
  }


  get f() { return this.formGroupAdd.controls; }

  save(): void {
    this.submitted = true;

    if (this.formGroupAdd.invalid) {
      return;

    } else {

      this.submit = !this.submit;

      const formData = new FormData();

      formData.append('license_plate',this.license_plate);
      formData.append('brand_id',this.brand_id);
      formData.append('model',this.model);
      formData.append('type',this.type);
      formData.append('option',this.option);
      formData.append('color_id',this.color_id);
      formData.append('mileage',this.mileage);

      this.vehicleService.add(formData).subscribe(res => {
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

    this.vehicleService.enable(formData).subscribe(res => {
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

    this.vehicleService.disable(formData).subscribe(res => {
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
    formData.append('license_plate',this.license_plate);
    formData.append('brand_id',this.brand_id);
    formData.append('model',this.model);
    formData.append('type',this.type);
    formData.append('option',this.option);
    formData.append('color_id',this.color_id);
    formData.append('mileage',this.mileage);

    this.vehicleService.update(formData).subscribe(res => {
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
