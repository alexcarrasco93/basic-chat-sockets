import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Message } from '../interfaces/message';
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
      from: 'Alex',
      msg,
    };

    this.wsService.emit('message', payload);
  }

  getMessages() {
    return this.wsService.listen<Message>('new-message');
  }
}
