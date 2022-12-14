import { Injectable } from '@angular/core';
import { BehaviorSubject, mergeMap, shareReplay, tap } from 'rxjs';
import { Ticket } from '../interfaces/ticket';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  constructor(private wsService: WebsocketService) {
    this.emitGetTicketsToAttend();
    this.emitGetAttendingTickets();
  }

  emitGetTicketsToAttend() {
    this.wsService.emit('get-tickets-to-attend');
  }

  emitGetAttendingTickets() {
    this.wsService.emit('get-attending-tickets');
  }

  newTicket() {
    this.wsService.emit('new-ticket');
  }

  attendTicket(ticket: Ticket, attendedId?: number) {
    this.wsService.emit('attend-ticket', { ticket, attendedId });
  }

  private _ticketsToAttend$ = new BehaviorSubject<void>(undefined);

  private ticketsToAttendSocket$ = this.wsService.listen<Ticket[]>(
    'get-tickets-to-attend'
  );

  ticketsToAttend$ = this._ticketsToAttend$.pipe(
    mergeMap(() => this.ticketsToAttendSocket$),
    shareReplay(1)
  );

  private _attendingTickets$ = new BehaviorSubject<void>(undefined);

  private attendingTicketsSocket$ = this.wsService.listen<Ticket[]>(
    'get-attending-tickets'
  );

  attendingTickets$ = this._attendingTickets$.pipe(
    mergeMap(() => this.attendingTicketsSocket$),
    tap((res) => console.log('attendingTickets$', res)),
    shareReplay(1)
  );
}
