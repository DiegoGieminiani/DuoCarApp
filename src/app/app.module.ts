import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage-angular';
import {AuthGuardService} from './service/auth-guard.service';
import {AuthenticationService} from './service/authentication.service';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TripHistoryPage } from './trip-history/trip-history.page';

import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';


@NgModule({
  declarations: [AppComponent, TripHistoryPage],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot()],
  providers: [AuthenticationService, AuthGuardService, Geolocation, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
