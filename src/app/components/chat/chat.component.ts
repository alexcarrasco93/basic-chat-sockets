import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  text = '';
  messages$ = this.chatService.messages$.pipe(tap(() => this.scrollDown()));

  @ViewChild('chatMessages')
  chatMessagesEl!: ElementRef;

  constructor(private chatService: ChatService) {}

  send() {
    if (this.text) {
      this.chatService.sendMessage(this.text);
      this.text = '';
    }
  }

  private scrollDown() {
    setTimeout(() => {
      this.chatMessagesEl.nativeElement.scrollTop =
        this.chatMessagesEl.nativeElement.scrollHeight;
    }, 50);
  }
}
