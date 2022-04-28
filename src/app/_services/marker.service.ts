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

  // markers: any[] = []
  markersWithId: any[] = []
  currentMarker: any;

  tempLayer: L.LayerGroup;
  tempMarkerToDelete: Subject<any> = new Subject<any>();

  enableMarkers: boolean = false;

  clickedMarker: Subject<any> = new Subject<any>();
  currentMarkerChange: Subject<any> = new Subject<any>();
  markerData: Subject<any> = new Subject<any>();

  capitals: string = '/assets/data/usa-capitals.geojson';

  constructor(
    private http: HttpClient,
    private popupService: PopupService ) {}

  static scaledRadius(val: number, maxVal: number): number {
    return 20 * (val / maxVal);
  }

  addMarker(map: L.Map, lng: number, lat: number, draggable?: boolean) {
    let marker = L.marker([lng, lat], {draggable: draggable})
    .on('dragend', (e) => {
      this.changeCurrentMarker(e.target);
		})
    this.tempLayer = L.layerGroup()
    this.tempLayer.addLayer(marker)
    this.tempLayer.addTo(map)
  }

  addMarker2(map: L.Map, lng: number, lat: number, comment: IComment) {
    const group = L.layerGroup()
    let marker = L.marker([lng, lat])
    // .addTo(map)
    .on('dragend', (e) => {
      this.changeCurrentMarker(e.target);
		})
    .on('click', (e) => {
      this.clickedMarker.next(this.markersWithId.find(obj => group.getLayerId(obj.group.getLayers()[0]) === group.getLayerId(marker)));
    })
    .bindPopup(`
    <h4 style="position: absolute; color: #EC5434; font-size: 15px; bottom: 35%">${comment.username}</h4>
    <div>Ocena: ${this.calculateAvgScore(comment)}</div>`)
    group.addLayer(marker);
    this.markersWithId.push({id: comment.id, group: group})
    group.addTo(map);
  }

  deleteAllMarkers(){
    this.markersWithId.forEach(element => {
      element.group.removeLayer(element.group.getLayerId(element.group.getLayers()[0]))
    });
    this.markersWithId.length = 0;
  }

  deleteMarker(){
    this.tempMarkerToDelete.next(this.tempLayer)
  }

  getAddressFromMarker(latlng: any){
    const apiAddr = `https://nominatim.openstreetmap.org/reverse?lat=${latlng.lat}&lon=${latlng.lng}&format=json`
    this.http.get(apiAddr).subscribe(response => {
      this.markerData.next(response)
    })
  }

  calculateAvgScore(comment: IComment): number{
    let index = 0;
    let avg = 0;

    Object.values(comment.rating).forEach(element => {
      avg += element;
      index+=1;
    })
    return (avg / index);
  }

  // getAddressFromMarker__2(latlng: any){
  //   const apiAddr = `https://nominatim.openstreetmap.org/reverse?lat=${latlng.lat}&lon=${latlng.lng}&format=json`
  //   return this.http.get(apiAddr)
  // }

  changeCurrentMarker(marker: any) {
    this.currentMarkerChange.next(marker);
  }

  // addMarkerFromComment(comment: any){
  //   this.markers.push({id: comment.id, location: comment.location})
  //   // this.markers.push(comment.location)
  // }

  // makeCapitalMarkers(map: L.Map): void {
  //   this.http.get(this.capitals).subscribe((res: any) => {
  //     for (const c of res.features) {
  //       const lon = c.geometry.coordinates[0];
  //       const lat = c.geometry.coordinates[1];
  //       const circle = L.circleMarker([lat, lon], { radius: 20 });

  //       circle.addTo(map);
  //     }
  //   });
  // }

  // TODO MAKE USE OF IT!
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
