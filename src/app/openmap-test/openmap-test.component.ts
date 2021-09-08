import { Component, OnInit } from '@angular/core';

declare var ol: any;

@Component({
  selector: 'app-openmap-test',
  templateUrl: './openmap-test.component.html',
  styleUrls: ['./openmap-test.component.scss']
})
export class OpenmapTestComponent implements OnInit {

  constructor() { }

  latitude: number = 52.238;
  longitude: number = 20.901;

  map: any;

  ngOnInit() {

    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([52.238, 20.901]),
        zoom: 8
      })
    });

    this.addPoint(this.latitude, this.longitude);
  }

  addPoint(lat: number, lng: number) {
    var vectorLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [new ol.Feature({
          geometry: new ol.geom.Point(ol.proj.transform([lng, lat], 'EPSG:4326', 'EPSG:3857')),
        })]
      }),
      style: new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 0.5],
          anchorXUnits: "fraction",
          anchorYUnits: "fraction",
          src: "assets/marker.png"
        })
      })
    });
    this.map.addLayer(vectorLayer);
    }

}
