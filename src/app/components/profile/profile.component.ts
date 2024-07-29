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

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user_logged_name!: any;
  user_logged_email!: any;
  user_logged_entityfirm_name!: any;

  toast!: toastPayload;
  message:any;
  error_message: any;
  exist_error:boolean = false;
  success_message: any;
  exist_success:boolean = false;

  user_logged!: any;
  userprofile_id!:number;

  token!: any;
  decode_token!: any;
  user_logged_id!: any;
  user_logged_profile_name!: any;

  open = false;

  constructor(
    public userService: UserService,
    public Jarwis: JarwisService,
    private route:ActivatedRoute,
    private Auth: AuthService,
    private router:Router,
    private Token: TokenService,
    private headers: HeadersService,
    private _formBuilder: FormBuilder,
    private cs: CommonService,
    private _location: Location,
    private SpinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getUserLogged();
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

  logout() {
    this.Token.remove();
    this.Auth.changeAuthStatus(false);
    this.toast = {
      message: "Déconnecté(e) avec succès !",
      title: 'Information',
      type: 'info',
      ic: {
        timeOut: 5000,
        closeButton: true,
        progressBar: true,
      } as GlobalConfig,
    };
    this.cs.showToast(this.toast);
    this.router.navigate(['/login']);
  }

  onOpen(){
    if(!this.open){
      this.open = true;
    } else {
      this.open = false;
    }
  }

}
