import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JarwisService } from 'src/app/services/jarwis.service';
import { GlobalConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/services/common.service';
import { NgxSpinnerService } from "ngx-spinner"; 
import {Location} from '@angular/common';
import { AssignmentService } from 'src/app/services/app-content/assignment.service';
import { Assignment } from 'src/app/models/assignment.model';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/app-content/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user_logged!: any;
  nb_assignments!: number;
  nb_assignment_non_traite!: number;
  nb_assignment_en_attente_de_rapport!: number;
  nb_assignment_traite!: number;
  nb_repairs!: number;
  nb_repairers!: number;
  nb_vehicles!: number;
  nb_shock_points!: number;
  nb_designations!: number;
  nb_users!: number;

  toast!: toastPayload;


  constructor(
    public assignmentService: AssignmentService,
    public userService: UserService,
    public Jarwis: JarwisService,
    private route:ActivatedRoute,
    private router:Router,
    private Auth: AuthService,
    private Token: TokenService,
    private _formBuilder: FormBuilder,
    private cs: CommonService,
    private _location: Location,
    private SpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {

    registerLocaleData( fr,'fr-FR' );

    this.SpinnerService.show();

    // if (!localStorage.getItem('reload')) { 
    //   localStorage.setItem('reload', 'no reload') 
    //   location.reload() 
    // } else {
    //   localStorage.removeItem('reload') 
    // }

    this.getUserLogged();

  }

  getUserLogged(){  
    this.userService.getUserProfile().subscribe((data: any) => {
  
      if(data.success == false){
    
        this.logout();
    
      } else {

        this.SpinnerService.hide();
    
        this.user_logged = data.user_logged;
        this.nb_assignments = data.nb_assignments;
        this.nb_assignment_non_traite = data.nb_assignment_non_traite;
        this.nb_assignment_en_attente_de_rapport = data.nb_assignment_en_attente_de_rapport;
        this.nb_assignment_traite = data.nb_assignment_traite;
        this.nb_repairs = data.nb_repairs;
        this.nb_repairers = data.nb_repairers;
        this.nb_vehicles = data.nb_vehicles;
        this.nb_shock_points = data.nb_shock_points;
        this.nb_designations = data.nb_designations;
        this.nb_users = data.nb_users;
    
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
      message: "Déconnecté(s) avec succès !",
      title: 'Information',
      type: 'info',
      ic: {
        timeOut: 5000,
        closeButton: true,
        progressBar: true,
      } as GlobalConfig,
    };
    //this.cs.showToast(this.toast);
    this.router.navigate(['/login']);
  }

}
