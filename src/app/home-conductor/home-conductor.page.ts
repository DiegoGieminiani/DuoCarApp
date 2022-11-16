import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-home-conductor',
  templateUrl: './home-conductor.page.html',
  styleUrls: ['./home-conductor.page.scss'],
})
export class HomeConductorPage implements OnInit {
  username = this.route.snapshot.paramMap.get('userName');
  isModalOpen = false;


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

  mostrarMapa() {
    this.setOpen(true)
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}


