import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapScreenComponent } from './screens/map-screen/map-screen.component';
import { LoadingComponent } from './components/loading/loading.component';



@NgModule({
  declarations: [
    MapScreenComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MapScreenComponent,
  ]
})
export class MapsModule { }
