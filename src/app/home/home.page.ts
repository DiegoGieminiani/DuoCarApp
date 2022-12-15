import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
  AfterViewInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MapboxService } from '../mapbox.service';

import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {
  @ViewChild('asGeoCoder') asGeoCoder: ElementRef;
  username = this.route.snapshot.paramMap.get('userName');
  user
  userNameLastName
  trip = new FormGroup({
    origen: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
    destino: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
  });
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mapboxService: MapboxService,
    private renderer2: Renderer2,
    private geolocation: Geolocation
  ) {}



  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.userNameLastName = this.user.nombre + " " + this.user.apellido
    this.mapboxService
      .buildMap()
      .then(({ map, geocoder }) => {
        //this.asGeoCoder
        this.renderer2.appendChild(
          this.asGeoCoder.nativeElement,
          geocoder.onAdd(map)
        );
        console.log('***********TODO BIEN***********');
      })
      .catch((err) => {
        console.log('********ERROR****************', err);
      });
  }

  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  toProfile() {
    this.router.navigate([`/profile`]);
  }

  toTripHistory() {
    this.router.navigate([`/trip-history`]);
  }

  toHome() {
    this.router.navigate([`/home/${this.userNameLastName}`]);
  }

  guardarDatosViaje(origen, destino, rutPasajero) {
    return{
      "origen": origen,
      "destino": destino,
      "rut": rutPasajero,
      "precio": 5000
    }
  }

  getUbicacion() {
    let result;
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        result = resp;
        console.log(resp);
      })
      .catch((error) => {
        console.log('Error getting location', error);
      });

    const watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      console.log(data);
    });
    return result || 0;
  }

  async postTrip(){
    const headers = {
      'Content-Type': 'text/plain',
      "Access-Control-Allow-Origin": "*",
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      "Access-Control-Allow-Headers": "x-access-token, Origin, X-Requested-With, Content-Type, Accept"

    };

    await axios
      .post(
        'https://xmdsydoicb.execute-api.us-east-1.amazonaws.com/addTripPasajeroDuocar',
        {
          id: uuidv4(),
          origen: this.trip.value.origen,
          destino: this.trip.value.destino,
          monto: 5000,
          rutPasajero: JSON.parse(localStorage.getItem('user')).rut,
          status: 1
      }, {headers}
        )
        .then(function (response) {
        console.log('axios ok', response);
        localStorage.setItem("viajesDisponibles", JSON.stringify(response.data));
        alert("Viaje pedido correctamente")
        return response;
      })
      .catch(function (error) {
        console.log('axios oknt', error);
        localStorage.setItem("viajesDisponibles", JSON.stringify([]));
        return {error: error};
      });
      const origenInput:any = document.getElementById("origen");
      origenInput.value = ""
      const destinoInput:any = document.getElementById("destino");
      destinoInput.value = ""
      //document.getElementById("destino").nodeValue = "";
    }
}

/* map.addControl(
  new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl
  }) */
