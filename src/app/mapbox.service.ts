import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { loadingController } from '@ionic/core';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

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
  constructor(    private geolocation: Geolocation    ) {
    this.mapbox.accessToken = environment.mapPk;

  }

  buildMap = (): Promise<any> => {


    return new Promise(async (resolve, rejects) => {
      try {
        let result;
        await this.geolocation
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
        console.log('result in map', result)
        this.map = new mapboxgl.Map({
          container: 'map',
          style: this.style,
          zoom: this.zoom,
          center: [result.coords.longitude, result.coords.latitude],
        });
        new mapboxgl.Marker()
        .setLngLat([result.coords.longitude, result.coords.latitude])
        .addTo(this.map);
        this.map.addControl(
          new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl,
          }),

        );

        const geocoder = new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl: mapboxgl,
        });
        resolve({
          value: {
            map: this.map,
            geocoder: geocoder,
          },
        });
      } catch (e) {
        rejects(e);
      }
    });
  };
}
