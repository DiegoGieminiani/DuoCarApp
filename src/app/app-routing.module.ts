import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, } from '@angular/router';
import { RegisterCarPageModule } from './register-car/register-car.module';
import { AuthGuardService } from './service/auth-guard.service';
import { RegisterPage } from '../app/register/register.page';
import { RegisterCarPage } from './register-car/register-car.page';
import { HomeConductorPage } from './home-conductor/home-conductor.page';
import { ProfilePage } from './profile/profile.page';
import { TripViewPageModule } from './trip-view/trip-view.module';
import { TripHistoryPage } from './trip-history/trip-history.page';
import { HomePage } from './home/home.page';
import { LoginPage } from './login/login.page';
import { SwitchUserPage } from './switch-user/switch-user.page';
import { PageNotFoundPage } from './page-not-found/page-not-found.page';


const routes: Routes = [
  {
    path: 'home/:userName',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    component: HomePage
    //canActivate: [AuthGuardService]
  },
  {
    path: '',
    redirectTo: 'switch-user',
    pathMatch: 'full'
  },
  {
    path: 'switch-user',
    component: SwitchUserPage
  },
  {
    // dos puntos es un parametro
    path: 'login/:userType', // para pasar un parametro por path se usa :parametro
    component: LoginPage
  },
  {
    path: 'register/:userType',
    component: RegisterPage
  },
  {
    path: 'register-car',
    component: RegisterCarPage
  },
  {
    path: 'home-conductor/:userType',
    component: HomeConductorPage
  },
  {
    path: 'profile',
    component: ProfilePage
  },
  {
    path: 'trip-view',
    component: TripViewPageModule
  },
  {
    path: 'trip-history',
    component: TripHistoryPage
  },
  {
    path: '**',
    component: PageNotFoundPage
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
