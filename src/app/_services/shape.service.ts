import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShapeService {

  constructor(private http: HttpClient) { }

  getStateShapes() {
    return this.http.get(`${environment.static}/assets/data/warszawa-dzielnice.geojson`);
  }

}
