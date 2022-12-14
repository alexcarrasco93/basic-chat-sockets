import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Ticket } from '../../interfaces/ticket';
import { TicketsService } from '../../services/tickets.service';
import { DesktopComponent } from './desktop/desktop.component';
import { HomeComponent } from './home/home.component';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { PublicComponent } from './public/public.component';

@Component({
  selector: 'app-cues',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    DesktopComponent,
    HomeComponent,
    NewTicketComponent,
    PublicComponent,
  ],
  templateUrl: './cues.component.html',
  styleUrls: ['./cues.component.css'],
})
export class CuesComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private ticketsService: TicketsService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.screen = params['screen'];
      this.desktop = params['desktop'];
    });
  }

  screen!: string;
  desktop!: string;

  ticketsToAttend$ = this.ticketsService.ticketsToAttend$;
  attendingTickets$ = this.ticketsService.attendingTickets$;

  createNewTicket() {
    this.ticketsService.newTicket();
  }

  attendTicket({
    ticket,
    attendedId,
  }: {
    ticket: Ticket;
    attendedId?: number;
  }) {
    console.log(ticket);
    this.ticketsService.attendTicket(ticket, attendedId);
  }
}
