import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authState = new BehaviorSubject(false);
  trips
  constructor(
    private router: Router,
    private storage: Storage,
    private platform: Platform,
  )
  {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
  }
  ifLoggedIn() {
    this.storage.get('USER_INFO').then((response) => {
      if (response) {
        this.authState.next(true);
      }
    });
  }
  async login(user, password, conductor: boolean = false) {
    await this.getDatosEstudiante(user)
    console.log("GET LOGIN: ", this.trips)

    if (Object.keys(this.trips).length > 0 && this.trips.rut === user && this.trips.password === password){
        var navigationExtras: NavigationExtras = {
          state: {
            user_id: this.trips.rut,
            user: `${this.trips.nombre} ${this.trips.apellido}`,
            message: 'Bienvenido'
          }
        };
        this.storage.set('USER_INFO', navigationExtras).then((response) => {
          if (conductor) {
            localStorage.setItem("isConductor", "1");
            this.router.navigate([`/home-conductor/${navigationExtras.state.user}`], navigationExtras);
          }else{
            localStorage.setItem("isConductor", "0");
            this.router.navigate([`/home/${navigationExtras.state.user}`], navigationExtras);
          }
          //this.router.navigate([`/home/${navigationExtras.state.user}`]);
          localStorage.setItem("user", JSON.stringify(this.trips));
          this.authState.next(true);
        });
    }else{
      var navigationExtrasNOK: NavigationExtras = {
        state: {
          user_id: '',
          user_name: '',
          message: 'Nombre de usuario o contraseña inválidos'
        }
      };
      this.storage.set('USER_INFO', navigationExtrasNOK).then((response) => {
        this.router.navigate(['/switch-user']);
        this.authState.next(false);
      });
    }
  }
  logout() {
    this.storage.remove('USER_INFO').then(() => {
      this.router.navigate(['/switch-user']);
      this.authState.next(false);
    });
  }
  isAuthenticated() {
    return this.authState.value;
  }

  
  async getDatosEstudiante (rut: string){
    const headers = {
      'Content-Type': 'text/plain',
      "Access-Control-Allow-Origin": "*",
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      "Access-Control-Allow-Headers": "x-access-token, Origin, X-Requested-With, Content-Type, Accept"

    };
    const datosObtenidos: any = await axios
      .post(
        'https://xmdsydoicb.execute-api.us-east-1.amazonaws.com/estudiante',
        {
          rut: rut,
        }, {headers}
        )
        .then(function (response) {
        console.log('axios ok', response);
        return response;
      })
      .catch(function (error) {
        console.log('axios oknt', error);
        return {error: error};
      });
    console.log('axios ', datosObtenidos);

    const datosFormater = async () => {
      const datosFormat = await datosObtenidos.data
      this.trips = Object.keys(datosFormat).length > 0 ? datosFormat.Item : datosFormat
    }

    await datosFormater()  
  }
}
