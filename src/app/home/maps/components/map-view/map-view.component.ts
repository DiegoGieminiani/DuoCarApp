import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Map } from 'mapbox-gl';

import { MapsService } from '../../services';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss'],
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild('mapDiv')
  mapDivElement!: ElementRef;

  constructor(private mapsService: MapsService) { }

  ngAfterViewInit(): void {
    if (!this.mapsService.useLocation) {throw new Error('No hay mapsService.userLocation');}

    const map = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.mapsService.useLocation,
      zoom: 14,

    });

  }

}

