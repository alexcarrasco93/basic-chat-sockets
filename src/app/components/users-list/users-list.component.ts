import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  activeUsers$ = this.chatService.getActiveUsers();

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.emitActiveUsers();
  }
}
