import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socketStatusSubject = new Subject<boolean>();
  socketStatus$ = this.socketStatusSubject.asObservable();

  constructor(private socket: Socket) {}

  checkStatus() {
    this.socket.on('connect', () => {
      console.log('connected to server');
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
}
