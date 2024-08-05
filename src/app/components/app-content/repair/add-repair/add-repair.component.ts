import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { RepairWork } from 'src/app/models/repair-work.model';
import { Repair } from 'src/app/models/repair.model';
import { RepairService } from 'src/app/services/app-content/repair.service';
import { DesignationService } from 'src/app/services/app-content/designation.service';
import { RepairerService } from 'src/app/services/app-content/repairer.service';
import { VehicleService } from 'src/app/services/app-content/vehicle.service';
import SignaturePad from 'signature_pad';
import ExpertSignaturePad from 'signature_pad';
import RepairerSignaturePad from 'signature_pad';
import CustomerSignaturePad from 'signature_pad';
import { ShockPointService } from 'src/app/services/app-content/shock-point.service';
import { Editor } from 'ngx-editor';
import { Email } from 'src/app/models/insurer-email.model';
import { BrandService } from 'src/app/services/app-content/brand.service';
import { ColorService } from 'src/app/services/app-content/color.service';
import { ClientService } from 'src/app/services/app-content/client.service';
import { InsurerService } from 'src/app/services/app-content/insurer.service';
import { ShockPoint } from 'src/app/models/shock-point.model';
import { Shock } from 'src/app/models/shock.model';
import { QrCodeService } from 'src/app/services/app-content/qr-code.service';

@Component({
  selector: 'app-add-repair',
  templateUrl: './add-repair.component.html',
  styleUrls: ['./add-repair.component.css']
})
export class AddRepairComponent implements OnInit {

  listDesignation: any;
  listShockPoint: any;
  listBrand: any;
  listColor: any;
  listRepairer: any;
  listClient: any;
  listInsurer: any;
  listVehicle: any;
  listRemark: any;

  shocks: Array<{
    shock_point_id: number,
    shock_point_label: string,
    works: Array<{
      designation_id: number,
      designation_label: string,
      replacement: number,
      repair: number,
      paint: number,
      control: number,
    }>;
  }> = []

  shock_points: Array<{
    shock_point_id: number,
    shock_point_label: string,
    works?: any;
  }> = []

  works: Array<{
    designation_id: number,
    designation_label: string,
    replacement: number,
    repair: number,
    paint: number,
    control: number,
  }> = []

  emails: Array<{
    email: string,
  }> = []

  insured_email: string = "";

  designation_id!:any;
  label: string = "";
  replacement:number = 0;
  repair:number = 0;
  paint:number = 0;
  control:number = 0;

  repairer_id!: number;
  client_id!: number;
  insurer_id!: number;
  vehicle_id!: number;
  shock_point_id!: any;
  brand_id!: any;
  color_id!: any;
  point_of_shock: string = "";
  remark: string = "";
  amount: number = 0;
  expert_email: string = "";
  repairer_email: string = "";
  customer_email: string = "";

  toast!: toastPayload;
  message:any;
  error_message: string = "";
  exist_error:boolean = false;
  exist_success:boolean = false;

  exist_shock_error:boolean = false;
  exist_work_error:boolean = false;
  exist_email_error:boolean = false;
  exist_signature_error:boolean = false;
  exist_vehicle:boolean = false;

  formGroupStep1!: FormGroup;
  formGroupStep2!: FormGroup;
  formGroupStep3!: FormGroup;
  formGroupStep4!: FormGroup;
  formGroupStep5!: FormGroup;
  formGroupStep6!: FormGroup;
  formGroupStep7!: FormGroup;
  formGroupStep8!: FormGroup;
  designationFormGroup!: FormGroup;
  emailFormGroup!: FormGroup;
  submitted = false;
  submittedStep1 = false;
  submittedStep2 = false;
  submittedStep3 = false;
  submittedStep4 = false;
  submittedStep5 = false;
  submittedStep6 = false;
  submittedStep7 = false;
  submittedStep8 = false;
  submittedShockPoint = false;
  submittedWork = false;
  submittedEmail = false;
  addShockPoint = false;
  removeShockPoint = false;
  addWork = false;
  removeWork = false;
  addEmail = false;
  removeEmail = false;

  user_logged!: any;

  submit: boolean = false;
  submitAddShockPoint: boolean = false;
  submitRemoveShockPoint: boolean = false;
  submitAddWork: boolean = false;
  submitRemoveWork: boolean = false;
  submitAddEmail: boolean = false;
  submitRemoveEmail: boolean = false;
  submitVehicle: boolean = false;
  exist: boolean = false;
  existEmail: boolean = false;

  step1: boolean = true;
  step2: boolean = false;
  step3: boolean = false;
  step4: boolean = false;
  step5: boolean = false;
  step6: boolean = false;
  step7: boolean = false;
  step8: boolean = false;
  step9: boolean = false;

  npage!: number;
  token!: any;
  decode_token!: any;
  user_logged_id!: any;

  shockPointSelected_id!: any;
  shockPointSelected!: any;
  designationSelected!: any;
  emailSelected!: any;

  name: string = "";
  email: string = "";
  address: string = "";
  phone: string = "";
  responsible_first_name: string = "";
  responsible_last_name: string = "";

  client_name: string = "";
  client_email: string = "";
  client_address: string = "";
  client_phone: string = "";

  insurer_name: string = "";
  insurer_email: string = "";
  insurer_address: string = "";
  insurer_phone: string = "";
  disaster_number: string = "";

  license_plate: string = "";
  brand: string = "";
  model: string = "";
  type: string = "";
  option: string = "";
  color: string = "";
  mileage: string = "0";

  shock_point_label: string = "";

  dateNow!: Date;

  permissions!: any;
  permitted: boolean = false;

  @ViewChild('canvas') canvasEl!: ElementRef;
  signatureNeeded!: boolean;
  signaturePad!: SignaturePad;
  signatureImg!: string;

  @ViewChild('expertCanvas') expertCanvasEl!: ElementRef;
  expertSignatureNeeded!: boolean;
  expertSignaturePad!: ExpertSignaturePad;
  expertSignatureImg!: string;

