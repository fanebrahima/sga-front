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
import { ShockPointService } from 'src/app/services/app-content/shock-point.service';
import { ShockPoint } from 'src/app/models/shock-point.model';


@Component({
  selector: 'app-list-shock-point',
  templateUrl: './list-shock-point.component.html',
  styleUrls: ['./list-shock-point.component.css']
})
export class ListShockPointComponent implements OnInit {

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
        "id": "40",
        "label": "ARRIERE"
    },
    {
        "id": "185",
        "label": "ARRIERE / AVANT"
    },
    {
        "id": "141",
        "label": "ARRIÈRE DE FACE"
    },
    {
        "id": "46",
        "label": "ARRIERE DROIT"
    },
    {
        "id": "27",
        "label": "ARRIERE DROIT DE FACE"
    },
    {
        "id": "111",
        "label": "ARRIÈRE DROIT PAR DESSUS"
    },
    {
        "id": "139",
        "label": "ARRIÈRE DROIT VIOLENT"
    },
    {
        "id": "41",
        "label": "ARRIERE GAUCHE"
    },
    {
        "id": "26",
        "label": "ARRIERE GAUCHE DE FACE"
    },
    {
        "id": "116",
        "label": "ARRIERE GAUCHE PAR DESSUS"
    },
    {
        "id": "158",
        "label": "ARRIERE GAUCHE VIOLENT "
    },
    {
        "id": "73",
        "label": "ARRIERE LATERAL DROIT "
    },
    {
        "id": "61",
        "label": "ARRIERE PAR DESSOUS"
    },
    {
        "id": "106",
        "label": "ARRIERE PAR DESSUS "
    },
    {
        "id": "149",
        "label": "AU DESSUS "
    },
    {
        "id": "48",
        "label": "AVANT"
    },
    {
        "id": "83",
        "label": "AVANT  (PAR-DESSOUS)"
    },
    {
        "id": "122",
        "label": "AVANT ( ADDITIF )"
    },
    {
        "id": "193",
        "label": "AVANT ( PAR DESSUS )"
    },
    {
        "id": "125",
        "label": "AVANT (BRIS DE GLACE)"
    },
    {
        "id": "36",
        "label": "AVANT DE FACE"
    },
    {
        "id": "25",
        "label": "AVANT DE FACE AVEC  PREDOMINANCE CÔTE DROIT"
    },
    {
        "id": "24",
        "label": "AVANT DE FACE AVEC PREDOMINANCE COTE GAUCHE"
    },
    {
        "id": "44",
        "label": "AVANT DROIT"
    },
    {
        "id": "29",
        "label": "AVANT DROIT DE FACE"
    },
    {
        "id": "103",
        "label": "AVANT DROIT INFERIEUR "
    },
    {
        "id": "104",
        "label": "AVANT DROIT PAR DESSOUS"
    },
    {
        "id": "152",
        "label": "AVANT DROIT PAR DESSUS "
    },
    {
        "id": "47",
        "label": "AVANT GAUCHE"
    },
    {
        "id": "190",
        "label": "AVANT GAUCHE (CLIENT)"
    },
    {
        "id": "189",
        "label": "AVANT GAUCHE (CUSTOM CAR)"
    },
    {
        "id": "28",
        "label": "AVANT GAUCHE DE FACE"
    },
    {
        "id": "145",
        "label": "AVANT GAUCHE ET LATÉRAL GAUCHE"
    },
    {
        "id": "191",
        "label": "AVANT GAUCHE INFERIEUR "
    },
    {
        "id": "64",
        "label": "AVANT GAUCHE LATERAL GAUCHE VIOLENT "
    },
    {
        "id": "99",
        "label": "AVANT GAUCHE PAR DESSOUS"
    },
    {
        "id": "171",
        "label": "AVANT GAUCHE PAR DESSUS "
    },
    {
        "id": "66",
        "label": "AVANT INFERIEUR"
    },
    {
        "id": "65",
        "label": "AVANT LATERAL GAUCHE "
    },
    {
        "id": "78",
        "label": "AVANT MULTIPLES "
    },
    {
        "id": "169",
        "label": "AVANT MULTIPLES"
    },
    {
        "id": "45",
        "label": "AVANT PAR DESSOUS"
    },
    {
        "id": "199",
        "label": "AVANT PAR DESSOUS (SUITE A UNE SORTIE DE ROUTE)"
    },
    {
        "id": "71",
        "label": "AVANT PAR DESSUS"
    },
    {
        "id": "134",
        "label": "AVANT PAR-DESSOUS  (INCIDENT MECANIQUE)"
    },
    {
        "id": "133",
        "label": "AVANT PAR-DESSUS"
    },
    {
        "id": "96",
        "label": "AVANT RENVERSEMENT"
    },
    {
        "id": "74",
        "label": "AVANT SUPERIEUR"
    },
    {
        "id": "140",
        "label": "AVANT VIOLENT"
    },
    {
        "id": "102",
        "label": "AVD INFERIEUR"
    },
    {
        "id": "30",
        "label": "BRIS DE GLACE"
    },
    {
        "id": "37",
        "label": "CHOC AR D"
    },
    {
        "id": "38",
        "label": "CHOC AR G"
    },
    {
        "id": "18",
        "label": "CHOC AU DESSUS"
    },
    {
        "id": "39",
        "label": "CHOC AV D"
    },
    {
        "id": "154",
        "label": "CHOC EN DESSOUS"
    },
    {
        "id": "35",
        "label": "CHOC LAT AR G"
    },
    {
        "id": "21",
        "label": "CHOC LAT G"
    },
    {
        "id": "138",
        "label": "CHOC MULTIPLES AVEC RETOURNEMENT"
    },
    {
        "id": "196",
        "label": "CHOCS AVANT PAR DESSOUS "
    },
    {
        "id": "121",
        "label": "CHOCS MULTIPLES"
    },
    {
        "id": "118",
        "label": "CHOCS MULTIPLES SUITE A UNE SORTIE DE ROUTE"
    },
    {
        "id": "195",
        "label": "CONSTATATION"
    },
    {
        "id": "184",
        "label": "DANS L'HABITACLE "
    },
    {
        "id": "206",
        "label": "DEGATS SUITE A UN BRAQUAGE"
    },
    {
        "id": "70",
        "label": "ECONOMIQUEMENT IRREPARABLE"
    },
    {
        "id": "100",
        "label": "INCENDIE"
    },
    {
        "id": "124",
        "label": "INCENDIE PAR CONTAGION"
    },
    {
        "id": "146",
        "label": "INCENDIE PAR CONTAGION"
    },
    {
        "id": "76",
        "label": "INCENDIE PARTIEL"
    },
    {
        "id": "180",
        "label": "INCENDIE PARTIEL ( AVANT GAUCHE )"
    },
    {
        "id": "201",
        "label": "INCENDIE PARTIEL COMPARTIMENT MOTEUR"
    },
    {
        "id": "108",
        "label": "INCENDIE TOTAL"
    },
    {
        "id": "119",
        "label": "INCIDENT MECANIQUE"
    },
    {
        "id": "142",
        "label": "INCIDENT MÉCANIQUE"
    },
    {
        "id": "84",
        "label": "INFERIEUR AVANT "
    },
    {
        "id": "126",
        "label": "INFERIEUR AVANT DROIT"
    },
    {
        "id": "183",
        "label": "INTERIEUR DU VEHICULE "
    },
    {
        "id": "187",
        "label": "LATERAL"
    },
    {
        "id": "81",
        "label": "LATERAL  AVANT"
    },
    {
        "id": "151",
        "label": "LATERAL AR.G."
    },
    {
        "id": "178",
        "label": "LATERAL ARD"
    },
    {
        "id": "192",
        "label": "LATERAL ARRIERE"
    },
    {
        "id": "57",
        "label": "LATERAL ARRIERE DROIT"
    },
    {
        "id": "95",
        "label": "LATERAL ARRIERE DROIT INFERIEUR "
    },
    {
        "id": "197",
        "label": "LATERAL ARRIERE DROIT PAR DESSOUS "
    },
    {
        "id": "188",
        "label": "LATERAL ARRIERE DROIT PAR DESSUS "
    },
    {
        "id": "120",
        "label": "LATÉRAL ARRIÈRE DROIT+BRIS DE GLACE"
    },
    {
        "id": "53",
        "label": "LATERAL ARRIERE GAUCHE"
    },
    {
        "id": "56",
        "label": "LATERAL ARRIERE GAUCHE"
    },
    {
        "id": "200",
        "label": "LATERAL ARRIERE GAUCHE PAR DESSOUS "
    },
    {
        "id": "109",
        "label": "LATERAL ARRIERE GAUCHE PAR DESSUS"
    },
    {
        "id": "23",
        "label": "LATERAL AV DE LA DROITE VERS LA GAUCHE"
    },
    {
        "id": "50",
        "label": "LATERAL AVANT DROIT"
    },
    {
        "id": "52",
        "label": "LATERAL AVANT DROIT "
    },
    {
        "id": "115",
        "label": "LATERAL AVANT DROIT (PAR DESSUS)"
    },
    {
        "id": "198",
        "label": "LATERAL AVANT DROIT PAR DESSUS"
    },
    {
        "id": "110",
        "label": "LATERAL AVANT DROIT PAR-DESSUS"
    },
    {
        "id": "43",
        "label": "LATERAL AVANT GAUCHE"
    },
    {
        "id": "58",
        "label": "LATERAL AVANT GAUCHE "
    },
    {
        "id": "90",
        "label": "LATERAL AVANT GAUCHE INFERIEUR"
    },
    {
        "id": "86",
        "label": "LATERAL AVANT GAUCHE PAR DESSOUS"
    },
    {
        "id": "87",
        "label": "LATERAL AVANT GAUCHE PAR DESSUS"
    },
    {
        "id": "68",
        "label": "LATERAL AVANT GAUCHE VIOLENT "
    },
    {
        "id": "34",
        "label": "LATERAL DROIT"
    },
    {
        "id": "97",
        "label": "LATERAL DROIT  PAR DESSOUS"
    },
    {
        "id": "157",
        "label": "LATERAL DROIT INFERIEUR"
    },
    {
        "id": "159",
        "label": "LATERAL DROIT PAR DESSOUS (SORTIE DE ROUTE)"
    },
    {
        "id": "67",
        "label": "LATERAL DROIT PAR DESSUS"
    },
    {
        "id": "177",
        "label": "LATERAL G"
    },
    {
        "id": "59",
        "label": "LATERAL GAUCHE "
    },
    {
        "id": "105",
        "label": "LATERAL GAUCHE / MULTIPLES "
    },
    {
        "id": "136",
        "label": "LATÉRAL GAUCHE PAR DESSUS"
    },
    {
        "id": "88",
        "label": "LATERAL GAUCHE RENVERSEMENT"
    },
    {
        "id": "147",
        "label": "LATÉRAL GAUCHE VIOLENT MULTIPLES"
    },
    {
        "id": "33",
        "label": "LATTERAL GAUCHE PAR DESSOUS"
    },
    {
        "id": "161",
        "label": "MELANGE DE CARBURANT"
    },
    {
        "id": "51",
        "label": "MULTIPLES"
    },
    {
        "id": "75",
        "label": "MULTIPLES  (RENVERSEMENTS)"
    },
    {
        "id": "186",
        "label": "MULTIPLES ( SUITE A UNE SORTIE DE ROUTE )"
    },
    {
        "id": "202",
        "label": "MULTIPLES (ERAFLURE) "
    },
    {
        "id": "131",
        "label": "MULTIPLES (LATÉRAL ARRIÈRE GAUCHE / LATÉRAL AVANT GAUCHE)"
    },
    {
        "id": "130",
        "label": "MULTIPLES (LATÉRAL ARRIÈRE GAUCHE)"
    },
    {
        "id": "181",
        "label": "MULTIPLES (PAR DESSOUS)"
    },
    {
        "id": "194",
        "label": "MULTIPLES (SORTIE DE ROUTE)"
    },
    {
        "id": "80",
        "label": "MULTIPLES (SUITE SORTIE DE ROUTE)"
    },
    {
        "id": "179",
        "label": "MULTIPLES SUITE A UN RETOURNEMENT"
    },
    {
        "id": "92",
        "label": "PAR DESSOUS"
    },
    {
        "id": "85",
        "label": "PAR DESSUS"
    },
    {
        "id": "173",
        "label": "PIECES RECUPERABLES"
    },
    {
        "id": "174",
        "label": "PIECES RECUPERABLES"
    },
    {
        "id": "69",
        "label": "RAPPORT DE CONSTATATION"
    },
    {
        "id": "162",
        "label": "RAPPORT DE CONSTATATION ET ANALYSE"
    },
    {
        "id": "94",
        "label": "RENVERSEMENT"
    },
    {
        "id": "160",
        "label": "RETOURNEMENT"
    },
    {
        "id": "112",
        "label": "SORTIE DE ROUTE"
    },
    {
        "id": "155",
        "label": "TENTATIVE D'EFFRACTION "
    },
    {
        "id": "135",
        "label": "TENTATIVE DE VOL "
    },
    {
        "id": "156",
        "label": "TENTATIVE DE VOL AVEC EFFRACTION "
    },
    {
        "id": "167",
        "label": "Travaux ext. :"
    },
    {
        "id": "170",
        "label": "Travaux ext. en estimation"
    },
    {
        "id": "168",
        "label": "Travaux ext. en estimation : Pièces fournies par l'Assuré"
    },
    {
        "id": "20",
        "label": "VIOLENT AR DE FACE AVEC PREDOMINANCE CÔTE D"
    },
    {
        "id": "55",
        "label": "VIOLENT ARRIERE "
    },
    {
        "id": "82",
        "label": "VIOLENT ARRIERE DROIT"
    },
    {
        "id": "114",
        "label": "VIOLENT ARRIÈRE DROIT PAR DESSUS"
    },
    {
        "id": "62",
        "label": "VIOLENT ARRIERE GAUCHE"
    },
    {
        "id": "63",
        "label": "VIOLENT AVANT "
    },
    {
        "id": "60",
        "label": "VIOLENT AVANT DROIT "
    },
    {
        "id": "54",
        "label": "VIOLENT AVANT GAUCHE"
    },
    {
        "id": "182",
        "label": "VIOLENT AVANT GAUCHE PAR DESSOUS"
    },
    {
        "id": "91",
        "label": "VIOLENT AVANT PAR DESSUS"
    },
    {
        "id": "205",
        "label": "VIOLENT AVANT SUITE A UNE SORTIE DE ROUTE"
    },
    {
        "id": "113",
        "label": "VIOLENT CHOC ARRIÈRE"
    },
    {
        "id": "137",
        "label": "VIOLENT CHOC AVANT"
    },
    {
        "id": "128",
        "label": "VIOLENT CHOC LATÉRAL AVANT GAUCHE"
    },
    {
        "id": "148",
        "label": "VIOLENT CHOC LATERAL GAUCHE "
    },
    {
        "id": "204",
        "label": "VIOLENT GAUCHE"
    },
    {
        "id": "150",
        "label": "VIOLENT LATERAL AR.D."
    },
    {
        "id": "98",
        "label": "VIOLENT LATERAL ARRIERE DROIT"
    },
    {
        "id": "72",
        "label": "VIOLENT LATERAL ARRIERE GAUCHE"
    },
    {
        "id": "101",
        "label": "VIOLENT LATERAL AVANT DROIT"
    },
    {
        "id": "132",
        "label": "VIOLENT LATERAL AVANT DROIT "
    },
    {
        "id": "172",
        "label": "VIOLENT LATERAL AVANT DROIT PAR DESSUS"
    },
    {
        "id": "79",
        "label": "VIOLENT LATERAL AVANT GAUCHE"
    },
    {
        "id": "42",
        "label": "VIOLENT LATERAL DROIT "
    },
    {
        "id": "31",
        "label": "VIOLENT LATERAL GAUCHE"
    },
    {
        "id": "77",
        "label": "VIOLENT LATERAL GAUCHE "
    },
    {
        "id": "89",
        "label": "VIOLENT LATERAL GAUCHE ET MULTIPLES"
    },
    {
        "id": "127",
        "label": "VIOLENT LATÉRAL GAUCHE PAR DESSOUS"
    },
    {
        "id": "117",
        "label": "VIOLENT MULTIPLES"
    },
    {
        "id": "107",
        "label": "VIOLENTS ARRIERE ET AVANT"
    },
    {
        "id": "123",
        "label": "VOL ACCESSOIRE AVEC DEGRADATION"
    },
    {
        "id": "93",
        "label": "VOL ACCESSOIRES"
    },
    {
        "id": "203",
        "label": "VOL ACCESSOIRES ( ACTES DE VANDALISME )"
    },
    {
        "id": "129",
        "label": "VOL DE VEHICULE"
    },
    {
        "id": "143",
        "label": "VOLE-RETROUVE"
    },
    {
        "id": "144",
        "label": "VOLER-RETROUVE"
    }
  ]

  constructor(
    public Jarwis: JarwisService,
    public shockPointService: ShockPointService,
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
    this.shockPointService.getShockPoint(this.current_page).subscribe((data: any) => {
      this.listItem = data.shock_points.data;

      this.current_page = data.shock_points.current_page;
      this.first_page_url = data.shock_points.first_page_url;
      this.from = data.shock_points.from;
      this.last_page = data.shock_points.last_page;
      this.last_page_url = data.shock_points.last_page_url;
      this.links = data.shock_points.links;
      this.next_page_url = data.shock_points.next_page_url;
      this.per_page = data.shock_points.per_page;
      this.prev_page_url = data.shock_points.prev_page_url;
      this.to = data.shock_points.to;
      this.total = data.shock_points.total;

      this.SpinnerService.hide();

    });    
  }

  search(){
    this.SpinnerService.show();
    this.shockPointService.getShockPointSearch(this.current_page,this.information).subscribe((data: any) => {
      this.listItem = data.shock_points.data;

      this.current_page = data.shock_points.current_page;
      this.first_page_url = data.shock_points.first_page_url;
      this.from = data.shock_points.from;
      this.last_page = data.shock_points.last_page;
      this.last_page_url = data.shock_points.last_page_url;
      this.links = data.shock_points.links;
      this.next_page_url = data.shock_points.next_page_url;
      this.per_page = data.shock_points.per_page;
      this.prev_page_url = data.shock_points.prev_page_url;
      this.to = data.shock_points.to;
      this.total = data.shock_points.total;

      this.SpinnerService.hide();

    })
  }

  paginate(){
    if(this.information){
      this.search()
    } else {
      this.SpinnerService.show();
      this.shockPointService.getShockPointPaginate(this.current_page).subscribe((data: any) => {
        this.listItem = data.shock_points.data;

      this.current_page = data.shock_points.current_page;
      this.first_page_url = data.shock_points.first_page_url;
      this.from = data.shock_points.from;
      this.last_page = data.shock_points.last_page;
      this.last_page_url = data.shock_points.last_page_url;
      this.links = data.shock_points.links;
      this.next_page_url = data.shock_points.next_page_url;
      this.per_page = data.shock_points.per_page;
      this.prev_page_url = data.shock_points.prev_page_url;
      this.to = data.shock_points.to;
      this.total = data.shock_points.total;

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
    const shockPoint = new ShockPoint();
    shockPoint.table = this.table;

    this.shockPointService.addAll(shockPoint).subscribe();
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

      this.shockPointService.add(formData).subscribe(res => {
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
    this.shockPointService.enable(formData).subscribe(res => {
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
    
    this.shockPointService.disable(formData).subscribe(res => {
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
    

    this.shockPointService.update(formData).subscribe(res => {
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
