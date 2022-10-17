import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router, public authenticationService: AuthenticationService,) { }

  canActivate(): boolean {
    if (!this.authenticationService.isAuthenticated()){
      this.router.navigate(['/switch-user'])
      return false
    }
    return true
  }
}
