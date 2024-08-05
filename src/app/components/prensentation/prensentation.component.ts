import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-prensentation',
  templateUrl: './prensentation.component.html',
  styleUrls: ['./prensentation.component.css']
})
export class PrensentationComponent implements OnInit {

  public myAngularxQrCode: string = "";
  public qrCodeDownloadLink: SafeUrl = "";

  constructor() { 
    this.myAngularxQrCode = 'Your QR code data string';
  }

  ngOnInit(): void {
  }

  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }

}
