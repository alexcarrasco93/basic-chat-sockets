import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Message } from '../interfaces/message';
import { User } from '../interfaces/user';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private messages: Message[] = [];
  messages$ = this.getMessages().pipe(
    map((newMsg) => {
      this.messages.push(newMsg);
      return this.messages;
    })
  );

  constructor(private wsService: WebsocketService) {}

  sendMessage(msg: string) {
    const payload: Message = {
      from: this.wsService.getUser()!.name,
      msg,
    };

    this.wsService.emit('message', payload);
  }

  getMessages() {
    return this.wsService.listen<Message>('new-message');
  }

  getPrivateChatMessages() {
    return this.wsService.listen<Message>('private-message');
  }

  getActiveUsers() {
    return this.wsService.listen<User[]>('active-users');
  }

  emitActiveUsers() {
    this.wsService.emit('emit-users');
  }
}
