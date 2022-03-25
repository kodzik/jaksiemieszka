import { Component, OnInit } from '@angular/core';
import { MarkerService } from "../_services/marker.service";
import * as L from 'leaflet';
import { icon, Marker } from 'leaflet';
import { CommentService } from '../_services/comment.service';
import { IComment } from '../_models/comment';
import { ShapeService } from '../_services/shape.service';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  public map: any;
  districts: any;
  testMessage: IComment;

  currentMarker: any;

  public initMap(): void {
    this.map = L.map('map', {
      center: [52.217779314315, 21.042614221109],
      zoom: 11
    });

    // this.map = L.map('map').setView([52.217779314315, 21.042614221109], 11);

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    //test marker
    L.marker([52.261348417047, 21.025018929958]).addTo(this.map)
    // .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    // .openPopup();
  }

  constructor(
    private markerService: MarkerService,
    private commentService: CommentService,
    private shapeService: ShapeService) {
    }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.initMap();

    this.map.on("click", (e: { latlng: { lng: number; lat: number; }; }) => {
      // L.marker([e.latlng.lat, e.latlng.lng], this.markerIcon).addTo(this.map); // add the marker onclick
      if(this.markerService.enableMarkers){
        this.markerService.addMarker(this.map, e.latlng.lat, e.latlng.lng, '')
        this.markerService.changeCurrentMarker(e)
        this.markerService.enableMarkers = false;
      }
    });

    this.commentService.highlightedComment.subscribe(comment => {
      this.testMessage = comment
      console.log(this.testMessage);
      this.markerService.addMarkerFromComment(this.map, this.testMessage)
    });

    this.shapeService.getStateShapes().subscribe(states => {
      this.districts = states;
      this.initDistrictLayer();
    });
  }

  private initDistrictLayer() {
    const stateLayer = L.geoJSON(this.districts, {
      style: (feature) => ({
        weight: 3,
        opacity: 0.3,
        color: '#008f68',
        fillOpacity: 0.3,
        fillColor: '#6DB65B'
      }),

      onEachFeature: (feature, layer) => (
        layer.on({
          mouseover:  (e) => (this.highlightFeature(e)),
          mouseout:   (e) => (this.resetFeature(e)),
          click:      (e) => ( console.log("District: ", feature.properties.name) )
        })
      )
    });

    this.map.addLayer(stateLayer);
    stateLayer.bringToBack();
  }

  private highlightFeature(e: any) {
    const layer = e.target;

    layer.setStyle({
      weight: 10,
      opacity: 0.5,
      color: '#DFA612',
      fillOpacity: 0.5,
      fillColor: '#FAE042'
    });
  }

  private resetFeature(e: any) {
    const layer = e.target;

    layer.setStyle({
      weight: 3,
      opacity: 0.3,
      color: '#008f68',
      fillOpacity: 0.3,
      fillColor: '#6DB65B'
    });
  }

}
