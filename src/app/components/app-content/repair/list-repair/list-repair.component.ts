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
import { RepairService } from 'src/app/services/app-content/repair.service';
import { Email } from 'src/app/models/insurer-email.model';
import { Repair } from 'src/app/models/repair.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-list-repair',
  templateUrl: './list-repair.component.html',
  styleUrls: ['./list-repair.component.css']
})
export class ListRepairComponent implements OnInit {

  listItem: any;
  listRepairWork: any
  repairEmails:any;

  itemSelected: any;

  avatarfiles: any;
  avatarSrc!: string;

  emails: Array<{
    email: string,
  }> = []

  insurer_email: string = "";
  exist_email_error:boolean = false;
  submittedEmail = false;
  addEmail = false;
  removeEmail = false;
  submitAddEmail: boolean = false;
  submitRemoveEmail: boolean = false;
  emailSelected!: any;
  existEmail: boolean = false;
  resentEmail: boolean = false;
  emailFormGroup!: FormGroup;

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

  step1: boolean = true;
  step2: boolean = false;
  step3: boolean = false;
  step4: boolean = false;
  step5: boolean = false;
  step6: boolean = false;

  works: Array<{
    designation_id: number,
    designation_label: string,
    replacement: number,
    repair: number,
    paint: number,
    control: number,
  }> = []

  designation_id!:number;
  label: string = "";
  replacement:number = 0;
  repair:number = 0;
  paint:number = 0;
  control:number = 0;

  repairer_id!: number;
  vehicle_id!: number;
  point_of_shock: string = "";
  remark: string = "";
  amount!: number;
  status_id!: number;

  user_logged!: any;
  npage!: number;
  token!: any;
  decode_token!: any;
  user_logged_id!: any;

  information!: string;
  start: number = 0;

  submit: boolean = false;
  submit_before_photos: boolean = false;
  submit_during_photos: boolean = false;
  submit_after_photos: boolean = false;

  selectedImage: any;

  before_photofiles: any;
  before_photoSrc: any;
  before_photos: string [] = [];
  before_images: string [] = [];
  all_before_photos: string [] = [];

  during_photofiles: any;
  during_photoSrc: any;
  during_photos: string [] = [];
  during_images: string [] = [];
  all_during_photos: string [] = [];

  after_photofiles: any;
  after_photoSrc: any;
  after_photos: string [] = [];
  after_images: string [] = [];
  all_after_photos: string [] = [];

  addItem: boolean = false;
  addPhotos: boolean = false;
  add_before_photos: boolean = false;
  add_during_photos: boolean = false;
  add_after_photos: boolean = false;
  all_photos: boolean = false;
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

  downloadLink = environment.upload_url;
  // downloadLink = "https://api-gerenthon.geasscorp.com";
  uploadLink = environment.upload_url;

  signaturefiles: any;
  signatureSrc!: string;
  signature: string ="";

  public qrCodeDownloadLink: SafeUrl = "";
  qr_code: string ="";

