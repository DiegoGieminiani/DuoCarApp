import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home/:userName',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
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
    path: 'login/:userType', // para pasar un parametro por path se usa :parametro
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
