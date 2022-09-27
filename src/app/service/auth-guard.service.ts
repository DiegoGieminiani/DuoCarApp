import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    console.log(route)
    let authInfo = {
      authenticated: false,
    };
    if (!authInfo.authenticated){
      this.router.navigate(['/switch-user'])
      return false
    } 
    return true
  }
}
