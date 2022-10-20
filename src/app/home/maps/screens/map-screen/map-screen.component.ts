import {Component} from '@angular/core';
import { MapsService } from '../../services';

@Component({
  selector: 'app-map-screen',
  templateUrl: './map-screen.component.html',
  styleUrls: ['./map-screen.component.scss'],
})
export class MapScreenComponent {

  // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-shadow
  constructor(private MapsService: MapsService) { }

  get isUserLocationReady() {
    return this.MapsService.isUserLocationReady;
  }

}

