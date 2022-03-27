import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-help',
  templateUrl: './form-help.component.html',
  styleUrls: ['./form-help.component.scss']
})
export class FormHelpComponent implements OnInit {

  autoResize: boolean = false;
  textComment: string;
  rating: number;

  //-----------------
  topic: string = "lokalizacja";
  //-----------------

  constructor() { }

  ngOnInit(): void {
  }

}
