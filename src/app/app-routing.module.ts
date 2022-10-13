import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, } from '@angular/router';
import { AuthGuardService } from './service/auth-guard.service';

const routes: Routes = [
  {
    path: 'home/:userName',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    //canActivate: [AuthGuardService]
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
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'register-car',
    loadChildren: () => import('./register-car/register-car.module').then( m => m.RegisterCarPageModule)
  },
  {
    path: 'home-conductor',
    loadChildren: () => import('./home-conductor/home-conductor.module').then( m => m.HomeConductorPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'trip-view',
    loadChildren: () => import('./trip-view/trip-view.module').then( m => m.TripViewPageModule)
  },
  {
    path: 'trip-history',
    loadChildren: () => import('./trip-history/trip-history.module').then( m => m.TripHistoryPageModule)
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
