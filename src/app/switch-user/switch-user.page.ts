import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-switch-user',
  templateUrl: './switch-user.page.html',
  styleUrls: ['./switch-user.page.scss'],
})
export class SwitchUserPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToLogin(userType: string) {

    console.log(userType);
    this.router.navigate([`/login/${userType}`]);
    
    // this.navCtrl.navigateForward('/home');
  }
}
