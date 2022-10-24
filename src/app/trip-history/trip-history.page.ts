import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trip-history',
  templateUrl: './trip-history.page.html',
  styleUrls: ['./trip-history.page.scss'],
})
export class TripHistoryPage implements OnInit {
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
  constructor() {}

  ngOnInit() {}
}
