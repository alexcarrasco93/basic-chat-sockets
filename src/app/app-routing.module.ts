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
    path: 'messages',
    loadComponent: () =>
      import('./pages/messages/messages.component').then(
        (mod) => mod.MessagesComponent
      ),
    canActivate: [UserGuard],
  },
  { path: '', redirectTo: '/messages', pathMatch: 'full' },
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
