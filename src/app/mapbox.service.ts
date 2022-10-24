import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MapboxService {
  mapbox = mapboxgl as typeof mapboxgl;
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = -33.43253904595325;
  lng = -70.61587143826715;
  zoom = 10;

  constructor() {
    this.mapbox.accessToken = environment.mapPk;
  }

  buildMap = (locationNow: any):  Promise<any> => new Promise((resolve, rejects) => {
      console.log('mapawawawawa',locationNow);
      try {
        this.map = new mapboxgl.Map({
          container: 'map',
          style: this.style,
          zoom: this.zoom,
          center: [locationNow.coords.lng, locationNow.coords.lat],
        });
        this.map.addControl(
          new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl,
          }),
        );

        const geocoder = new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl,
        });
        resolve({
          value: {
            map: this.map,
            geocoder,
          },
        });
      } catch (e) {
        rejects(e);
      }
    });
}
