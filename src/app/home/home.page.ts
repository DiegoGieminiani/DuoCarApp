import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
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
