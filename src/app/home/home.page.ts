import { Component, OnInit, ViewChild,ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MapboxService } from '../mapbox.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('asGeoCoder') asGeoCoder: ElementRef;
  username = this.route.snapshot.paramMap.get('userName');


  constructor(private route: ActivatedRoute, private router: Router, private mapboxService: MapboxService, private renderer2: Renderer2) {}

  ngOnInit(): void{
    this.mapboxService.buildMap()
      .then(({map ,geocoder}) =>{
        //this.asGeoCoder

        document.getElementById('geocoder').appendChild(geocoder.onAdd(map));//Agrego el buscador de GeoCoder a Un input fuera del mapa

        console.log('***********TODO BIEN***********');
      })
      .catch(err => {
        console.log('********ERROR****************',err);
      })
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

}
/* map.addControl(
  new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl
  }) */