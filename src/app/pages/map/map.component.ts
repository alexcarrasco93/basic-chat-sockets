import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapComponent } from 'ngx-mapbox-gl';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { MarkersResponse } from '../../interfaces/markers-response';
import { Place } from '../../interfaces/place';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MyMapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map')
  map!: MapComponent;

  center: mapboxgl.LngLatLike = [-75.75512993582937, 45.349977429009954];

  places: MarkersResponse = {};

  mapsMarkers: { [id: string]: mapboxgl.Marker } = {};

  private ngUnsubscribe = new Subject<void>();

  constructor(private mapService: MapService) {}

  ngAfterViewInit() {
    this.mapService.getMapMarkers().subscribe((res) => {
      this.places = res;
      for (const [key, marker] of Object.entries(this.places)) {
        this.addMarker(marker);
      }
    });
    this.listenToSockets();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  listenToSockets() {
    this.mapService
      .listenNewMarkers()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((marker) => this.addMarker(marker));
    this.mapService
      .listenDeleteMarkers()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((id) => {
        console.log(id);
        this.mapsMarkers[id].remove();
        delete this.mapsMarkers[id];
        delete this.places[id];
      });
    this.mapService
      .listenMoveMarkers()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((marker) =>
        this.mapsMarkers[marker.id].setLngLat([marker.lng, marker.lat])
      );
  }

  createMarker() {
    const customMarker: Place = {
      id: new Date().toISOString(),
      name: 'New marker',
      lng: -75.75512993582937,
      lat: 45.349977429009954,
      color: '#' + Math.floor(Math.random() * 16777215).toString(16),
    };
    this.addMarker(customMarker);

    this.mapService.emitNewMarker(customMarker);
  }

  private addMarker(marker: Place) {
    const h2 = document.createElement('h2');
    h2.innerHTML = marker.name!;

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = 'Delete';

    const div = document.createElement('div');
    div.append(h2, deleteBtn);

    const customPopup = new mapboxgl.Popup({
      offset: 25,
      closeOnClick: false,
    }).setDOMContent(div);

    const newMarker = new mapboxgl.Marker({
      draggable: true,
      color: marker.color,
    })
      .setLngLat([marker.lng, marker.lat])
      .setPopup(customPopup)
      .addTo(this.map.mapInstance)
      .on('drag', () => {
        const lngLat = newMarker.getLngLat();

        this.mapService.emitMoveMarker({
          id: marker.id,
          ...lngLat,
        });
      });

    deleteBtn.addEventListener('click', () => {
      newMarker.remove();

      this.mapService.emitDeleteMarker(marker.id);
    });

    this.mapsMarkers[marker.id] = newMarker;
  }
}
