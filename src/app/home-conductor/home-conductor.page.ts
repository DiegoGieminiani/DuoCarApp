import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-home-conductor',
  templateUrl: './home-conductor.page.html',
  styleUrls: ['./home-conductor.page.scss'],
})
export class HomeConductorPage implements OnInit {
  username = this.route.snapshot.paramMap.get('userName');
  trips: any[] = [
    {
      id: 1,
      conductorRut: '29770279',
      destino: 'bar de toby',
      horaLlegada: '1665975616560',
      horaSalida: '1665975272561',
      monto: 55555,
      origen: 'mi casa 6969',
    },
    {
      id: 2,
      conductorRut: '29770234',
      destino: 'duocuc',
      horaLlegada: '1665975616560',
      horaSalida: '1665975272561',
      monto: 55555,
      origen: 'frankfort 5071',
    },
    {
      id: 3,
      conductorRut: '123143234',
      destino: 'frankfort 5072',
      horaLlegada: '1665975616560',
      horaSalida: '1665975272561',
      monto: 55555,
      origen: 'francisco bilbao 4260',
    },
  ];
  tripsFormat = this.trips.map((trip) => {
    const horaSalidaTemporal = new Date(parseInt(trip.horaSalida));
    const horaLlegadaTemporal = new Date(parseInt(trip.horaLlegada));

    trip.horaSalida = horaSalidaTemporal.getDate()
    trip.horaLlegada = horaLlegadaTemporal.getDate()

    return trip;
  });


  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  toProfile() {
    this.router.navigate([`/profile`]);
  }

  toTripView() {
    this.router.navigate([`/trip-view`]);
  }

  toHome() {
    this.router.navigate([`/home/${this.username}`]);
  }
}


