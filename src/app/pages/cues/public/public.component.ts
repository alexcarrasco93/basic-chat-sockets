import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
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
export class PublicComponent implements OnInit, OnChanges {
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

  ngOnChanges(changes: SimpleChanges) {
    const tickets: Ticket[] = changes['tickets']?.currentValue;
    const ticketsPrevious: Ticket[] = changes['tickets']?.previousValue;
    const isFirstChange = changes['tickets'].firstChange;
    if (
      !isFirstChange &&
      ticketsPrevious &&
      JSON.stringify(ticketsPrevious) !== JSON.stringify(tickets)
    ) {
      this.playAudio();
    }
  }

  private playAudio() {
    let audio = new Audio();
    audio.src = '../../../../assets/audio/new-ticket.mp3';
    audio.autoplay = true;
    audio.load();
    audio.play();
  }
}
