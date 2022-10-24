import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { loadingController } from '@ionic/core';
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

  buildMap = (): Promise<any> => {
    return new Promise((resolve, rejects) => {
      try {
        this.map = new mapboxgl.Map({
          container: 'map',
          style: this.style,
          zoom: this.zoom,
          center: [this.lng, this.lat],
        });
        const marker1 = new mapboxgl.Marker()
        .setLngLat([-33.43253904595325,-70.61587143826715 ])
        .addTo(this.map);
        this.map.addControl(
          new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl,
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
  };
}
