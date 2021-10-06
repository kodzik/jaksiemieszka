import { Component, OnInit } from '@angular/core';
import { MarkerService } from "../_services/marker.service";
import * as L from 'leaflet';
import { CommentService } from '../_services/comment.service';
import { Comment } from '../_models/comment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  public map: any;
  testMessage: Comment;

  public initMap(): void {
    this.map = L.map('map', {
      center: [52.217779314315, 21.042614221109],
      zoom: 11
    });

    // this.map = L.map('map').setView([52.217779314315, 21.042614221109], 11);

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    // L.marker([52.261348417047, 21.025018929958]).addTo(this.map)
    // .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    // .openPopup();
  }

  constructor(
    private markerService: MarkerService,
    private commentService: CommentService) {
    }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.initMap();

    this.map.on("click", (e: { latlng: { lng: number; lat: number; }; }) => {
      // console.log(e.latlng); // get the coordinates
      // L.marker([e.latlng.lat, e.latlng.lng], this.markerIcon).addTo(this.map); // add the marker onclick

      this.commentService.addComment(e.latlng)
      this.markerService.addMarker(this.map, e.latlng.lat, e.latlng.lng, '')
    });

    this.commentService.highlightedComment.subscribe(comment => {
      this.testMessage = comment
      console.log(this.testMessage);
      this.markerService.addMarkerFromComment(this.map, this.testMessage)
    });
  }

  

}
