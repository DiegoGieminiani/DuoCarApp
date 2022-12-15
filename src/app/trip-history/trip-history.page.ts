import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-trip-history',
  templateUrl: './trip-history.page.html',
  styleUrls: ['./trip-history.page.scss'],
})
export class TripHistoryPage implements OnInit {
  trips;
  user;
  isConductor

  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.isConductor = localStorage.getItem('isConductor')
    this.trips = JSON.parse(
      localStorage.getItem('user')
    ).viajesRealizadosPasajero.map((trip) => {
      console.log(trip);
      const horaSalidaTemporal = new Date(
        parseInt(trip.horaSalida)
      ).toLocaleDateString('en-US');
      const horaLlegadaTemporal = new Date(parseInt(trip.horaLlegada));

      trip.horaSalida = horaSalidaTemporal;
      trip.horaLlegada = horaLlegadaTemporal;

      return trip;
    });
  }

  
  toProfile() {
    this.router.navigate([`/profile`]);
  }

  toTripHistory() {
    this.router.navigate([`/trip-history`]);
  }

  toHome() {
    var navigationExtras: NavigationExtras = {
      state: {
        user_id: this.user.rut,
        user: `${this.user.nombre} ${this.user.apellido}`,
        message: 'Bienvenido'
      }
    };
    if (this.isConductor === "1") {
      this.router.navigate([`/home-conductor/${navigationExtras.state.user}`], navigationExtras);
    }else{
      this.router.navigate([`/home/${navigationExtras.state.user}`], navigationExtras);
    }
  }
}
