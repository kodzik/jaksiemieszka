import { Component, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  template: TemplateRef<any>;

  constructor() { }

  ngOnInit(): void {
  }

  showRef(template: TemplateRef<any>) {
    this.template = template;
  }

  addComment(){
  }

}
