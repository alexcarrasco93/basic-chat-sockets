import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((mod) => mod.LoginComponent),
  },
  {
    path: 'chat',
    loadComponent: () =>
      import('./pages/messages/messages.component').then(
        (mod) => mod.MessagesComponent
      ),
    canActivate: [UserGuard],
  },
  {
    path: 'graphic',
    loadComponent: () =>
      import('./pages/graphic/graphic.component').then(
        (mod) => mod.GraphicComponent
      ),
    canActivate: [UserGuard],
  },
  {
    path: 'map',
    loadChildren: () =>
      import('./pages/map/map.module').then(
        (mod) => mod.MapModule
      ),
    canActivate: [UserGuard],
  },
  { path: '', redirectTo: '/chat', pathMatch: 'full' },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/login/login.component').then((mod) => mod.LoginComponent),
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
