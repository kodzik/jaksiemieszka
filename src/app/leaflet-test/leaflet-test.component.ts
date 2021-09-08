import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../marker.service';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-leaflet-test',
  templateUrl: './leaflet-test.component.html',
  styleUrls: ['./leaflet-test.component.scss']
})
export class LeafletTestComponent implements OnInit, AfterViewInit {

    private map: any;

    private initMap(): void {
      this.map = L.map('map', {
        center: [ 39.8282, -98.5795 ],
        zoom: 3
      });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    L.marker([51.5, -0.09]).addTo(this.map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();
  }
  constructor(private markerService: MarkerService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.markerService.makeCapitalCircleMarkers(this.map);

  }

}
