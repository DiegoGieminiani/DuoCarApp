import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authState = new BehaviorSubject(false);
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
  login(user, password) {
    if (user == "asdf"){
      var navigationExtras: NavigationExtras = {
        state: {
          user_id: '1234',
          user: 'Nicolas Díaz',
          message: 'Bienvenido'
        }
      };
      this.storage.set('USER_INFO', navigationExtras).then((response) => {
        this.router.navigate([`/home/${navigationExtras.state.user}`]);

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
}
