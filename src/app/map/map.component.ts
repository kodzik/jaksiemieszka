import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MarkerService } from "../_services/marker.service";
import * as L from 'leaflet';
import { icon, Marker } from 'leaflet';
import { CommentService } from '../_services/comment.service';
import { ShapeService } from '../_services/shape.service';
import { FabService } from '../fab/fab.service';

// import * as leafletBounce from 'leaflet.smooth_marker_bouncing';
// import 'leaflet.smooth_marker_bouncing'

// --- Leaflet marker bugfix --- //
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
// --- Leaflet marker bugfix --- //

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {

  public map: L.Map;
  districtLayer: L.GeoJSON;
  districts: any;

  showDistricts: boolean = false;
  subShowDistricts: any;

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
  }

  constructor(  private markerService: MarkerService,
                private commentService: CommentService,
                private shapeService: ShapeService,
                private fabService: FabService) {}

  ngOnInit() {}

  ngAfterViewInit(){
    this.initMap();

    this.map.on("click", (e: { latlng: { lng: number; lat: number; }; }) => {
      // map on click is enabled when addNewComment view is opened.
      if(this.markerService.enableMarkers){
        this.markerService.addMarker(this.map, e.latlng.lat, e.latlng.lng, this.markerService.enableMarkers)
        this.markerService.changeCurrentMarker(e)
        this.markerService.enableMarkers = false;
      }
    });

    this.commentService.newComment.subscribe(comment => {
      this.markerService.addMarker2(this.map, comment.location.lat, comment.location.lng, comment)
    });

    this.shapeService.getStateShapes().subscribe(states => {
      this.districts = states;
      this.initDistrictLayer();
    });

    this.subShowDistricts = this.fabService.toggleDistricts.subscribe(toggle => {
      if(toggle === true){
        this.map.addLayer(this.districtLayer);
        this.districtLayer.bringToBack();
      } else {
        if(this.map && this.districtLayer){
          this.map.removeLayer(this.districtLayer)
        }
      }
      this.showDistricts = toggle;
    })

    this.markerService.tempMarkerToDelete.subscribe(marker => {
      this.map.removeLayer(marker)
    })
  }

  initDistrictLayer() {
    this.districtLayer = L.geoJSON(this.districts, {
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

  ngOnDestroy(): void {
    this.map.off();
    this.map.remove();
    this.subShowDistricts.unsubscribe()
  }
}
