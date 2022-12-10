import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { WebsocketService } from '../services/websocket.service';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(private wsService: WebsocketService, private router: Router) {}

  canActivate() {
    if (this.wsService.getUser()) {
      return true;
    }
    this.router.navigateByUrl('/login');
    return false;
  }
}
