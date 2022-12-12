import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { MarkersResponse } from '../interfaces/markers-response';
import { Place } from '../interfaces/place';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private http: HttpClient, private wsService: WebsocketService) {}

  getMapMarkers() {
    return this.http.get<MarkersResponse>(`${environment.wsUrl}/map`);
  }

  emitNewMarker(marker: Place) {
    this.wsService.emit('new-marker', marker);
  }

  listenNewMarkers() {
    return this.wsService.listen<Place>('new-marker');
  }

  emitDeleteMarker(id: string) {
    this.wsService.emit('delete-marker', id);
  }

  listenDeleteMarkers() {
    return this.wsService.listen<string>('delete-marker');
  }

  emitMoveMarker(marker: Place) {
    this.wsService.emit('move-marker', marker);
  }

  listenMoveMarkers() {
    return this.wsService.listen<Place>('move-marker');
  }
}
