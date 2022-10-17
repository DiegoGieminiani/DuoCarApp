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


const routes: Routes = [
  {
    path: 'home/:userName',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: '',
    redirectTo: 'switch-user',
    pathMatch: 'full'
  },
  {
    path: 'switch-user',
    loadChildren: () => import('./switch-user/switch-user.module').then( m => m.SwitchUserPageModule)
  },
  {
    // dos puntos es un parametro
    path: 'login/:userType', // para pasar un parametro por path se usa :parametro
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
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
    component: HomeConductorPage,
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile',
    component: ProfilePage,
    canActivate: [AuthGuardService]
  },
  {
    path: 'trip-view',
    component: TripViewPageModule,
    canActivate: [AuthGuardService]
  },
  {
    path: 'trip-history',
    component: TripHistoryPage,
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    loadChildren: () => import('./page-not-found/page-not-found.module').then( m => m.PageNotFoundPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
