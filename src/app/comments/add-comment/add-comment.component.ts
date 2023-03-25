import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { LatLng } from 'leaflet';
import { FabService } from 'src/app/fab/fab.service';
import { CComment, CCommentAddress, IComment } from 'src/app/_models/comment';
import { AuthService } from 'src/app/_services/auth.service';
import { CommentService } from 'src/app/_services/comment.service';
import { MarkerService } from 'src/app/_services/marker.service';
import { commentsView } from '../commentsView';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss'],
})
export class AddCommentComponent implements OnInit, OnDestroy {
  autoResize: boolean = true; //textArea

  commentForm: UntypedFormGroup;
  comment: IComment;

  currentMarker: any;
  markerData: any;

  submitted: boolean = false;

  constructor(
    private fb: UntypedFormBuilder,
    private cmtService: CommentService,
    private markerService: MarkerService,
    private fabService: FabService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    if (this.markerService.currentMarker) {
      this.currentMarker = this.markerService.currentMarker;
      this.markerService.getAddressFromMarker(this.currentMarker);
    }
    this.markerService.deleteAllMarkers();
    this.markerService.enableMarkers = true;

    this.markerService.currentMarkerChange.subscribe((location) => {
      this.currentMarker = location;
      this.markerService.getAddressFromMarker(location);
    });

    this.markerService.markerData.subscribe((markerData) => {
      this.markerData = markerData;
    });
  }

  createForm() {
    this.commentForm = this.fb.group({
      location: [''], //new FormControl(null, Validators.required),
      locationScore: new UntypedFormControl(null, Validators.required),
      noiseScore: new UntypedFormControl(null, Validators.required),
      airScore: new UntypedFormControl(null, Validators.required),
      trafficScore: new UntypedFormControl(null, Validators.required),
      address: [''],
      textContent: [null],
    });
  }

  get location() {
    return this.currentMarker;
  }
  get locationScore() {
    return this.commentForm.get('locationScore')?.value;
  }
  get noiseScore() {
    return this.commentForm.get('noiseScore')?.value;
  }
  get airScore() {
    return this.commentForm.get('airScore')?.value;
  }
  get trafficScore() {
    return this.commentForm.get('trafficScore')?.value;
  }
  get textContent() {
    return this.commentForm.get('textContent')?.value;
  }

  get ratingScoreStatus() {
    return (
      this.commentForm.controls.locationScore.status === 'VALID' &&
      this.commentForm.controls.noiseScore.status === 'VALID' &&
      this.commentForm.controls.airScore.status === 'VALID' &&
      this.commentForm.controls.trafficScore.status === 'VALID'
    );
  }

  get f() {
    return this.commentForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.commentForm.invalid || this.location === undefined) {
      return;
    }

    if (this.commentForm.status === 'VALID') {
      try {
        // let comment: IComment;

        const user = localStorage.getItem('username');
        if (user !== null) {
          this.comment.userName = user;
        } else return;

        // comment.location = {
        //   lat: Number(this.location.lat),
        //   lng: Number(this.location.lng),
        // };
        this.comment.location = new LatLng(
          this.location.lat,
          this.location.lng
        );
        this.comment.rating = {
          air: Number(this.airScore),
          location: Number(this.locationScore),
          noise: Number(this.noiseScore),
          traffic: Number(this.trafficScore),
        };
        // comment.avg = this.cmtService.calculateAvgScore(comment)
        this.comment.address = this.parseMarkerAddress(this.markerData);
        this.comment.textContent = this.textContent;

        this.cmtService.addNewComment(this.comment);
      } catch (error) {
        console.error(error);
      } finally {
        // this.close();
        // window.location.reload();
      }
    } else {
      console.log('Form invalid');
    }
  }

  parseMarkerAddress(data: any): any {
    const address: CCommentAddress = {
      road: data.address?.road !== undefined ? data.address.road : null,
      house_number:
        data.address?.house_number !== undefined
          ? data.address.house_number
          : null,
      suburb: data.address?.suburb !== undefined ? data.address.suburb : null,
      neighbourhood:
        data.address?.neighbourhood !== undefined
          ? data.address.neighbourhood
          : null,
      quarter:
        data.address?.quarter !== undefined ? data.address.quarter : null,
    };
    return address;
  }

  close() {
    this.fabService.changeCommentsView(commentsView.View);
  }

  ngOnDestroy(): void {
    this.markerService.enableMarkers = false;
    this.markerService.deleteMarker();
  }
}
