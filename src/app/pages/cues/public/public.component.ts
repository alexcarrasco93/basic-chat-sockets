import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ticket } from '../../../interfaces/ticket';
import { TicketsService } from '../../../services/tickets.service';

@Component({
  selector: 'app-public',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css'],
})
export class PublicComponent implements OnInit {
  @Input()
  tickets: Ticket[] = [];

  get lastTicket() {
    return this.tickets ? this.tickets[this.tickets.length - 1] : undefined;
  }

  get previousTickets() {
    return this.tickets
      ?.filter((element, index) => index < this.tickets.length - 1)
      .reverse();
  }

  constructor(private ticketsService: TicketsService) {}

  ngOnInit(): void {
    this.ticketsService.emitGetAttendingTickets();
  }
}
