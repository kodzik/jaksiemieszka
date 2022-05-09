import { AfterViewInit, Component, OnDestroy, ElementRef } from '@angular/core';
import { MarkerService } from "../_services/marker.service";
import * as L from 'leaflet';
import { icon, Marker } from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { CommentService } from '../_services/comment.service';
import { ShapeService } from '../_services/shape.service';
import { FabService } from '../fab/fab.service';
import { environment } from 'src/environments/environment';
import { commentsView } from '../comments/commentsView';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

// --- Leaflet marker bugfix --- //
const iconRetinaUrl = `${environment.static}/assets/marker-icon-2x.png`;
const iconUrl = `${environment.static}/assets/marker-icon.png`;
const shadowUrl = `${environment.static}/assets/marker-shadow.png`;
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

const provider = new OpenStreetMapProvider();
const searchControl = GeoSearchControl({
  provider: provider,   
  style: 'button',
  // position: 'topright',
  searchLabel: 'Wpisz adres...',
  keepResult: true,
  marker: {
    icon: iconDefault,
    draggable: true,
  },
})

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnDestroy {

  public map: L.Map;

  _showDistricts: boolean = false;
  subShowDistricts: any;
  onAddMarker: L.Marker;

  public initMap(): void {
    this.map = L.map('map', {
      center: [52.217779314315, 21.042614221109],
      zoom: 11
    });

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
                private confirmationService: ConfirmationService,
                private fabService: FabService,
                private elementRef: ElementRef,
                private authService: AuthService,
                private router: Router,
                ) {}

  
  ngAfterViewInit(){
    this.initMap();
    
    this.map.on("click", (e: { latlng: { lng: number; lat: number; }; }) => {
      // map on click is enabled when addNewComment view is opened.
      if(this.markerService.enableMarkers){
        this.onAddMarker = this.markerService.addMarker(this.map, e.latlng.lat, e.latlng.lng, this.markerService.enableMarkers)
        this.markerService.changeCurrentMarker(e.latlng)
        this.markerService.enableMarkers = false;
      }
    });

    //map view center
    this.map.on('popupopen', (e) => {
      var px = this.map.project(e.target._popup._latlng); 
      px.y -= e.target._popup._container.clientHeight/2; 
      this.map.panTo(this.map.unproject(px),{animate: true});
    });

    //on geosearch make marker and popup
    this.map.on('geosearch/showlocation', (e: any) => {
      if(this.onAddMarker){
        this.map.removeLayer(this.onAddMarker)
      }
      // let label = e.location.label.split(', ')
      // console.log(label);
      // label = ( typeof Number(label[0]) === typeof Number) ? (label[1]+label[0]) : (label[0])
      // <h4 style="position: absolute; color: #EC5434; font-size: 15px; bottom: 35%">${label}</h4>
      const popupInfo = `
      <button pButton class="addComment btn">Dodaj komentarz!</button>
      `
      const popupOptions = {
        className: "leaflet-popup .leaflet-popup-content-wrapper"
      };
      e.marker.bindPopup(popupInfo, popupOptions)
      .on("popupopen", () => {
        this.elementRef.nativeElement
          .querySelector(".addComment")
          .addEventListener("click", (e:any) => {
            if(this.authService.isAuthenticated()){
              this.fabService.changeCommentsView(commentsView.Add)
            } else {
              this.confirm()
            }
          })
      }).openPopup();
      this.markerService.changeCurrentMarker(e.marker._latlng) 
    });

    this.map.on('geosearch/marker/dragend', (e: any) => { 
      this.markerService.changeCurrentMarker(e.location) 
    });

    //add markers to map from comments
    this.commentService.newComment.subscribe(comment => {
      this.markerService.addMarker2(this.map, comment.location.lat, comment.location.lng, comment)
    });

    //toggle show districts
    this.subShowDistricts = this.fabService.toggleDistricts.subscribe(toggle => {
      this.showDistricts(toggle)
    })

    //marker to be deleted on addNewComment
    this.markerService.tempMarkerToDelete.subscribe(marker => {
      this.map.removeLayer(marker)
    })

    //reset map - have to be used on flexbox
    setTimeout(() => {
      this.map.invalidateSize();
    }, 300);

    //geosearching 
    this.map.addControl(searchControl);
  }

  showDistricts(toggle: boolean){
    const districtLayer: L.GeoJSON = this.shapeService.districtLayer
    if(toggle === true){
      if(this.map && districtLayer){
        this.map.addLayer(districtLayer);
        districtLayer.bringToBack();
      }
    } else {
      if(this.map && districtLayer){
        this.map.removeLayer(districtLayer)
      }
    }
    this._showDistricts = toggle;
  }

  confirm() {
    this.confirmationService.confirm({
        message: 'Zaloguj się, aby dodać swój komentarz!',
        accept: () => {
          this.router.navigate(['/account/login']);
        }
    });
  }

  ngOnDestroy(): void {
    this.map.off();
    this.map.remove();
    this.subShowDistricts.unsubscribe()
  }
}
