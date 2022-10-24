import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-trip-history',
  templateUrl: './trip-history.page.html',
  styleUrls: ['./trip-history.page.scss'],
})
export class TripHistoryPage implements OnInit {

  trips

  constructor() {}
  async ngOnInit() {
    const headers = {
      'Content-Type': 'text/plain',
      "Access-Control-Allow-Origin": "*",
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      "Access-Control-Allow-Headers": "x-access-token, Origin, X-Requested-With, Content-Type, Accept"

    };
    const realTrips: any = await axios
      .post(
        'https://xmdsydoicb.execute-api.us-east-1.amazonaws.com/estudiante',
        {
          rut: '2666666',
        }, {headers}
        )
        .then(function (response) {
        console.log('axios ok', response);
        return response;
      })
      .catch(function (error) {
        console.log('axios oknt', error);
        return error;
      });
    console.log('axios ', realTrips);

    const tripsFormat = async () => {
      this.trips = await realTrips.data.Item.viajesRealizadosPasajero.map((trip) => {
        console.log(trip)
        const horaSalidaTemporal = new Date(parseInt(trip.horaSalida)).toLocaleDateString("en-US");
        const horaLlegadaTemporal = new Date(parseInt(trip.horaLlegada));

        trip.horaSalida = horaSalidaTemporal;
        trip.horaLlegada = horaLlegadaTemporal;

        return trip;
      });
    }
    await tripsFormat()
  }
}
