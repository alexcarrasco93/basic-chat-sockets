import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ticket } from '../../../interfaces/ticket';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.css'],
})
export class NewTicketComponent {
  @Input()
  tickets: Ticket[] = [];

  @Output()
  newTicket = new EventEmitter();

  get lastTicket() {
    return this.tickets[this.tickets.length - 1];
  }

  createNewTicket() {
    this.newTicket.emit();
  }
}
