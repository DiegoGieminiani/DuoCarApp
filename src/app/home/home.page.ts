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

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {
  @ViewChild('asGeoCoder') asGeoCoder: ElementRef;
  username = this.route.snapshot.paramMap.get('userName');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mapboxService: MapboxService,
    private renderer2: Renderer2,
    private geolocation: Geolocation
  ) {}

  ngOnInit(): void {
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
    this.router.navigate([`/home/${this.username}`]);
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
}

/* map.addControl(
  new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl
  }) */
