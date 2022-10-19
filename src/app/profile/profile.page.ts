import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  username = this.route.snapshot.paramMap.get('userName');


  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  toProfile() {
    this.router.navigate([`/profile`]);
  }

  toTripHistory() {
    this.router.navigate([`/trip-history`]);
  }

  toHome() {
    this.router.navigate([`/home/${this.username}`]);
  }
}
