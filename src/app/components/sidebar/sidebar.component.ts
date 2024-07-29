import { Component, OnInit } from '@angular/core';
import { HeadersService } from 'src/app/services/headers.servive';
import { JarwisService } from 'src/app/services/jarwis.service';
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/services/common.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/services/app-content/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  t_accueil: string = "Votre tableau de bord";
  t_attestation_edite: string = "Liste des attestations éditées pour le compte de votre entité";
  t_stock_cima: string = "Vos stocks d’attestations CIMA disponibles";
  t_stock_pool_tpv: string = "Vos stocks d’attestations POOL TPV disponibles";
  t_nouvelle_demande_edition: string = "Effectuer une nouvelle demande d'édition d’attestation";
  t_liste_demande_edition_a_finaliser: string = "Liste de vos demandes d'édition d’attestation à finaliser";
  t_historique_demande_edition: string = "Historique de vos demandes d'édition d’attestation";
  t_nouvelle_commande_cima: string = "Effectuer une nouvelle commande d’attestation CIMA";
  t_nouvelle_commande_pool_tpv: string = " Effectuer une nouvelle commande d’attestation POOL TPV";
  t_commande_en_attente_de_traitement: string = "Vos commandes en attente traitement par les compagnies";
  t_commande_en_attente_de_confirmation: string = "Vos commandes en attente de confirmation par votre entité";
  t_historique_commande: string = "Historique de vos commandes";
  t_bureau: string = "Liste de vos bureaux et représentation";
  t_rattachement: string = "Liste de vos rattachements";
  t_compte_utilisateur: string = "Liste des utilisateurs de votre entité";
  t_compte_ftp: string = "La configuration FTP pour la reception des attestations digitales sur votre FTP";


  user_logged!: any;
  userprofile_id!:number;

  token!: any;
  decode_token!: any;
  user_logged_id!: any;
  user_logged_name!: any;
  user_logged_profile_name!: any;
  user_logged_profile_id!: number;

  toast!: toastPayload;

  activeDropdown!: any;

  _x_menu = '"vertical"';
  _menu!: string;


  constructor(
              public userService: UserService,
              private herdersService: HeadersService,
              private cs: CommonService,
              public Jarwis: JarwisService,
              private Auth: AuthService,
              private router:Router,
              private Token: TokenService,) { }

  ngOnInit(): void {

    this._menu = `${localStorage.getItem('_x_menu')}`;
    this._menu = this._menu.substring(1);
    this._menu = this._menu.substring(0,this._menu.length - 1);
    //console.log("this._menu",this._menu);

    this.ifUserLogged();

	  this.getUserLogged();

  }

  ifUserLogged(){
    if(!this.Token.loggedIn()){
      this.router.navigate(['/login']);
    }
  }

  getUserLogged(){
    this.userService.getUserProfile().subscribe((data: any) => {

      if(data.success == false){

        this.logout();

      } else {

        this.user_logged = data.user_logged;

        console.log("gggg",this.user_logged);

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
    this.router.navigate(['/login']);
  }

  changeMenu(){
    if(this._x_menu == '"horizontal"'){
      localStorage.setItem('_x_menu', '"vertical"');
      this.ngOnInit();
    } else {
      localStorage.setItem('_x_menu', '"horizontal"');
      this.ngOnInit();
    }
  }

  sidebarToggle(){
    (window as any).Alpine.store('app').toggleSidebar();
  }
}
