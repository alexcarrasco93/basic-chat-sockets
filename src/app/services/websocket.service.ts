import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { Subject } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socketStatusSubject = new Subject<boolean>();
  socketStatus$ = this.socketStatusSubject.asObservable();

  user?: User;

  constructor(private socket: Socket, private router: Router) {
    this.loadUserStorage();
  }

  checkStatus() {
    this.socket.on('connect', () => {
      console.log('connected to server');
      this.loadUserStorage();
      this.socketStatusSubject.next(true);
    });

    this.socket.on('disconnect', () => {
      console.log('disconnected from the server');
      this.socketStatusSubject.next(false);
    });
  }

  emit(event: string, payload?: any, callback?: Function) {
    this.socket.emit(event, payload, callback);
  }

  listen<Type>(event: string) {
    return this.socket.fromEvent<Type>(event);
  }

  loginWS(name: string) {
    return new Promise((resolve, reject) => {
      this.emit(
        'configure-user',
        { name },
        (res: { ok: boolean; msg: string }) => {
          this.user = { name };
          this.saveUserStorage();
          resolve(res);
        }
      );
    });
  }

  logout() {
    this.user = undefined;
    localStorage.removeItem('user');
    this.emit('configure-user', { name: 'no-name' }, () => {});
    this.router.navigateByUrl('/login');
  }

  getUser() {
    return this.user;
  }

  saveUserStorage() {
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  loadUserStorage() {
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
      this.loginWS(this.user!.name);
    }
  }
}
