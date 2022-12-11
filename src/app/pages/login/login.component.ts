import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WebsocketService } from '../../services/websocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  name = '';

  constructor(private wsService: WebsocketService, private router: Router) {}

  login() {
    if (this.name) {
      this.wsService
        .loginWS(this.name)
        .then(() => this.router.navigateByUrl('/chat'));
    }
  }
}
