import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  constructor() { }
  handle(profil_id:any) {
    this.set(profil_id);
  }

  set(profil_id:any) {
    localStorage.setItem('profil_id', profil_id);
  }

  get() {
    return localStorage.getItem('profil_id');
  }

  remove() {
    localStorage.removeItem('profil_id');
  }


  admin() {
    const role = this.get();
    if (role == "Admin") {
        return true;
    }
    return false;
  }

  directeur() {
    const role = this.get();
    if (role == "Admin" || role == "Directeur") {
        return true;
    }
    return false;
  }

  intermediaire() {
    const role = this.get();
    if (role == "Admin" || role == "Intermediaire") {
        return true;
    }
    return false;
  }

  gestionnaire() {
    const role = this.get();
    if (role == "Admin" || role == "Gestionnaire") {
        return true;
    }
    return false;
  }

  client() {
    const role = this.get();
    if (role == "Admin" || role == "Client") {
        return true;
    }
    return false;
  }

  assure() {
    const role = this.get();
    if (role == "Admin" || role == "Assuré") {
        return true;
    }
    return false;
  }

  directeurGestionnaire() {
    const role = this.get();
    if (role == "Admin" || role == "Directeur" || role == "Gestionnaire") {
        return true;
    }
    return false;
  }

  intermediaireGestionnaire() {
    const role = this.get();
    if (role == "Admin" || role == "Intermediaire" || role == "Gestionnaire") {
        return true;
    }
    return false;
  }

  clientIntermediaireGestionnaire() {
    const role = this.get();
    if (role == "Admin" || role == "Client" || role == "Intermediaire" || role == "Gestionnaire") {
        return true;
    }
    return false;
  }
  
}
