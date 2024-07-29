import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JarwisService } from 'src/app/services/jarwis.service';
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/services/auth.service';
import { AccessService } from 'src/app/services/access.service';
import { GlobalConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/services/common.service'
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/services/app-content/user.service';
import jwt_decode from "jwt-decode";
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form = {
    username: null,
    password: null
  };

  email!: string;
  user_username!: string;
  user_password!: string;

  public error = null;

  message:any;
  message_bnicb:any;
  toast!: toastPayload;

  api_error_message: any;
  api_error_exist: boolean = false;
  error_message: any;
  error_exist: boolean = false;
  success_message: any;
  success_exist: boolean = false;

  forgotPassword: boolean = false;

  click: boolean = false;
  show: boolean = false;

  token!: any;
  decode_token!: any;

  submit: boolean = false;
  submit_forgot_password: boolean = false;

  submit_otp_code: boolean = false;

  user_logged!: any;
  captcha?: string;
  recaptcha_token!: string;

  formGroup!: FormGroup;
  submitted = false;

  generated_token = false;
  otp_id!: string;
  otp_code!: string;

  emailSent: boolean = false;
  
  counter:number = 120;

  expirationCounter!: string;


  constructor(private Jarwis: JarwisService,
    public userSevice: UserService,
    private Token: TokenService,
    private Access: AccessService,
    private _formBuilder: FormBuilder,
    private router: Router,
    private Auth: AuthService,
    private cs: CommonService) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      user_password: new FormControl('', [Validators.required]),
      //recaptcha_token: new FormControl('', [Validators.required]),
    });

  }

  startTimer(secsToStart:number): void {
    var start: number = secsToStart;
    var h: number;
    var m: number;
    var s: number;
    var temp: number;
    var timer: any = setInterval(() =>
    {
      this.counter = this.counter - 1;
      h = Math.floor(start / 60 / 60)
      // remove the hours
      temp = start - h * 60 * 60;
      m = Math.floor(temp / 60);
      // remove the minuets
      temp = temp - m * 60;
      // what left is the seconds
      s = temp;

      // add leading zeros for aesthetics
      var hour = h < 10 ? "0" + h : h;
      var minute = m < 10 ? "0" + m : m;
      var second = s < 10 ? "0" + s : s;

      this.expirationCounter = hour + ":" + minute + ":" + second;

      if (start <= 0) {
          // Time elapsed
          clearInterval(timer);
          this.expirationCounter = "Expired";
          // Make here changes in gui when time elapsed
          //....
      }
      start--;
    }, 1000)
  }


  hide_message() {
    this.error_exist = false;
  }

  password() {
    this.show = !this.show;
  }

  submitForgotPassword() {
    if(this.email){
      this.submit_forgot_password = true;

      const formData:any = new FormData();

      formData.append("email",this.email);
      formData.append("password",this.user_password);

      this.userSevice.resetPassword(formData).subscribe(res => {
        this.submit_forgot_password = !this.submit_forgot_password;
        this.message = res;
        if(this.message.success == false){
          this.error_exist = true;
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
          this.submit_forgot_password = !this.submit_forgot_password;
          this.forgotPassword = false;
          this.success_exist = true;
          this.success_message = "Votre compte a bien été réinitialisé et vos nouveaux accès vous ont été envoyés sur votre adresse e-mail.";
          this.toast = {
            message: "Compte réinitialisé avec succès !",
            title: 'Succès',
            type: 'success',
            ic: {
              timeOut: 2500,
              closeButton: true,
              progressBar: true,
            } as GlobalConfig,
          };
          this.cs.showToast(this.toast);
        }
      },
      (err: HttpErrorResponse) => {
        this.submit_forgot_password = !this.submit_forgot_password;
        this.api_error_exist = true;
        this.api_error_message = err.error.errors;
        this.toast = {
          message: "Erreur d'authentification",
          title: 'Erreur',
          type: 'error',
          ic: {
            timeOut: 5000,
            closeButton: true,
            progressBar: true,
          } as GlobalConfig,
        };
        this.cs.showToast(this.toast);
      });
    }
  }

  get f() { return this.formGroup.controls; }

  onSubmit() {
    this.submit = true;

    const formData:any = new FormData();

    formData.append("email",this.email);
    formData.append("password",this.user_password);

    this.Jarwis.login(formData).subscribe(res => {
      this.submit = !this.submit;
      this.message = res;
      if(this.message.success == false){
        this.error_exist = true;
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
        this.submit = true;
        this.handleResponse(res);
        //this.Jarwis.storeUser().subscribe(() => this.router.navigate(['/']));
      }
    },
    (err: HttpErrorResponse) => {
      this.submit = !this.submit;
      this.api_error_exist = true;
      this.api_error_message = err.error.errors;
      this.toast = {
        message: "Erreur d'authentification",
        title: 'Erreur',
        type: 'error',
        ic: {
          timeOut: 5000,
          closeButton: true,
          progressBar: true,
        } as GlobalConfig,
      };
      this.cs.showToast(this.toast);
    });
  }

  handleResponse(data:any) {
    this.Token.handle(data.token);
    this.Auth.changeAuthStatus(true);
    this.router.navigate(['/']);
    this.toast = {
      message: "Authentifié(e) avec succès",
      title: 'Succès',
      type: 'success',
      ic: {
        timeOut: 2500,
        closeButton: true,
        progressBar: true,
      } as GlobalConfig,
    };
    this.cs.showToast(this.toast);
  }

  // handleResponse() {
  //   this.userPeopleService.getUserPeopleProfile().subscribe((data: any) => {
  //     this.user_logged = data.data;
  //     localStorage.setItem('role', this.user_logged.role.name);
  //     this.Auth.changeAuthStatus(true);
  //     this.toast = {
  //       message: "Authentifi(é) avec succès",
  //       title: 'Succès',
  //       type: 'success',
  //       ic: {
  //         timeOut: 5000,
  //         closeButton: true,
  //         progressBar: true,
  //       } as GlobalConfig,
  //     };
  //     this.cs.showToast(this.toast);
  //     this.router.navigate(['/']);
  //   });
    
  // }

  // recaptcha(){
  //   grecaptcha.enterprise.ready(async () => {
	// 		const token = await grecaptcha.enterprise.execute('6LfwAD0pAAAAADfdckGpSh2_RijCEzQkTWMjw4-B', {action: 'LOGIN'});
	// 	  });
  // }

}
