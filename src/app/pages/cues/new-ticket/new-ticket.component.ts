import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ticket } from '../../../interfaces/ticket';
import { TicketsService } from '../../../services/tickets.service';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.css'],
})
export class NewTicketComponent implements OnInit {
  @Input()
  tickets: Ticket[] = [];

  @Output()
  newTicket = new EventEmitter();

  get lastTicket() {
    return this.tickets[this.tickets.length - 1];
  }

  constructor(private ticketsService: TicketsService) {}

  ngOnInit() {
    this.ticketsService.emitGetTicketsToAttend();
  }

  createNewTicket() {
    this.newTicket.emit();
  }
}
