import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { PopupService } from './popup.service';
import { IComment } from '../_models/comment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  markers: any[] = []
  markersWithId: any[] = []

  enableMarkers: boolean = false;

  currentMarkerChange: Subject<any> = new Subject<any>();
  markerData: Subject<any> = new Subject<any>();
  currentMarker: any;

  capitals: string = '/assets/data/usa-capitals.geojson';

  constructor(
    private http: HttpClient, 
    private popupService: PopupService ) {}

  static scaledRadius(val: number, maxVal: number): number {
    return 20 * (val / maxVal);
  }

  addMarker(map: L.Map, lng: number, lat: number, content: string, draggable?: boolean, comment?: any) {
    L.marker([lng, lat], {draggable: draggable})
    .addTo(map)
    .on('dragend', (e) => {
      this.changeCurrentMarker(e.target);
		})
  }

  addMarker2(map: L.Map, lng: number, lat: number, comment: IComment) {
    const group = L.layerGroup()
    let marker = L.marker([lng, lat])
    // .addTo(map)
    .on('dragend', (e) => {
      this.changeCurrentMarker(e.target);
		})
    .on('click', (e) => {
      // TODO scroll to comment

      // const result = this.markersWithId.find(obj => obj.group.getLayerId(marker) === group.getLayerId(marker));
      // const mark = group.getLayerId(marker)
      // console.log(`marker on click ${mark}, ${result}`);
    })
    .bindPopup(`<div>${comment.avg}</div>`)
    group.addLayer(marker);
    this.markersWithId.push({id: comment.id, group: group})
    group.addTo(map);
  }

  getAddressFromMarker(latlng: any){
    const apiAddr = `https://nominatim.openstreetmap.org/reverse?lat=${latlng.lat}&lon=${latlng.lng}&format=json`    
    this.http.get(apiAddr).subscribe(response => {
      this.markerData.next(response)
    })
  }

  getAddressFromMarker__2(latlng: any){
    const apiAddr = `https://nominatim.openstreetmap.org/reverse?lat=${latlng.lat}&lon=${latlng.lng}&format=json`    
    return this.http.get(apiAddr)
  }

  changeCurrentMarker(marker: any) {
    this.currentMarkerChange.next(marker);
  }

  addMarkerFromComment(comment: any){
    this.markers.push({id: comment.id, location: comment.location})
    // this.markers.push(comment.location)
  }

  makeCapitalMarkers(map: L.Map): void {
    this.http.get(this.capitals).subscribe((res: any) => {
      for (const c of res.features) {
        const lon = c.geometry.coordinates[0];
        const lat = c.geometry.coordinates[1];
        const circle = L.circleMarker([lat, lon], { radius: 20 });

        circle.addTo(map);
      }
    });
  }

  makeCapitalCircleMarkers(map: L.Map): void {
    this.http.get(this.capitals).subscribe((res: any) => {

      const maxPop = Math.max(...res.features.map((x:any) => x.properties.population), 0);

      for (const c of res.features) {
        const lon = c.geometry.coordinates[0];
        const lat = c.geometry.coordinates[1];
        const circle = L.circleMarker([lat, lon], {
          radius: MarkerService.scaledRadius(c.properties.population, maxPop)
        });

        circle.bindPopup(this.popupService.makeCapitalPopup(c.properties));
        circle.addTo(map);
      }
    });
  }

}
