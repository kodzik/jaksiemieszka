import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { CComment, CCommentAddress, IComment, ICommentAddress } from 'src/app/_models/comment';
import { CommentService } from 'src/app/_services/comment.service';
import { MarkerService } from 'src/app/_services/marker.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit, OnDestroy {

  commentForm: FormGroup;
  comment: IComment;

  currentMarker: any;
  markerData: any;

  // private newCommentSource = new Subject<IComment>();
  // newComment = this.newCommentSource.asObservable();

  constructor(
    private fb: FormBuilder,
    private cmtService: CommentService,
    private markerService: MarkerService,
    ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.createForm();
    this.markerService.enableMarkers = true;

    this.markerService.currentMarkerChange.subscribe(location => {
      if( location.latlng){
        this.currentMarker = location.latlng;
      } else{
        this.currentMarker = location._latlng
      }
      this.markerService.getAddressFromMarker(this.currentMarker)
    })

    this.markerService.markerData.subscribe(markerData =>{
      this.markerData = markerData;
    })

    // this.parseMarkerAddress(this.markerData)
  }

  createForm() {
    this.commentForm = this.fb.group({
      location: [''],

      locationScore: [''],
      noiseScore: [''],
      airScore: [''],
      trafficScore: [''],

      // cultureScore: [''],
      // eduScore: [''],
      // sportScore: [''],
      address: [''],
      text_content: [null],
    });
  }

  // get location(){ return this.commentForm.get('location')?.value}
  get location(){ return this.currentMarker}
  get locationScore(){ return this.commentForm.get('locationScore')?.value}
  get noiseScore(){ return this.commentForm.get('noiseScore')?.value}
  get airScore(){ return this.commentForm.get('airScore')?.value}
  get cultureScore(){ return this.commentForm.get('cultureScore')?.value}
  get eduScore(){ return this.commentForm.get('eduScore')?.value}
  get sportScore(){ return this.commentForm.get('sportScore')?.value}
  get trafficScore(){ return this.commentForm.get('trafficScore')?.value}
  // get address(){ return this.commentForm.get('address')?.value;}
  get text_content(){ return this.commentForm.get('text_content')?.value;}

  addLocation(){
    console.log("On input click");
    this.markerService.enableMarkers = true;
  }

  onSubmit(){
    let comment = new CComment;

    comment.location = {lat: Number(this.location.lat), lng: Number(this.location.lng)}
    comment.rating = {
      air: Number(this.airScore),
      location: Number(this.locationScore),
      noise: Number(this.noiseScore),
      traffic: Number(this.trafficScore),
      // culture: Number(this.cultureScore),
      // education: Number(this.eduScore),
      // sport: Number(this.sportScore),
      }
    comment.avg = this.cmtService.calculateAvgScore(comment)
    comment.address = this.parseMarkerAddress(this.markerData)
    comment.text_content = this.text_content
    this.cmtService.addnewComment(comment)
    // this.addnewComment(comment)
  }

  parseMarkerAddress(data: any): any {
    const address: CCommentAddress = { 
      road: (data.address?.road !== undefined) ? data.address.road : null,
      house_number: (data.address?.house_number !== undefined) ? data.address.house_number : null,
      suburb: (data.address?.suburb !== undefined) ? data.address.suburb : null,
      neighbourhood: (data.address?.neighbourhood !== undefined) ? data.address.neighbourhood : null,
      quarter: (data.address?.quarter !== undefined) ? data.address.quarter : null,
    };
    return address;
  }

  ngOnDestroy(): void {
    this.markerService.enableMarkers = false;
  }
}