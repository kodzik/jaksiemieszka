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

  enableMarkers: boolean = false;

<<<<<<< HEAD
=======
  currentMarkerChange: Subject<any> = new Subject<any>();
  currentMarker: any;

>>>>>>> 7deeb54bcf789398240138d794eaf83092a3beaf
  capitals: string = '/assets/data/usa-capitals.geojson';

  constructor(private http: HttpClient, private popupService: PopupService ) {
    this.currentMarkerChange.subscribe((value) => {
      this.currentMarker = value
    });
   }

  static scaledRadius(val: number, maxVal: number): number {
    return 20 * (val / maxVal);
  }

  addMarker(map: L.Map, lng: number, lat: number, content: string): void {
    L.marker([lng, lat], {draggable: true})
    .addTo(map)
    .on('dragend', (e) => {
			// var coord = String(e).split(',');
			console.log(e.target._latlng);
      this.changeCurrentMarker(e.target._latlng);
			// var lat = coord[0].split('(');
			// console.log(lat);
			// var lng = coord[1].split(')');
			// console.log(lng);
			// myMarker.bindPopup("Moved to: " + lat[1] + ", " + lng[0] + ".");
		});
    // .bindPopup(content)
    // .openPopup();
    // const lon = c.geometry.coordinates[0];
    // const lat = c.geometry.coordinates[1];
  }

  changeCurrentMarker(marker: any) {
    this.currentMarkerChange.next(marker);
}

  addMarkerFromComment(map: L.Map, comment: IComment){
    this.addMarker(map, comment.location.lat, comment.location.lng, '')
  }

<<<<<<< HEAD
  makeCapitalMarkers(map: L.Map): void {
=======
  makeCapitalMarkers(map: L.Map): void { 
>>>>>>> 7deeb54bcf789398240138d794eaf83092a3beaf
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
