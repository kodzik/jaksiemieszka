import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-help',
  templateUrl: './form-help.component.html',
  styleUrls: ['./form-help.component.scss']
})
export class FormHelpComponent implements OnInit {

  @Input() item:any;

  autoResize: boolean = false;
  textComment: string;
  rating: number;

  //-----------------
  // topic: string;
  //-----------------
  
  public get topic() : string {
    return this.item.label
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
