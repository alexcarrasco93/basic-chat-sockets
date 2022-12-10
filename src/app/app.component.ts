import { Component, OnInit } from '@angular/core';
import { ChatService } from './services/chat.service';
import { WebsocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private wsService: WebsocketService,
    private chatService: ChatService
  ) {
    this.wsService.checkStatus();
  }

  ngOnInit() {
    this.chatService.getPrivateChatMessages().subscribe();
  }
}