  @ViewChild('repairerCanvas') repairerCanvasEl!: ElementRef;
  repairerSignatureNeeded!: boolean;
  repairerSignaturePad!: RepairerSignaturePad;
  repairerSignatureImg!: string;

  @ViewChild('customerCanvas') customerCanvasEl!: ElementRef;
  customerSignatureNeeded!: boolean;
  customerSignaturePad!: CustomerSignaturePad;
  customerSignatureImg!: string;

  editor!: Editor;
  html = '';

  uploadLink = environment.upload_url;

  qr_code: string ="";

  constructor(
    public Jarwis: JarwisService,
    public repairService: RepairService,
    public userService: UserService,
    public designationService: DesignationService,
    public shockPointService: ShockPointService,
    public brandService: BrandService,
    public colorService: ColorService,
    public qrCodeService: QrCodeService,
    public repairerService: RepairerService,
    public clientService: ClientService,
    public insurerService: InsurerService,
    public vehicleService: VehicleService,
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

    this.editor = new Editor();

    this.dateNow = new Date();

    /** spinner starts on init */
    this.SpinnerService.show();

    this.getDesignations();
    this.getShockPoints();
    this.getBrands();
    this.getColors();
    this.getRepairers();
    this.getClients();
    this.getInsurers();
    this.getVehicles();
    this.getRemarks();
    this.getQrCode();

    this.getUserLogged();

    this.formGroupStep1 = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });

    this.formGroupStep2 = new FormGroup({
      client_name: new FormControl('', [Validators.required]),
    });

    this.formGroupStep3 = new FormGroup({
      license_plate: new FormControl('', [Validators.required]),
      brand: new FormControl('', [Validators.required]),
      model: new FormControl('', [Validators.required]),
      color: new FormControl('', [Validators.required]),
    });

    this.formGroupStep4 = new FormGroup({
      insurer_name: new FormControl('', [Validators.required]),
      disaster_number: new FormControl('', [Validators.required]),
    });

    this.formGroupStep5 = new FormGroup({
      shock_point_label: new FormControl('', [Validators.required]),
    });

    this.formGroupStep7 = new FormGroup({
      remark: new FormControl('', [Validators.required]),
    });

    this.designationFormGroup = new FormGroup({
      label: new FormControl('', [Validators.required]),
      // replacement: new FormControl('', [Validators.required]),
      // repair: new FormControl('', [Validators.required]),
      // paint: new FormControl('', [Validators.required]),
      // control: new FormControl('', [Validators.required]),
    });

    this.emailFormGroup = new FormGroup({
      insured_email: new FormControl('', [Validators.required]),
      // replacement: new FormControl('', [Validators.required]),
      // repair: new FormControl('', [Validators.required]),
      // paint: new FormControl('', [Validators.required]),
      // control: new FormControl('', [Validators.required]),
    });

  }

  ngAfterViewInit() {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
    this.expertSignaturePad = new ExpertSignaturePad(this.expertCanvasEl.nativeElement);
    this.repairerSignaturePad = new RepairerSignaturePad(this.repairerCanvasEl.nativeElement);
    this.customerSignaturePad = new CustomerSignaturePad(this.customerCanvasEl.nativeElement);
  }

  ngOnDestroy(): void {
    this.editor.destroy();
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

  hide_message() {
    this.exist_error = false;
    this.exist_success = false;
  }

  getUserLogged(){
    this.userService.getUserProfile().subscribe((data: any) => {
      this.user_logged = data.user_logged;
      this.expert_email = this.user_logged.email;
      this.saveExpertEmail();
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

  backClicked() {
    this._location.back();
  }

  get fStep1() { return this.formGroupStep1.controls; }
  validateStep1(){
    this.submittedStep1 = true;
    if (this.formGroupStep1.invalid) {
      return;

    } else {
      this.checkRepairerId();
      this.saveRepairerEmailFirst();
      this.step1 = !this.step1;
      this.step2 = !this.step2;
    }
  }

  get fStep2() { return this.formGroupStep2.controls; }
  validateStep2(){
    this.submittedStep2 = true;
    if (this.formGroupStep2.invalid) {
      return;

    } else {
      this.saveClient();
      this.step2 = !this.step2;
      this.step3 = !this.step3;
    }
  }

  get fStep3() { return this.formGroupStep3.controls; }
  validateStep3(){
    this.submittedStep3 = true;
    this.exist_vehicle = false;
    if (this.formGroupStep3.invalid) {
      return;

    } else {
      this.submitVehicle = true;
      this.vehicleService.getVehicleSearch(1,this.license_plate).subscribe((data: any) => {
        if((data.vehicles.data.length > 0) && (!this.vehicle_id)){
          this.exist_vehicle = true;
          this.submitVehicle = false;
        } else {
          this.exist_vehicle = false;
          if(this.vehicle_id){
            this.submitVehicle = false;
            this.checkVehicleId();
            this.step3 = !this.step3;
            this.step4 = !this.step4;
          } else {
            if(this.brand_id){
              this.brandService.getBrandById(this.brand_id).subscribe((brandData: any) => {

                if(this.color_id){
                  this.colorService.getColorById(this.color_id).subscribe((colorData: any) => {
                    this.submitVehicle = false;
                    this.brand_id = brandData.brand.id;
                    this.brand = brandData.brand.label;
                    this.color_id = colorData.color.id;
                    this.color = colorData.color.label;

                    this.step3 = !this.step3;
                    this.step4 = !this.step4;
                  });
                } else {
                  const formData = new FormData();
                  formData.append('label',this.color);

                  this.colorService.add(formData).subscribe((colorRes: any) => {
                    this.message = colorRes;
                    if(this.message.success == false){
                      this.submitVehicle = false;
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
                      this.cs.showToast(this.toast);
                    } else {
                      this.submitVehicle = false;
                      this.brand_id = brandData.brand.id;
                      this.brand = brandData.brand.label;
                      this.color_id = colorRes.color.id;
                      this.color = colorRes.color.label;

                      this.step3 = !this.step3;
                      this.step4 = !this.step4;
                      this.getColors();

                    }
                  },
                  (err: HttpErrorResponse) => {
                    this.exist_error = true;
                    this.error_message = err.error.message;
                    this.submitVehicle = false;
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
                    this.submitVehicle = false;
                    this.SpinnerService.hide();
                    this.cs.showToast(this.toast);
                  });
                }

              });
            } else {
              const formData = new FormData();
              formData.append('label',this.brand);

              this.brandService.add(formData).subscribe((brandRes: any) => {
                this.message = brandRes;
                if(this.message.success == false){
                  this.submitVehicle = false;
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
                  this.cs.showToast(this.toast);
                } else {

                  if(this.color_id){
                    this.colorService.getColorById(this.color_id).subscribe((colorData: any) => {
                      this.submitVehicle = false;
                      this.brand_id = brandRes.brand.id;
                      this.brand = brandRes.brand.label;
                      this.color_id = colorData.color.id;
                      this.color = colorData.color.label;

                      this.step3 = !this.step3;
                      this.step4 = !this.step4;

                      this.getBrands();

                    });
                  } else {
                    const formData = new FormData();
                    formData.append('label',this.color);

                    this.colorService.add(formData).subscribe((colorRes: any) => {
                      this.message = colorRes;
                      if(this.message.success == false){
                        this.submitVehicle = false;
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
                        this.cs.showToast(this.toast);
                      } else {
                        this.submitVehicle = false;
                        this.brand_id = brandRes.brand.id;
                        this.brand = brandRes.brand.label;
                        this.color_id = colorRes.color.id;
                        this.color = colorRes.color.label;

                        this.step3 = !this.step3;
                        this.step4 = !this.step4;

                        this.getBrands();
                        this.getColors();

                      }
                    },
                    (err: HttpErrorResponse) => {
                      this.exist_error = true;
                      this.error_message = err.error.message;
                      this.submitVehicle = false;
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
                      this.submitVehicle = false;
                      this.SpinnerService.hide();
                      this.cs.showToast(this.toast);
                    });
                  }

                }
              },
              (err: HttpErrorResponse) => {
                this.exist_error = true;
                this.error_message = err.error.message;
                this.submitVehicle = false;
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
                this.submitVehicle = false;
                this.SpinnerService.hide();
                this.cs.showToast(this.toast);
              });
            }
          }
        }
      });
    }
  }

  get fStep4() { return this.formGroupStep4.controls; }
  validateStep4(){
    this.submittedStep4 = true;
    if (this.formGroupStep4.invalid) {
      return;

    } else {
      this.saveClient();
      this.step4 = !this.step4;
      this.step5 = !this.step5;
    }
  }

  get fStep5() { return this.formGroupStep5.controls; }
  validateStep5(){
    this.submittedStep5 = true;
    if (this.formGroupStep5.invalid) {
      return;

    } else {
      if (this.shock_points.length > 0) {
        this.checkShockPointId();
        this.step5 = !this.step5;
        this.step6 = !this.step6;
        this.exist_shock_error = false;
      } else {
        this.exist_shock_error = true;
      }
    }
  }

  validateStep6(){
    if (this.works.length > 0) {
      this.step6 = !this.step6;
      this.step7 = !this.step7;
      this.exist_work_error = false;
    } else {
      this.exist_work_error = true;
    }
  }

  get fStep7() { return this.formGroupStep7.controls; }
  validateStep7(){
    this.submittedStep7 = true;
    if (this.formGroupStep7.invalid) {
      return;

    } else {
      if(this.emails.length < 2){
        this.saveRepairerEmail();
      }
      this.step7 = !this.step7;
      this.step8 = !this.step8;
    }
  }

  get fStep8() { return this.formGroupStep7.controls; }
  validateStep8(){
    if (this.emails.length < 1) {
      this.exist_email_error = true;
    }
    // else if(!this.repairerSignatureImg || !this.repairerSignatureImg){
    //   this.exist_signature_error = true;
    // }
    else {
      this.step8 = !this.step8;
      this.step9 = !this.step9;
      this.exist_email_error = false;
      this.exist_signature_error = false;
    }
  }

  startDrawing(event: Event) {
    // works in device not in browser
  }

  moved(event: Event) {
    // works in device not in browser
  }

  clearExpertPad() {
    this.expertSignaturePad.clear();
  }

  savePad() {
    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
    console.log('signatureImg',this.signatureImg);
    this.signatureNeeded = this.signaturePad.isEmpty();
    if (!this.signatureNeeded) {
      this.signatureNeeded = false;
    }
  }

  saveExpertPad() {
    const base64Data = this.expertSignaturePad.toDataURL();
    this.expertSignatureImg = base64Data;
    console.log('signatureImg',this.expertSignatureImg);
    this.expertSignatureNeeded = this.expertSignaturePad.isEmpty();
    if (!this.expertSignatureNeeded) {
      this.expertSignatureNeeded = false;
    }
  }

  clearRepairerPad() {
    this.repairerSignaturePad.clear();
  }

  saveRepairerPad() {
    const base64Data = this.repairerSignaturePad.toDataURL();
    this.repairerSignatureImg = base64Data;
    console.log('signatureImg',this.repairerSignatureImg);
    this.repairerSignatureNeeded = this.repairerSignaturePad.isEmpty();
    if (!this.repairerSignatureNeeded) {
      this.repairerSignatureNeeded = false;
    }
  }

  clearCustomerPad() {
    this.customerSignaturePad.clear();
  }

  saveCustomerPad() {
    const base64Data = this.customerSignaturePad.toDataURL();
    this.customerSignatureImg = base64Data;
    console.log('signatureImg',this.customerSignatureImg);
    this.customerSignatureNeeded = this.customerSignaturePad.isEmpty();
    if (!this.customerSignatureNeeded) {
      this.customerSignatureNeeded = false;
    }
  }

  getDesignations(){
    this.designationService.getAllDesignations().subscribe((data: any) => {
      this.listDesignation = data.designations;
    })
  }

  getShockPoints(){
    this.shockPointService.getAllShockPoints().subscribe((data: any) => {
      this.listShockPoint = data.shock_points;
    })
  }

  getQrCode(){
    this.qrCodeService.getOneQrCodes().subscribe((data: any) => {
      this.qr_code = data.qr_code.qr_code;
    })
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

  getRemarks(){
    this.repairService.getAllRepairRemark().subscribe((data: any) => {
      this.listRemark = data.repair_remarks;
    })
  }

  getRepairers(){
    this.repairerService.getAllRepairers().subscribe((data: any) => {
      this.listRepairer = data.repairers;
    })
  }

  getClients(){
    this.clientService.getAllClients().subscribe((data: any) => {
      this.listClient = data.clients;
    })
  }

  getInsurers(){
    this.insurerService.getAllInsurers().subscribe((data: any) => {
      this.listInsurer = data.insurers;
    })
  }

  getVehicles(){
    this.vehicleService.getAllVehicles().subscribe((data: any) => {
      this.listVehicle = data.vehicles;
      this.SpinnerService.hide();
    })
  }

  checkRepairerId(){
    console.log("this.phone",this.phone);
    if(this.repairer_id){
      this.getRepairerById(this.repairer_id);
    }
  }

  changeRepairer(event: any) {
    if(event){
      this.repairerService.getRepairerById(event).subscribe((data: any) => {
        if(data.repairer.name != 'null'){
          this.name = data.repairer.name;
        }
        if(data.repairer.email != 'null'){
          this.email = data.repairer.email;
          this.repairer_email = data.repairer.email;
        }
        if(data.repairer.phone != 'null'){
          this.phone = data.repairer.phone;
        }
      });
    }
  }

  changeClient(event: any) {
    if(event){
      this.clientService.getClientById(event).subscribe((data: any) => {
        if(data.client.name != 'null'){
          this.client_name = data.client.name;
        }
        if(data.client.email != 'null'){
          this.client_email = data.client.email;
        }
        if(data.client.phone != 'null'){
          this.client_phone = data.client.phone;
        }
      });
    }
  }

  changeInsurer(event: any) {
    if(event){
      this.insurerService.getInsurerById(event).subscribe((data: any) => {
        if(data.insurer.name != 'null'){
          this.insurer_name = data.insurer.name;
        }
        if(data.insurer.email != 'null'){
          this.insurer_email = data.insurer.email;
        }
        if(data.insurer.phone != 'null'){
          this.insurer_phone = data.insurer.phone;
        }
      });
    }
  }

  getRepairerById(repairer_id: any) {
    this.repairerService.getRepairerById(repairer_id).subscribe((data: any) => {
      if(data.repairer.name != 'null'){
        this.name = data.repairer.name;
      }
      if(data.repairer.email != 'null'){
        this.email = data.repairer.email;
        this.repairer_email = data.repairer.email;
      }
      if(data.repairer.phone != 'null'){
        this.phone = data.repairer.phone;
      }
    });
  }

  checkVehicleId(){
    if(this.vehicle_id){
      this.getVehicleById(this.vehicle_id);
    }
  }

  changeVehicle(event: any) {
    if(event){
      this.vehicleService.getVehicleById(event).subscribe((data: any) => {
        if(data.vehicle.license_plate != 'null'){
          this.license_plate = data.vehicle.license_plate;
        }
        if(data.vehicle.brand_id != 'null'){
          this.brand_id = data.vehicle.brand_id;
          this.brand = data.vehicle.brand_label;
        }
        if(data.vehicle.model != 'null'){
          this.model = data.vehicle.model;
        }
        if(data.vehicle.type != 'null'){
          this.type = data.vehicle.type;
        }
        if(data.vehicle.option != 'null'){
          this.option = data.vehicle.option;
        }
        if(data.vehicle.color_id != 'null'){
          this.color_id = data.vehicle.color_id;
          this.color = data.vehicle.color_label;
        }
        if(data.vehicle.mileage != 'null'){
          this.mileage = data.vehicle.mileage;
        }
      });
    }
  }

  getVehicleById(vehicle_id: any) {
    this.vehicleService.getVehicleById(vehicle_id).subscribe((data: any) => {
      if(data.vehicle.license_plate != 'null'){
        this.license_plate = data.vehicle.license_plate;
      }
      if(data.vehicle.brand_id != 'null'){
        this.brand_id = data.vehicle.brand_id;
        this.brand = data.vehicle.brand_label;
      }
      if(data.vehicle.model != 'null'){
        this.model = data.vehicle.model;
      }
      if(data.vehicle.type != 'null'){
        this.type = data.vehicle.type;
      }
      if(data.vehicle.option != 'null'){
        this.option = data.vehicle.option;
      }
      if(data.vehicle.color_id != 'null'){
        this.color_id = data.vehicle.color_id;
        this.color = data.vehicle.color_label;
      }
      if(data.vehicle.mileage != 'null'){
        this.mileage = data.vehicle.mileage;
      }
    });
  }

  checkShockPointId(){
    for( var i = 0; i < this.shock_points.length; i++){
      if(this.shock_points[i].shock_point_id){
        this.getShockPointById(this.shock_points[i].shock_point_id);
      }
    }
  }

  changeShockPoint(event: any) {
    if(event){
      this.shockPointService.getShockPointById(event).subscribe((data: any) => {
        if(data.shock_point.label != 'null'){
          this.shock_point_label = data.shock_point.label;
        }
      });
    }
  }

  getShockPointById(shock_point_id: any) {
    this.shockPointService.getShockPointById(shock_point_id).subscribe((data: any) => {
      if(data.shock_point.label != 'null'){
        this.shock_point_label = data.shock_point.label;
      }
    });
  }

  changeBrand(event: any) {
    if(event){
      this.brandService.getBrandById(event).subscribe((data: any) => {
        if(data.brand.label != 'null'){
          this.brand_id = data.brand.id;
          this.brand = data.brand.label;
        }
      });
    }
  }

  changeColor(event: any) {
    if(event){
      this.colorService.getColorById(event).subscribe((data: any) => {
        if(data.color.label != 'null'){
        this.color_id = data.color.id;
        this.color = data.color.label;
        }
      });
    }
  }

  changeDesignation(event: any) {
    if(event){
      this.designationService.getDesignationById(event).subscribe((data: any) => {
        if(data.designation.label != 'null'){
        this.designation_id = data.designation.id;
        this.label = data.designation.label;
        }
      });
    }
  }

  changeRemark(event: any) {
    if(event){
      this.remark = event;
    }
  }

  shockPointClick(item:any) {
    this.shockPointSelected = item;
  }

  designationClick(item:any) {
    this.designationSelected = item;
  }

  deleteShockPoint() {
    this.submitRemoveShockPoint = true;
    this.error_message = "";
    for( var i = 0; i < this.shock_points.length; i++){

      if(this.shock_points[i].shock_point_id == this.shockPointSelected.shock_point_id){
        console.log("Suppression du stock",this.shock_points[i].shock_point_id);
        this.shock_points.splice(i, 1);
        this.removeShockPoint = false;
        this.submitRemoveShockPoint = false;
        this.shock_point_id = null;
      }

    }
  }

  deleteWork() {
    this.submitRemoveWork = true;
    this.error_message = "";
    for( var i = 0; i < this.works.length; i++){

      if(this.works[i].designation_id == this.designationSelected.designation_id){
        console.log("Suppression du stock",this.works[i].designation_id);
        this.works.splice(i, 1);
        this.removeWork = false;
        this.submitRemoveWork = false;
        this.designation_id = null;
      }

    }
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
        this.insured_email = "";
      }

    }
  }

  changeReplacement(event: any) {
    this.replacement = event.target.value;
    console.log("event.target.value",event.target.value);
  }
  changeRepair(event: any) {
    this.repair = event.target.value;
  }
  changePaint(event: any) {
    this.paint = event.target.value;
  }
  changePlace(event: any) {
    this.control = event.target.value;
  }

  resetAll(){
    this.designationFormGroup.reset();
    this.shock_point_id = null;
    this.shock_point_label = "";
    this.designation_id = null;
    this.label = "";
    this.replacement = 0;
    this.repair = 0;
    this.paint = 0;
    this.control = 0;
  }

  get fShock() { return this.formGroupStep5.controls; }

  saveShockPoint(){
    this.error_message = "";
    this.submittedShockPoint = true;
    this.exist_work_error = false;

    if (this.formGroupStep5.invalid) {
      return;

    } else {
      this.submitAddShockPoint = true;
      if(this.shock_point_id){
        this.shockPointService.getShockPointById(this.shock_point_id).subscribe((data: any) => {
          for( var i = 0; i < this.shock_points.length; i++){

            if(this.shock_points[i].shock_point_id == this.shock_point_id){
              this.shock_point_label = data.shock_point.label;
              this.exist = true;
              this.submitAddShockPoint = false;
            } else {
              this.exist = false;
            }
          }

          if(this.exist == false){
            const newShockPoint = new ShockPoint();
            newShockPoint.shock_point_id = this.shock_point_id;
            newShockPoint.shock_point_label = data.shock_point.label;
            newShockPoint.works = [];
            this.shock_points.push(newShockPoint);
            this.submitAddShockPoint = false;
            this.addShockPoint = false;
            this.shock_point_id = null;
          }
          this.resetAll();
        });
      } else {
        const formData = new FormData();
        formData.append('label',this.shock_point_label);

        this.shockPointService.add(formData).subscribe((res: any) => {
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
            this.cs.showToast(this.toast);
          } else {
            for( var i = 0; i < this.shock_points.length; i++){

              if(this.shock_points[i].shock_point_id == res.shock_point.id){
                this.shock_point_label = res.shock_point.label;
                this.exist = true;
                this.submitAddShockPoint = false;
              } else {
                this.exist = false;
              }
            }

            if(this.exist == false){
              const newShockPoint = new ShockPoint();
              newShockPoint.shock_point_id = res.shock_point.id;
              newShockPoint.shock_point_label = res.shock_point.label;
              newShockPoint.works = [];
              this.shock_points.push(newShockPoint);
              this.submitAddShockPoint = false;
              this.addShockPoint = false;
              this.shock_point_id = null;
            }
            this.resetAll();
            this.getShockPoints();
          }
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

  get fWork() { return this.designationFormGroup.controls; }

  saveWork(item:any){
    this.error_message = "";
    this.submittedWork = true;
    this.exist_work_error = false;

    if (this.designationFormGroup.invalid) {
      return;

    } else {
      this.submitAddWork = true;
      if(this.designation_id){
        this.designationService.getDesignationById(this.designation_id).subscribe((data: any) => {
          for( var i = 0; i < this.works.length; i++){

            if(this.works[i].designation_id == this.designation_id){
              this.label = data.designation.label;
              this.exist = true;
              this.submitAddWork = false;
            } else {
              this.exist = false;
            }
          }

          if(this.exist == false){
            const newWork = new RepairWork();
            newWork.designation_id = this.designation_id;
            newWork.designation_label = data.designation.label;
            newWork.replacement = this.replacement;
            newWork.repair = this.repair;
            newWork.paint = this.paint;
            newWork.control = this.control;
            this.works.push(newWork);

            for( var i = 0; i < this.shock_points.length; i++){
              if(this.shock_points[i].shock_point_id == item.shock_point_id){
                this.shock_points[i].works.push(newWork);
              }
            }

            for( var i = 0; i < this.shock_points.length; i++){
              if(this.shock_points[i].shock_point_id == item.shock_point_id){
                const newShock = new Shock();
                newShock.shock_point_id = this.shock_points[i].shock_point_id;
                newShock.shock_point_label = this.shock_points[i].shock_point_label;
                newShock.works = newWork;
                this.shocks.push(newShock);
              }
            }
            this.submitAddWork = false;
            this.addWork = false;
          }
          console.log("aert",this.shock_points);
          console.log("aert",this.shocks);
          this.resetAll();
        });
      } else {
        const formData = new FormData();
        formData.append('label',this.label);

        this.designationService.add(formData).subscribe((res: any) => {
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
            this.cs.showToast(this.toast);
          } else {
            for( var i = 0; i < this.works.length; i++){

              if(this.works[i].designation_id == res.designation.id){
                this.label = res.designation.label;
                this.exist = true;
                this.submitAddWork = false;
              } else {
                this.exist = false;
              }
            }

            if(this.exist == false){
              const newWork = new RepairWork();
              newWork.designation_id = res.designation.id;
              newWork.designation_label = res.designation.label;
              newWork.replacement = this.replacement;
              newWork.repair = this.repair;
              newWork.paint = this.paint;
              newWork.control = this.control;
              this.works.push(newWork);
              this.submitAddWork = false;
              this.addWork = false;

              for( var i = 0; i < this.shock_points.length; i++){
                if(this.shock_points[i].shock_point_id == item.shock_point_id){
                  this.shock_points[i].works.push(newWork);
                }
              }

              for( var i = 0; i < this.shock_points.length; i++){
                if(this.shock_points[i].shock_point_id == item.shock_point_id){
                  const newShock = new Shock();
                  newShock.shock_point_id = this.shock_points[i].shock_point_id;
                  newShock.shock_point_label = this.shock_points[i].shock_point_label;
                  newShock.works = newWork;
                  this.shocks.push(newShock);
                }
              }
            }
            console.log("aert",this.shock_points);
            console.log("aert",this.shocks);
            this.resetAll();
            this.getDesignations();
          }
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

  get fEmail() { return this.emailFormGroup.controls; }

  saveRepairerEmailFirst(){
    this.exist_email_error = false;
    if(this.email){
      const newEmail = new Email();
      newEmail.email = this.email.toLowerCase();
      this.emails.push(newEmail);
    }
    this.existEmail = false;
  }

  saveClient(){
    this.exist_email_error = false;
    if(this.client_email){
      const newEmail = new Email();
      newEmail.email = this.client_email.toLowerCase();
      this.emails.push(newEmail);
    }
    this.existEmail = false;
  }

  saveRepairerEmail(){
    this.exist_email_error = false;

    if(this.repairer_email){
      for( var i = 0; i < this.emails.length; i++){
        if(this.emails[i].email == this.repairer_email.toLowerCase()){
          this.existEmail = true;
        } else {
          this.existEmail = false;
        }
      }

      if(this.existEmail == false){
        const newEmail = new Email();
        newEmail.email = this.repairer_email.toLowerCase();
        this.emails.push(newEmail);
        this.addEmail = false;
      }
    }

    this.existEmail = false;
  }

  saveExpertEmail(){
    this.exist_email_error = false;

    if(this.expert_email){
      console.log("ert",this.expert_email);
      for( var i = 0; i < this.emails.length; i++){
        if(this.emails[i].email == this.expert_email.toLowerCase()){
          this.existEmail = true;
        } else {
          this.existEmail = false;
        }
      }

      if(this.existEmail == false){
        const newEmail = new Email();
        newEmail.email = this.expert_email.toLowerCase();
        this.emails.push(newEmail);
        this.addEmail = false;
      }
    }

    this.existEmail = false;
    console.log("ert",this.emails);
  }

  saveEmail(){
    this.error_message = "";
    this.submittedEmail = true;
    this.exist_email_error = false;

    if (this.emailFormGroup.invalid) {
      return;

    } else {
      this.submitAddEmail = true;
      for( var i = 0; i < this.emails.length; i++){

        if(this.emails[i].email == this.insured_email.toLowerCase()){
          this.existEmail = true;
          this.submitAddEmail = false;
        } else {
          this.existEmail = false;
        }
      }

      if(this.existEmail == false){
        const newEmail = new Email();
        newEmail.email = this.insured_email.toLowerCase();
        this.emails.push(newEmail);
        this.submitAddEmail = false;
        this.addEmail = false;
        this.insured_email = "";
      }
    }
  }

  save(){
    this.submitted = true;
    this.submit = true;
      if(!this.repairer_id && !this.vehicle_id && !this.shock_point_id){
        console.log("1");
        this.save_with_new_repairer_and_new_vehicle_and_new_shock_point();
      }  else if(!this.repairer_id && !this.vehicle_id){
        console.log("2");
        this.save_with_new_repairer_and_new_vehicle();
      } else if(!this.repairer_id && !this.shock_point_id){
        console.log("3");
        this.save_with_new_repairer_and_new_shock_point();
      } else if(!this.vehicle_id && !this.shock_point_id){
        console.log("4");
        this.save_with_new_vehicle_and_new_shock_point();
      } else if(!this.repairer_id){
        console.log("5");
        this.save_with_new_repairer();
      } else if(!this.vehicle_id){
        console.log("6");
        this.save_with_new_vehicle();
      // } else if(!this.shock_point_id){
      //  console.log("7");
      //  this.save_with_new_shock_point();
      } else {
        console.log("8");
        this.save_without_new_repairer_and_new_vehicle_and_new_shock_point();
      }
  }

  save_without_new_repairer_and_new_vehicle_and_new_shock_point(){
    const repair = new Repair();
    repair.repairer_id = this.repairer_id;
    repair.vehicle_id = this.vehicle_id;
    repair.shock_point_id = this.shock_point_id;
    repair.remark = this.remark;
    repair.amount = this.amount;
    repair.expert_signature = this.expertSignatureImg;
    repair.repairer_signature = this.repairerSignatureImg;
    repair.customer_signature = this.customerSignatureImg;
    repair.shock_points = this.shock_points;
    repair.emails = this.emails;
    repair.client_name = this.client_name;
    repair.client_email = this.client_email;
    repair.client_phone = this.client_phone;
    repair.insurer_name = this.insurer_name;
    repair.insurer_email = this.insurer_email;
    repair.insurer_phone = this.insurer_phone;
    repair.disaster_number = this.disaster_number;

    this.repairService.add(repair).subscribe(res => {
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
        this.router.navigate(['/list-repair']);
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

  save_with_new_repairer_and_new_vehicle_and_new_shock_point(){
    const formData = new FormData();
    formData.append('name',this.name);
    formData.append('address',this.address);
    formData.append('phone',this.phone);
    formData.append('email',this.email.toLowerCase());
    formData.append('responsible_first_name',this.responsible_first_name);
    formData.append('responsible_last_name',this.responsible_last_name);

    console.log("",);

    this.repairerService.add(formData).subscribe((repairer_res: any) => {
      this.message = repairer_res;
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
        this.cs.showToast(this.toast);
      } else {
        const formData = new FormData();
        formData.append('license_plate',this.license_plate);
        formData.append('brand_id',this.brand_id);
        formData.append('model',this.model);
        formData.append('type',this.type);
        formData.append('option',this.option);
        formData.append('color_id',this.color_id);
        formData.append('mileage',this.mileage);

        this.vehicleService.add(formData).subscribe((vehicle_res: any) => {
          this.message = vehicle_res;
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
            this.cs.showToast(this.toast);
          } else {
            const formData = new FormData();
            formData.append('label',this.shock_point_label);

            this.shockPointService.add(formData).subscribe((shock_point_res: any) => {
              this.message = shock_point_res;
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
                this.cs.showToast(this.toast);
              } else {
                const repair = new Repair();
                repair.repairer_id = repairer_res.repairer.id;
                repair.vehicle_id = vehicle_res.vehicle.id;
                repair.shock_point_id = shock_point_res.shock_point.id;
                repair.remark = this.remark;
                repair.amount = this.amount;
                repair.expert_signature = this.expertSignatureImg;
                repair.repairer_signature = this.repairerSignatureImg;
                repair.customer_signature = this.customerSignatureImg;
                repair.shock_points = this.shock_points;
                repair.emails = this.emails;
                repair.client_name = this.client_name;
                repair.client_email = this.client_email;
                repair.client_phone = this.client_phone;
                repair.insurer_name = this.insurer_name;
                repair.insurer_email = this.insurer_email;
                repair.insurer_phone = this.insurer_phone;
                repair.disaster_number = this.disaster_number;

                this.repairService.add(repair).subscribe(res => {
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
                    this.router.navigate(['/list-repair']);
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

  save_with_new_repairer_and_new_vehicle(){
    const formData = new FormData();
    formData.append('name',this.name);
    formData.append('address',this.address);
    formData.append('phone',this.phone);
    formData.append('email',this.email.toLowerCase());
    formData.append('responsible_first_name',this.responsible_first_name);
    formData.append('responsible_last_name',this.responsible_last_name);

    this.repairerService.add(formData).subscribe((repairer_res: any) => {
      this.message = repairer_res;
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
        this.cs.showToast(this.toast);
      } else {
        const formData = new FormData();
        formData.append('license_plate',this.license_plate);
        formData.append('brand_id',this.brand_id);
        formData.append('model',this.model);
        formData.append('type',this.type);
        formData.append('option',this.option);
        formData.append('color_id',this.color_id);
        formData.append('mileage',this.mileage);

        this.vehicleService.add(formData).subscribe((vehicle_res: any) => {
          this.message = vehicle_res;
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
            this.cs.showToast(this.toast);
          } else {
            const repair = new Repair();
            repair.repairer_id = repairer_res.repairer.id;
            repair.vehicle_id = vehicle_res.vehicle.id;
            repair.shock_point_id = this.shock_point_id;
            repair.remark = this.remark;
            repair.amount = this.amount;
            repair.expert_signature = this.expertSignatureImg;
            repair.repairer_signature = this.repairerSignatureImg;
            repair.customer_signature = this.customerSignatureImg;
            repair.shock_points = this.shock_points;
            repair.emails = this.emails;
            repair.client_name = this.client_name;
            repair.client_email = this.client_email;
            repair.client_phone = this.client_phone;
            repair.insurer_name = this.insurer_name;
            repair.insurer_email = this.insurer_email;
            repair.insurer_phone = this.insurer_phone;
            repair.disaster_number = this.disaster_number;

            this.repairService.add(repair).subscribe(res => {
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
                this.router.navigate(['/list-repair']);
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

  save_with_new_repairer_and_new_shock_point(){
    const formData = new FormData();
    formData.append('name',this.name);
    formData.append('address',this.address);
    formData.append('phone',this.phone);
    formData.append('email',this.email.toLowerCase());
    formData.append('responsible_first_name',this.responsible_first_name);
    formData.append('responsible_last_name',this.responsible_last_name);

    this.repairerService.add(formData).subscribe((repairer_res: any) => {
      this.message = repairer_res;
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
        this.cs.showToast(this.toast);
      } else {
        const formData = new FormData();
        formData.append('label',this.shock_point_label);

        this.shockPointService.add(formData).subscribe((shock_point_res: any) => {
          this.message = shock_point_res;
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
            this.cs.showToast(this.toast);
          } else {
            const repair = new Repair();
            repair.repairer_id = repairer_res.repairer.id;
            repair.vehicle_id = this.vehicle_id;
            repair.shock_point_id = shock_point_res.shock_point.id;
            repair.remark = this.remark;
            repair.amount = this.amount;
            repair.expert_signature = this.expertSignatureImg;
            repair.repairer_signature = this.repairerSignatureImg;
            repair.customer_signature = this.customerSignatureImg;
            repair.shock_points = this.shock_points;
            repair.emails = this.emails;
            repair.client_name = this.client_name;
            repair.client_email = this.client_email;
            repair.client_phone = this.client_phone;
            repair.insurer_name = this.insurer_name;
            repair.insurer_email = this.insurer_email;
            repair.insurer_phone = this.insurer_phone;
            repair.disaster_number = this.disaster_number;

            this.repairService.add(repair).subscribe(res => {
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
                this.router.navigate(['/list-repair']);
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

  save_with_new_vehicle_and_new_shock_point(){
    const formData = new FormData();
    formData.append('license_plate',this.license_plate);
    formData.append('brand_id',this.brand_id);
    formData.append('model',this.model);
    formData.append('type',this.type);
    formData.append('option',this.option);
    formData.append('color_id',this.color_id);
    formData.append('mileage',this.mileage);

    this.vehicleService.add(formData).subscribe((vehicle_res: any) => {
      this.message = vehicle_res;
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
        this.cs.showToast(this.toast);
      } else {
        const formData = new FormData();
        formData.append('label',this.shock_point_label);

        this.shockPointService.add(formData).subscribe((shock_point_res: any) => {
          this.message = shock_point_res;
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
            this.cs.showToast(this.toast);
          } else {
            const repair = new Repair();
            repair.repairer_id = this.repairer_id;
            repair.vehicle_id = vehicle_res.vehicle.id;
            repair.shock_point_id = shock_point_res.shock_point.id;
            repair.remark = this.remark;
            repair.amount = this.amount;
            repair.expert_signature = this.expertSignatureImg;
            repair.repairer_signature = this.repairerSignatureImg;
            repair.customer_signature = this.customerSignatureImg;
            repair.shock_points = this.shock_points;
            repair.emails = this.emails;
            repair.client_name = this.client_name;
            repair.client_email = this.client_email;
            repair.client_phone = this.client_phone;
            repair.insurer_name = this.insurer_name;
            repair.insurer_email = this.insurer_email;
            repair.insurer_phone = this.insurer_phone;
            repair.disaster_number = this.disaster_number;

            this.repairService.add(repair).subscribe(res => {
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
                this.router.navigate(['/list-repair']);
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

  save_with_new_repairer(){
    const formData = new FormData();
    formData.append('name',this.name);
    formData.append('address',this.address);
    formData.append('phone',this.phone);
    formData.append('email',this.email.toLowerCase());
    formData.append('responsible_first_name',this.responsible_first_name);
    formData.append('responsible_last_name',this.responsible_last_name);

    this.repairerService.add(formData).subscribe((repairer_res: any) => {
      this.message = repairer_res;
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
        this.cs.showToast(this.toast);
      } else {
        const repair = new Repair();
        repair.repairer_id = repairer_res.repairer.id;
        repair.vehicle_id = this.vehicle_id;
        repair.shock_point_id = this.shock_point_id;
        repair.remark = this.remark;
        repair.amount = this.amount;
        repair.expert_signature = this.expertSignatureImg;
        repair.repairer_signature = this.repairerSignatureImg;
        repair.customer_signature = this.customerSignatureImg;
        repair.shock_points = this.shock_points;
        repair.emails = this.emails;
        repair.client_name = this.client_name;
        repair.client_email = this.client_email;
        repair.client_phone = this.client_phone;
        repair.insurer_name = this.insurer_name;
        repair.insurer_email = this.insurer_email;
        repair.insurer_phone = this.insurer_phone;
        repair.disaster_number = this.disaster_number;

        this.repairService.add(repair).subscribe(res => {
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
            this.router.navigate(['/list-repair']);
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



  save_with_new_vehicle(){
    const formData = new FormData();
    formData.append('license_plate',this.license_plate);
    formData.append('brand_id',this.brand_id);
    formData.append('model',this.model);
    formData.append('type',this.type);
    formData.append('option',this.option);
    formData.append('color_id',this.color_id);
    formData.append('mileage',this.mileage);

    this.vehicleService.add(formData).subscribe((vehicle_res: any) => {
      this.message = vehicle_res;
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
        this.cs.showToast(this.toast);
      } else {
        const repair = new Repair();
        repair.repairer_id = this.repairer_id;
        repair.vehicle_id = vehicle_res.vehicle.id;
        repair.shock_point_id = this.shock_point_id;
        repair.remark = this.remark;
        repair.amount = this.amount;
        repair.expert_signature = this.expertSignatureImg;
        repair.repairer_signature = this.repairerSignatureImg;
        repair.customer_signature = this.customerSignatureImg;
        repair.shock_points = this.shock_points;
        repair.emails = this.emails;
        repair.client_name = this.client_name;
        repair.client_email = this.client_email;
        repair.client_phone = this.client_phone;
        repair.insurer_name = this.insurer_name;
        repair.insurer_email = this.insurer_email;
        repair.insurer_phone = this.insurer_phone;
        repair.disaster_number = this.disaster_number;

        this.repairService.add(repair).subscribe(res => {
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
            this.router.navigate(['/list-repair']);
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

  save_with_new_shock_point(){
    const formData = new FormData();
    formData.append('label',this.shock_point_label);

    this.shockPointService.add(formData).subscribe((shock_point_res: any) => {
      this.message = shock_point_res;
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
        this.cs.showToast(this.toast);
      } else {
        const repair = new Repair();
        repair.repairer_id = this.repairer_id;
        repair.vehicle_id = this.vehicle_id;
        repair.shock_point_id = shock_point_res.shock_point.id;
        repair.remark = this.remark;
        repair.amount = this.amount;
        repair.expert_signature = this.expertSignatureImg;
        repair.repairer_signature = this.repairerSignatureImg;
        repair.customer_signature = this.customerSignatureImg;
        repair.shock_points = this.shock_points;
        repair.emails = this.emails;
        repair.client_name = this.client_name;
        repair.client_email = this.client_email;
        repair.client_phone = this.client_phone;
        repair.insurer_name = this.insurer_name;
        repair.insurer_email = this.insurer_email;
        repair.insurer_phone = this.insurer_phone;
        repair.disaster_number = this.disaster_number;

        this.repairService.add(repair).subscribe(res => {
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
            this.router.navigate(['/list-repair']);
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
