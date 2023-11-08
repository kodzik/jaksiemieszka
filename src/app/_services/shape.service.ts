import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class ShapeService {
  districtLayer: any;

  constructor(private http: HttpClient) {
    this.getDistrictLayer();
  }

  private getDistrictLayer() {
    this.http
      .get(`${environment.static}/assets/data/warszawa-dzielnice.geojson`)
      .toPromise()
      .then((districts) => {
        this.districtLayer = this.initDistrictLayer(districts);
      });
  }

  private initDistrictLayer(districts: any) {
    return L.geoJSON(districts, {
      style: (feature) => ({
        weight: 3,
        opacity: 0.3,
        color: '#008f68',
        fillOpacity: 0.3,
        fillColor: '#6DB65B',
      }),

      onEachFeature: (feature, layer) =>
        layer.on({
          mouseover: (e) => {
            layer.bindTooltip(feature.properties.name).openTooltip(),
              this.highlightFeature(e);
          },
          mouseout: (e) => this.resetFeature(e),
        }),
    });
  }

  private highlightFeature(e: any) {
    const layer = e.target;

    layer.setStyle({
      weight: 10,
      opacity: 0.5,
      color: '#DFA612',
      fillOpacity: 0.5,
      fillColor: '#FAE042',
    });
  }

  private resetFeature(e: any) {
    const layer = e.target;

    layer.setStyle({
      weight: 3,
      opacity: 0.3,
      color: '#008f68',
      fillOpacity: 0.3,
      fillColor: '#6DB65B',
    });
  }
}
