import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BehaviorSubject, map, mergeMap, shareReplay } from 'rxjs';
import { environment } from '../../environments/environment';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root',
})
export class GraphicDataService {
  constructor(private wsService: WebsocketService, private http: HttpClient) {
    this.getData();
  }

  getData() {
    this.wsService.emit('graphic-data');
  }

  changeGraphicValue(month: string) {
    return this.http.post(`${environment.wsUrl}/graphic`, { month, value: 1 });
  }

  private transforDataToGraphicData = ({ data }: { data: number[] }) => {
    return <ChartConfiguration['data']>{
      datasets: [
        {
          data,
          label: 'Sells',
          backgroundColor: 'rgba(255,0,0,0.3)',
          borderColor: 'red',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)',
          fill: 'origin',
        },
      ],
      labels: ['January', 'February', 'March', 'April'],
    };
  };

  private _data$ = new BehaviorSubject<void>(undefined);

  private dataSocket$ = this.wsService
    .listen<{ data: number[] }>('graphic-change')
    .pipe(map(this.transforDataToGraphicData));

  data$ = this._data$.pipe(
    mergeMap(() => this.dataSocket$),
    shareReplay(1)
  );
}
