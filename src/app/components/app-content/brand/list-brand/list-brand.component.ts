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
import { BrandService } from 'src/app/services/app-content/brand.service';
import { Brand } from 'src/app/models/brand.model';


@Component({
  selector: 'app-list-brand',
  templateUrl: './list-brand.component.html',
  styleUrls: ['./list-brand.component.css']
})
export class ListBrandComponent implements OnInit {

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
        "id": "20",
        "label": "TOYOTA"
    },
    {
        "id": "205",
        "label": "MERCEDES"
    },
    {
        "id": "22",
        "label": "CHEVROLET"
    },
    {
        "id": "23",
        "label": "GMC"
    },
    {
        "id": "24",
        "label": "MITSUBISHI"
    },
    {
        "id": "25",
        "label": "NISSAN"
    },
    {
        "id": "26",
        "label": "KIA"
    },
    {
        "id": "27",
        "label": "HYUNDAI"
    },
    {
        "id": "28",
        "label": "HONDA"
    },
    {
        "id": "29",
        "label": "RENAULT"
    },
    {
        "id": "30",
        "label": "FORD"
    },
    {
        "id": "31",
        "label": "FERRARI"
    },
    {
        "id": "32",
        "label": "LAMBORGINI"
    },
    {
        "id": "34",
        "label": "MERCEDES-BENZ"
    },
    {
        "id": "35",
        "label": "BMW"
    },
    {
        "id": "37",
        "label": "PEUGEOT"
    },
    {
        "id": "38",
        "label": "CHANA"
    },
    {
        "id": "39",
        "label": "VOLKSWAGEN"
    },
    {
        "id": "40",
        "label": "MAZDA"
    },
    {
        "id": "41",
        "label": "OPEL"
    },
    {
        "id": "42",
        "label": "ISUZU"
    },
    {
        "id": "43",
        "label": "GREAT WALL"
    },
    {
        "id": "44",
        "label": "DACIA"
    },
    {
        "id": "45",
        "label": "AUDI"
    },
    {
        "id": "46",
        "label": "SKODA"
    },
    {
        "id": "47",
        "label": "RENAULT MEGANE"
    },
    {
        "id": "48",
        "label": "CITROËN"
    },
    {
        "id": "49",
        "label": "CHANA"
    },
    {
        "id": "50",
        "label": "KIA MOTORS"
    },
    {
        "id": "51",
        "label": "TOYOTA HILUX"
    },
    {
        "id": "52",
        "label": "INCONNU"
    },
    {
        "id": "53",
        "label": "NISSAN"
    },
    {
        "id": "54",
        "label": "TOYOTA"
    },
    {
        "id": "55",
        "label": "BERCO"
    },
    {
        "id": "56",
        "label": "LEXUS"
    },
    {
        "id": "58",
        "label": "PORSCHE"
    },
    {
        "id": "59",
        "label": "VOLVO"
    },
    {
        "id": "60",
        "label": "VERNIERI"
    },
    {
        "id": "61",
        "label": "JEEP"
    },
    {
        "id": "62",
        "label": "FIAT"
    },
    {
        "id": "63",
        "label": "YAMAHA"
    },
    {
        "id": "64",
        "label": "LIFAN"
    },
    {
        "id": "65",
        "label": "DAEWOO"
    },
    {
        "id": "66",
        "label": "SUZUKI"
    },
    {
        "id": "68",
        "label": "SANILI"
    },
    {
        "id": "69",
        "label": "FUDI"
    },
    {
        "id": "70",
        "label": "ASTON MARTIN"
    },
    {
        "id": "71",
        "label": "DONG FENG"
    },
    {
        "id": "72",
        "label": "JAGUAR"
    },
    {
        "id": "73",
        "label": "SMART"
    },
    {
        "id": "74",
        "label": "PART"
    },
    {
        "id": "75",
        "label": "CHERY"
    },
    {
        "id": "76",
        "label": "DAF"
    },
    {
        "id": "77",
        "label": "WINGLE"
    },
    {
        "id": "78",
        "label": "IVECO"
    },
    {
        "id": "79",
        "label": "CHRYSLER"
    },
    {
        "id": "80",
        "label": "LAND ROVER"
    },
    {
        "id": "81",
        "label": "SSANGYONG"
    },
    {
        "id": "82",
        "label": "SHUANGHUAN"
    },
    {
        "id": "83",
        "label": "LAND MARK"
    },
    {
        "id": "84",
        "label": "GRANDTIGER"
    },
    {
        "id": "85",
        "label": "ROVER"
    },
    {
        "id": "86",
        "label": "KINROAD"
    },
    {
        "id": "87",
        "label": "SEAT"
    },
    {
        "id": "88",
        "label": "DODGE"
    },
    {
        "id": "89",
        "label": "YUEJIN"
    },
    {
        "id": "90",
        "label": "BERLIET"
    },
    {
        "id": "91",
        "label": "RYMCO"
    },
    {
        "id": "92",
        "label": "AUDI-8N"
    },
    {
        "id": "93",
        "label": "BYD"
    },
    {
        "id": "94",
        "label": "ZX AUTO"
    },
    {
        "id": "95",
        "label": "INFINITI"
    },
    {
        "id": "96",
        "label": "CACOMIAF"
    },
    {
        "id": "97",
        "label": "KROLL"
    },
    {
        "id": "98",
        "label": "TATA"
    },
    {
        "id": "99",
        "label": "KTM"
    },
    {
        "id": "100",
        "label": "TRAILOR"
    },
    {
        "id": "101",
        "label": "KAIZER"
    },
    {
        "id": "102",
        "label": "CATERPILLAR"
    },
    {
        "id": "103",
        "label": "PINGUELY"
    },
    {
        "id": "104",
        "label": "ATLAS COPCO"
    },
    {
        "id": "105",
        "label": "SCRAPER"
    },
    {
        "id": "106",
        "label": "MANITOU"
    },
    {
        "id": "107",
        "label": "LIEBHERR"
    },
    {
        "id": "108",
        "label": "DYNAPAC"
    },
    {
        "id": "109",
        "label": "PROTON"
    },
    {
        "id": "110",
        "label": "CHRYSLER USA"
    },
    {
        "id": "111",
        "label": "MAN"
    },
    {
        "id": "112",
        "label": "RANGE ROVER"
    },
    {
        "id": "113",
        "label": "RENAULT-AMBULANCE"
    },
    {
        "id": "114",
        "label": "MERCEDES BENZ"
    },
    {
        "id": "115",
        "label": "SAMRO"
    },
    {
        "id": "116",
        "label": "DONG FENG"
    },
    {
        "id": "117",
        "label": "YUTONG"
    },
    {
        "id": "118",
        "label": "FRUEHAUF"
    },
    {
        "id": "119",
        "label": "MINI"
    },
    {
        "id": "120",
        "label": "EICHER"
    },
    {
        "id": "121",
        "label": "JIALING"
    },
    {
        "id": "122",
        "label": "KAMAZ"
    },
    {
        "id": "123",
        "label": "KALMAR"
    },
    {
        "id": "124",
        "label": "AGORA "
    },
    {
        "id": "125",
        "label": "ISUZU"
    },
    {
        "id": "126",
        "label": "QUAD"
    },
    {
        "id": "141",
        "label": "LOLO"
    },
    {
        "id": "143",
        "label": "CHANGAN "
    },
    {
        "id": "144",
        "label": "HAVAL H6"
    },
    {
        "id": "145",
        "label": "CHANGAN"
    },
    {
        "id": "146",
        "label": "ZHENGZHOU"
    },
    {
        "id": "147",
        "label": "SUBARU"
    },
    {
        "id": "148",
        "label": "JMC"
    },
    {
        "id": "149",
        "label": "ISUZU"
    },
    {
        "id": "150",
        "label": "FAYMONVILLE"
    },
    {
        "id": "151",
        "label": "MCV"
    },
    {
        "id": "152",
        "label": "HOWO"
    },
    {
        "id": "153",
        "label": "HAVAL"
    },
    {
        "id": "154",
        "label": "ASHOK LEYLAND"
    },
    {
        "id": "155",
        "label": "BAIC"
    },
    {
        "id": "156",
        "label": "FOTON"
    },
    {
        "id": "157",
        "label": "SUZUKI"
    },
    {
        "id": "158",
        "label": "KING LONG "
    },
    {
        "id": "159",
        "label": "JAC"
    },
    {
        "id": "160",
        "label": "BMW"
    },
    {
        "id": "161",
        "label": "MERCEDES-BENZ - C"
    },
    {
        "id": "163",
        "label": "QASKI"
    },
    {
        "id": "164",
        "label": "SINOTRUK"
    },
    {
        "id": "165",
        "label": "KONECRANES"
    },
    {
        "id": "166",
        "label": "CAMICO"
    },
    {
        "id": "167",
        "label": "ASIA"
    },
    {
        "id": "168",
        "label": "APSONIC"
    },
    {
        "id": "169",
        "label": "COMET"
    },
    {
        "id": "170",
        "label": "DIBEX"
    },
    {
        "id": "171",
        "label": "DAGARTECH"
    },
    {
        "id": "172",
        "label": "GESAN"
    },
    {
        "id": "173",
        "label": "SDMO"
    },
    {
        "id": "174",
        "label": "GAC"
    },
    {
        "id": "175",
        "label": "SIFMA DOLL"
    },
    {
        "id": "176",
        "label": "SINOTRUK"
    },
    {
        "id": "177",
        "label": "BORGWARD"
    },
    {
        "id": "178",
        "label": "GSC"
    },
    {
        "id": "179",
        "label": "FUSO"
    },
    {
        "id": "180",
        "label": "CIMIC"
    },
    {
        "id": "181",
        "label": "FAW"
    },
    {
        "id": "182",
        "label": "DUSTER"
    },
    {
        "id": "183",
        "label": "LAND ROVER"
    },
    {
        "id": "184",
        "label": "ACURA"
    },
    {
        "id": "185",
        "label": "CARLAMA"
    },
    {
        "id": "186",
        "label": "DAF"
    },
    {
        "id": "187",
        "label": "ASCA"
    },
    {
        "id": "188",
        "label": "SOUEAST"
    },
    {
        "id": "189",
        "label": "LADA"
    },
    {
        "id": "190",
        "label": "JAGUAR"
    },
    {
        "id": "191",
        "label": "SOGEMA"
    },
    {
        "id": "192",
        "label": "MG"
    },
    {
        "id": "193",
        "label": "ROYAL"
    },
    {
        "id": "194",
        "label": "KRONE"
    },
    {
        "id": "196",
        "label": "CHANGAN"
    },
    {
        "id": "197",
        "label": "SCANIA"
    },
    {
        "id": "198",
        "label": "MAXUS"
    },
    {
        "id": "199",
        "label": "KRONE"
    },
    {
        "id": "200",
        "label": "OZDEMIRSAN"
    },
    {
        "id": "201",
        "label": "WILSON"
    },
    {
        "id": "204",
        "label": "GOLDEN DRAGONA"
    },
    {
        "id": "206",
        "label": "FORLAND"
    },
    {
        "id": "207",
        "label": "FORLAND"
    },
    {
        "id": "208",
        "label": "JOHNE DEERE"
    },
    {
        "id": "209",
        "label": "FENGAO"
    },
    {
        "id": "210",
        "label": "Suzuki"
    },
    {
        "id": "211",
        "label": "JETOUR"
    },
    {
        "id": "212",
        "label": "OMSP MACOLA"
    },
    {
        "id": "213",
        "label": "LOHEAC"
    },
    {
        "id": "214",
        "label": "OMT"
    },
    {
        "id": "215",
        "label": "THOMAS"
    },
    {
        "id": "216",
        "label": "TOYOTA FORTUNER"
    },
    {
        "id": "217",
        "label": "TOYOTA LC200"
    },
    {
        "id": "218",
        "label": "TVS"
    },
    {
        "id": "219",
        "label": "DFSK"
    },
    {
        "id": "220",
        "label": "CAN-AM"
    },
    {
        "id": "221",
        "label": "APSONIC"
    },
    {
        "id": "222",
        "label": "TOYOTA"
    },
    {
        "id": "223",
        "label": "TOYOTA"
    },
    {
        "id": "224",
        "label": "RATO"
    },
    {
        "id": "225",
        "label": "KARRY"
    },
    {
        "id": "226",
        "label": "HUMBAUR"
    },
    {
        "id": "227",
        "label": "GEELY"
    },
    {
        "id": "228",
        "label": "HAOJIN"
    },
    {
        "id": "229",
        "label": "CINC-SHENHE"
    },
    {
        "id": "230",
        "label": "HIGER"
    },
    {
        "id": "231",
        "label": "HINO"
    },
    {
        "id": "232",
        "label": "BMW"
    },
    {
        "id": "233",
        "label": "HAOJUE"
    },
    {
        "id": "234",
        "label": "TROUILLET"
    },
    {
        "id": "235",
        "label": "LANCIA"
    },
    {
        "id": "236",
        "label": "FIAT-HITACHI"
    },
    {
        "id": "237",
        "label": "BOBCAT"
    },
    {
        "id": "238",
        "label": "ASTRA"
    },
    {
        "id": "239",
        "label": "GALION"
    },
    {
        "id": "240",
        "label": "BOBCAT - 442"
    },
    {
        "id": "241",
        "label": "IVECO - EUROSTAR"
    },
    {
        "id": "242",
        "label": "SATURN"
    },
    {
        "id": "243",
        "label": "MERCEDES BENZ VOI"
    },
    {
        "id": "244",
        "label": "MASSEY CERGUSON"
    },
    {
        "id": "245",
        "label": "KOMATSU"
    },
    {
        "id": "246",
        "label": "RODO MIX"
    },
    {
        "id": "247",
        "label": "RODO MIX"
    },
    {
        "id": "248",
        "label": "NEW HOLLAND"
    },
    {
        "id": "249",
        "label": "JCB"
    },
    {
        "id": "250",
        "label": "BO7AG"
    },
    {
        "id": "251",
        "label": "SD70"
    },
    {
        "id": "252",
        "label": "CONTENEUR"
    },
    {
        "id": "253",
        "label": "MASCHINENFABRIK K"
    },
    {
        "id": "254",
        "label": "HOET-TRAILER"
    },
    {
        "id": "255",
        "label": "LINCOLN"
    },
    {
        "id": "256",
        "label": "JAC"
    },
    {
        "id": "257",
        "label": "MASERATI"
    },
    {
        "id": "258",
        "label": "CONGXIN"
    },
    {
        "id": "259",
        "label": "HYSTER"
    },
    {
        "id": "260",
        "label": "LECINEMA"
    },
    {
        "id": "261",
        "label": "LECINENA"
    },
    {
        "id": "262",
        "label": "ALPHA ROMEO"
    },
    {
        "id": "263",
        "label": "SHACMAN"
    },
    {
        "id": "264",
        "label": "GROENEWEGE"
    },
    {
        "id": "265",
        "label": "SEMTS"
    },
    {
        "id": "266",
        "label": "MARCO POLO"
    },
    {
        "id": "267",
        "label": "LASSIRE"
    },
    {
        "id": "268",
        "label": "CATERPILAR"
    },
    {
        "id": "269",
        "label": "KYMCO"
    },
    {
        "id": "270",
        "label": "MVC"
    },
    {
        "id": "271",
        "label": "KAWASAKI"
    },
    {
        "id": "272",
        "label": "JOYLONG"
    },
    {
        "id": "273",
        "label": "RANDO"
    },
    {
        "id": "274",
        "label": "GLORY"
    },
    {
        "id": "275",
        "label": "SAFARI"
    },
    {
        "id": "276",
        "label": "CASE"
    },
    {
        "id": "277",
        "label": "PONTIAC"
    },
    {
        "id": "278",
        "label": "CITROEN"
    },
    {
        "id": "279",
        "label": "VENUCIA"
    },
    {
        "id": "280",
        "label": "RANDON"
    },
    {
        "id": "281",
        "label": "FORD"
    },
    {
        "id": "282",
        "label": "GREAT WALL"
    },
    {
        "id": "283",
        "label": "CATERPILLAR"
    },
    {
        "id": "284",
        "label": "SHAMAN"
    },
    {
        "id": "285",
        "label": "ACTM"
    }
]

  constructor(
    public Jarwis: JarwisService,
    public brandService: BrandService,
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
    this.brandService.getBrand(this.current_page).subscribe((data: any) => {
      this.listItem = data.brands.data;

      this.current_page = data.brands.current_page;
      this.first_page_url = data.brands.first_page_url;
      this.from = data.brands.from;
      this.last_page = data.brands.last_page;
      this.last_page_url = data.brands.last_page_url;
      this.links = data.brands.links;
      this.next_page_url = data.brands.next_page_url;
      this.per_page = data.brands.per_page;
      this.prev_page_url = data.brands.prev_page_url;
      this.to = data.brands.to;
      this.total = data.brands.total;

      this.SpinnerService.hide();

    });    
  }

  search(){
    this.SpinnerService.show();
    this.brandService.getBrandSearch(this.current_page,this.information).subscribe((data: any) => {
      this.listItem = data.brands.data;

      this.current_page = data.brands.current_page;
      this.first_page_url = data.brands.first_page_url;
      this.from = data.brands.from;
      this.last_page = data.brands.last_page;
      this.last_page_url = data.brands.last_page_url;
      this.links = data.brands.links;
      this.next_page_url = data.brands.next_page_url;
      this.per_page = data.brands.per_page;
      this.prev_page_url = data.brands.prev_page_url;
      this.to = data.brands.to;
      this.total = data.brands.total;

      this.SpinnerService.hide();

    })
  }

  paginate(){
    if(this.information){
      this.search()
    } else {
      this.SpinnerService.show();
      this.brandService.getBrandPaginate(this.current_page).subscribe((data: any) => {
        this.listItem = data.brands.data;

      this.current_page = data.brands.current_page;
      this.first_page_url = data.brands.first_page_url;
      this.from = data.brands.from;
      this.last_page = data.brands.last_page;
      this.last_page_url = data.brands.last_page_url;
      this.links = data.brands.links;
      this.next_page_url = data.brands.next_page_url;
      this.per_page = data.brands.per_page;
      this.prev_page_url = data.brands.prev_page_url;
      this.to = data.brands.to;
      this.total = data.brands.total;

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
    const brand = new Brand();
    brand.table = this.table;

    this.brandService.addAll(brand).subscribe();
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

      this.brandService.add(formData).subscribe(res => {
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
    this.brandService.enable(formData).subscribe(res => {
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
    
    this.brandService.disable(formData).subscribe(res => {
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
    

    this.brandService.update(formData).subscribe(res => {
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