  constructor(
    public Jarwis: JarwisService,
    public repairService: RepairService,
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

    /** spinner starts on init */
    this.SpinnerService.show();

    this.getUserLogged();
    this.getItems();

    this.formGroupAdd = new FormGroup({
      license_plate: new FormControl('', [Validators.required]),
    });

    this.formGroupEdit = new FormGroup({
      license_plate: new FormControl('', [Validators.required]),
    });

    this.emailFormGroup = new FormGroup({
      insurer_email: new FormControl('', [Validators.required]),
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

    this.replacement = 0;
    this.repair = 0;
    this.paint = 0;
    this.control = 0;
  }

  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = 'https://sga-back.ddev.site/storage/repair/FTS2024_080418_0137.pdf';
    console.log('azerty',this.qrCodeDownloadLink);
  }

  downloadRepair(item:any) {
    console.log(item.reference);
    this.repairService.downloadRepair(item.reference).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = item.reference+'.pdf'; // Adjust file name as needed
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Download failed', error);
    });
  }

  downloadPhoto(item:any) {
    console.log(item);
    this.repairService.downloadPhoto(item).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = item+'.png'; // Adjust file name as needed
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Download failed', error);
    });
  }

  
  downloadFile(reference:any,license_plate:any){

    var url = this.downloadLink.concat("/storage/repair/").concat(reference).concat(".pdf");

    let link = document.createElement("a");
    link.download = reference.concat("-").concat(license_plate);
    link.href = url;
    link.click();

  }

  getItems(){
    this.repairService.getRepair(this.current_page).subscribe((data: any) => {
      this.listItem = data.repairs.data;

      this.current_page = data.repairs.current_page;
      this.first_page_url = data.repairs.first_page_url;
      this.from = data.repairs.from;
      this.last_page = data.repairs.last_page;
      this.last_page_url = data.repairs.last_page_url;
      this.links = data.repairs.links;
      this.next_page_url = data.repairs.next_page_url;
      this.per_page = data.repairs.per_page;
      this.prev_page_url = data.repairs.prev_page_url;
      this.to = data.repairs.to;
      this.total = data.repairs.total;

      this.SpinnerService.hide();

    });
  }

  search(){
    this.SpinnerService.show();
    this.repairService.getRepairSearch(this.current_page,this.information).subscribe((data: any) => {
      this.listItem = data.repairs.data;

      this.current_page = data.repairs.current_page;
      this.first_page_url = data.repairs.first_page_url;
      this.from = data.repairs.from;
      this.last_page = data.repairs.last_page;
      this.last_page_url = data.repairs.last_page_url;
      this.links = data.repairs.links;
      this.next_page_url = data.repairs.next_page_url;
      this.per_page = data.repairs.per_page;
      this.prev_page_url = data.repairs.prev_page_url;
      this.to = data.repairs.to;
      this.total = data.repairs.total;

      this.SpinnerService.hide();

    })
  }

  paginate(){
    if(this.information){
      this.search()
    } else {
      this.SpinnerService.show();
      this.repairService.getRepairPaginate(this.current_page).subscribe((data: any) => {
        this.listItem = data.repairs.data;

      this.current_page = data.repairs.current_page;
      this.first_page_url = data.repairs.first_page_url;
      this.from = data.repairs.from;
      this.last_page = data.repairs.last_page;
      this.last_page_url = data.repairs.last_page_url;
      this.links = data.repairs.links;
      this.next_page_url = data.repairs.next_page_url;
      this.per_page = data.repairs.per_page;
      this.prev_page_url = data.repairs.prev_page_url;
      this.to = data.repairs.to;
      this.total = data.repairs.total;

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

  exportexcel(file_name:string){
    let link = document.createElement("a");
    link.download = file_name;
    link.href = this.downloadLink.concat('/storage/before_photos/').concat(file_name);
    link.click();
  }

  itemAdd() {
    this.addItem = true;
    this.itemDetail = false;
    this.addPhotos = false;
    this.ableItem = false;
    this.disableItem = false;
    this.resetAll();
  }

  itemEdit(item:any) {
    this.editItem = true;
    this.itemDetail = false;
    this.addPhotos = false;
    this.resetItem = false;
    this.ableItem = false;
    this.disableItem = false;
    this.itemSelected = item;
    this.repairer_id = this.itemSelected.repairer_id;
    this.vehicle_id = this.itemSelected.vehicle_id;
    this.point_of_shock = this.itemSelected.point_of_shock;
    this.remark = this.itemSelected.remark;
    this.amount = this.itemSelected.amount;
    this.status_id = this.itemSelected.status_id;
  }

  itemDetails(item:any) {
    this.SpinnerService.show()
    this.editItem = false;
    this.itemDetail = true;
    this.addPhotos = false;
    this.resetItem = false;
    this.ableItem = false;
    this.disableItem = false;
    this.itemSelected = item;
    this.repairer_id = this.itemSelected.repairer_id;
    this.vehicle_id = this.itemSelected.vehicle_id;
    this.point_of_shock = this.itemSelected.point_of_shock;
    this.remark = this.itemSelected.remark;
    this.amount = this.itemSelected.amount;
    this.status_id = this.itemSelected.status_id;
    this.repairService.getRepairById(this.itemSelected.id).subscribe((data: any) => {
      this.repairEmails = data.emails;
      this.qr_code = data.qr_code.qr_code;
      this.saveEmails();
      this.SpinnerService.hide();
    })
  }

  itemAble(item:any) {
    this.editItem = false;
    this.itemDetail = false;
    this.addPhotos = false;
    this.resetItem = false;
    this.ableItem = true;
    this.disableItem = false;
    this.itemSelected = item;
    this.repairer_id = this.itemSelected.repairer_id;
    this.vehicle_id = this.itemSelected.vehicle_id;
    this.point_of_shock = this.itemSelected.point_of_shock;
    this.remark = this.itemSelected.remark;
    this.amount = this.itemSelected.amount;
    this.status_id = this.itemSelected.status_id;
  }

  itemDisable(item:any) {
    this.editItem = false;
    this.itemDetail = false;
    this.addPhotos = false;
    this.resetItem = false;
    this.ableItem = false;
    this.disableItem = true;
    this.itemSelected = item;
    this.repairer_id = this.itemSelected.repairer_id;
    this.vehicle_id = this.itemSelected.vehicle_id;
    this.point_of_shock = this.itemSelected.point_of_shock;
    this.remark = this.itemSelected.remark;
    this.amount = this.itemSelected.amount;
    this.status_id = this.itemSelected.status_id;
  }

  deselectAll(){
    this.add_before_photos = false;
    this.add_after_photos = false;
    this.add_after_photos = false;
    this.all_photos = false;
  }

  itemPhotos(item:any) {
    this.editItem = false;
    this.itemDetail = false;
    this.addPhotos = true;
    this.add_before_photos = true;
    this.resetItem = false;
    this.ableItem = false;
    this.disableItem = false;
    this.itemSelected = item;
    this.all_before_photos = JSON.parse(item.before_photos);
    this.all_during_photos = JSON.parse(item.during_photos);
    this.all_after_photos = JSON.parse(item.after_photos);
    this.repairer_id = this.itemSelected.repairer_id;
    this.vehicle_id = this.itemSelected.vehicle_id;
    this.point_of_shock = this.itemSelected.point_of_shock;
    this.remark = this.itemSelected.remark;
    this.amount = this.itemSelected.amount;
    this.status_id = this.itemSelected.status_id;
  }

  hide_message() {
    this.exist_error = false;
    this.exist_success = false;
  }

  emailClick(item:any) {
    this.emailSelected = item;
  }

  deleteEmail() {
    this.submitRemoveEmail = true;
    this.error_message = "";
    for( var i = 0; i < this.emails.length; i++){

      if(this.emails[i].email == this.emailSelected.email){
        this.emails.splice(i, 1);
        this.removeEmail = false;
        this.submitRemoveEmail = false;
        this.insurer_email = "";
      }

    }
  }

  saveEmails(){
    for( var i = 0; i < this.repairEmails.length; i++){

      for( var j = 0; j < this.emails.length; j++){

        if(this.repairEmails[i].email == this.emails[j].email.toLowerCase()){
          this.existEmail = true;
        } else {
          this.existEmail = false;
        }
      }

      if(this.existEmail == false){
        const newEmail = new Email();
        newEmail.email = this.repairEmails[i].email.toLowerCase();
        this.emails.push(newEmail);
      }

    }
    this.existEmail = false;
  }

  get fEmail() { return this.emailFormGroup.controls; }

  saveEmail(){
    this.error_message = "";
    this.submittedEmail = true;
    this.submitAddEmail = true;

    if (this.emailFormGroup.invalid) {
      return;

    } else {
      for( var i = 0; i < this.emails.length; i++){

        if(this.emails[i].email == this.insurer_email.toLowerCase()){
          console.log(this.emails[i].email,this.insurer_email);
          this.existEmail = true;
          this.submitAddEmail = false;
        } else {
          this.existEmail = false;
        }
      }

      if(this.existEmail == false){
        const newEmail = new Email();
        newEmail.email = this.insurer_email.toLowerCase();
        this.emails.push(newEmail);
        this.submitAddEmail = false;
        this.addEmail = false;
        this.insurer_email = "";
      }
    }
  }

  onBeforePhotoChange(event: any) {
    if (event.target.files.length > 0) {
      for (var i = 0; i < (event.target.files.length); i++) {
        var reader = new FileReader();
        this.before_photos.push(event.target.files[i]);
        console.log('my files check', this.before_photos);

        reader.onload = (event:any) => {
          // Push Base64 string
          this.before_images.push(event.target.result);
        }
        reader.readAsDataURL(event.target.files[i]);

      }
    }
    console.log(this.before_images);
    console.log(this.before_photos);
  }

  removeBeforeImage(){
    for( var i = 0; i < this.before_photos.length; i++){
        this.before_photos.splice(0);
    }
    for( var i = 0; i < this.before_images.length; i++){
      this.before_images.splice(0);
    }

    console.log(this.before_images);
    console.log(this.before_photos);

  }

  onDuringPhotoChange(event: any) {
    if (event.target.files.length > 0) {
      for (var i = 0; i < (event.target.files.length); i++) {
        var reader = new FileReader();
        this.during_photos.push(event.target.files[i]);
        console.log('my files check', this.during_photos);

        reader.onload = (event:any) => {
          // Push Base64 string
          this.during_images.push(event.target.result);
        }
        reader.readAsDataURL(event.target.files[i]);

      }
    }
    console.log(this.during_images);
    console.log(this.during_photos);
  }

  removeDuringImage(){
    for( var i = 0; i < this.during_photos.length; i++){
        this.during_photos.splice(0);
    }
    for( var i = 0; i < this.during_images.length; i++){
      this.during_images.splice(0);
    }

    console.log(this.during_images);
    console.log(this.during_photos);

  }

  onAfterPhotoChange(event: any) {
    if (event.target.files.length > 0) {
      for (var i = 0; i < (event.target.files.length); i++) {
        var reader = new FileReader();
        this.after_photos.push(event.target.files[i]);
        console.log('my files check', this.after_photos);

        reader.onload = (event:any) => {
          // Push Base64 string
          this.after_images.push(event.target.result);
        }
        reader.readAsDataURL(event.target.files[i]);

      }
    }
    console.log(this.after_images);
    console.log(this.after_photos);
  }

  removeAfterImage(){
    for( var i = 0; i < this.after_photos.length; i++){
        this.after_photos.splice(0);
    }
    for( var i = 0; i < this.after_images.length; i++){
      this.after_images.splice(0);
    }

    console.log(this.after_images);
    console.log(this.after_photos);

  }

  get f() { return this.formGroupAdd.controls; }

  save(): void {
    this.submitted = true;

    if (this.formGroupAdd.invalid) {
      return;

    } else {

      this.submit = !this.submit;

      const formData = new FormData();

      this.repairService.add(formData).subscribe(res => {
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

  replay(){
    this.submit = true;
    if(this.emails.length > 0){
      const repair = new Repair();
      repair.id = this.itemSelected.id;
      repair.emails = this.emails;

      this.repairService.replay(repair).subscribe(res => {
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
          this.submit = false;
          this.itemSelected = false;
          this.resentEmail = false;
          this.emails = [];
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
    } else {
      this.submit = false;
      this.exist_email_error = true;
    }
  }

  get f3() { return this.formGroupEdit.controls; }

  enable(){
    this.submit = true;
    const formData:any = new FormData();
    formData.append("id",this.itemSelected.id);

    this.repairService.enable(formData).subscribe(res => {
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

    this.repairService.disable(formData).subscribe(res => {
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


    this.repairService.update(formData).subscribe(res => {
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

  save_before_photos(){
    this.submit_before_photos = true;
    if(this.before_photos.length > 0){
      const formData:any = new FormData();
      formData.append("id", this.itemSelected.id);
      for(var i =  0; i <  this.before_photos.length; i++)  {
        formData.append("before_photos[]",  this.before_photos[i]);
      }

      this.repairService.addBeforePhotos(formData).subscribe(res => {
        this.message = res;
        if(this.message.success == false){
          this.error_message = this.message.message;
          this.submit_before_photos = false;
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
          this.submit_before_photos = false;
          this.itemSelected =! this.itemSelected;
          this.removeBeforeImage();
          this.getItems();
        }
        this.cs.showToast(this.toast);
      },
      (err: HttpErrorResponse) => {
        this.exist_error = true;
        this.error_message = err.error.message;
        this.submit_after_photos = false;
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
        this.submit_before_photos = false;
        this.SpinnerService.hide();
        this.cs.showToast(this.toast);
      })
    } else {
      this.submit_before_photos = false;
      this.exist_email_error = true;
    }
  }

  save_during_photos(){
    this.submit_during_photos = true;
    if(this.during_photos.length > 0){
      const formData:any = new FormData();
      formData.append("id", this.itemSelected.id);
      for(var i =  0; i <  this.during_photos.length; i++)  {
        formData.append("during_photos[]",  this.during_photos[i]);
      }

      this.repairService.addDuringPhotos(formData).subscribe(res => {
        this.message = res;
        if(this.message.success == false){
          this.error_message = this.message.message;
          this.submit_during_photos = false;
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
          this.submit_during_photos = false;
          this.itemSelected =! this.itemSelected;
          this.removeDuringImage();
          this.getItems();
        }
        this.cs.showToast(this.toast);
      },
      (err: HttpErrorResponse) => {
        this.exist_error = true;
        this.error_message = err.error.message;
        this.submit_during_photos = false;
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
        this.submit_during_photos = false;
        this.SpinnerService.hide();
        this.cs.showToast(this.toast);
      })
    } else {
      this.submit_during_photos = false;
      this.exist_email_error = true;
    }
  }

  save_after_photos(){
    this.submit_after_photos = true;
    if(this.after_photos.length > 0){
      const formData:any = new FormData();
      formData.append("id", this.itemSelected.id);
      for(var i =  0; i <  this.after_photos.length; i++)  {
        formData.append("after_photos[]",  this.after_photos[i]);
      }

      this.repairService.addAfterPhotos(formData).subscribe(res => {
        this.message = res;
        if(this.message.success == false){
          this.error_message = this.message.message;
          this.submit_after_photos = false;
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
          this.submit_after_photos = false;
          this.itemSelected =! this.itemSelected;
          this.removeAfterImage();
          this.getItems();
        }
        this.cs.showToast(this.toast);
      },
      (err: HttpErrorResponse) => {
        this.exist_error = true;
        this.error_message = err.error.message;
        this.submit_after_photos = false;
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
        this.submit_after_photos = false;
        this.SpinnerService.hide();
        this.cs.showToast(this.toast);
      })
    } else {
      this.submit_after_photos = false;
      this.exist_email_error = true;
    }
  }

}
