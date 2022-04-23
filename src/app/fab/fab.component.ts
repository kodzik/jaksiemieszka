import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { commentsView } from '../comments/commentsView';

@Component({
  selector: 'app-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.scss']
})
export class FabComponent implements OnInit {

  @Output() changeCommentsView = new EventEmitter<commentsView>();
  @Output() toggleDistrictLayer = new EventEmitter<boolean>();

  tooltipItems: MenuItem[];
  toggleDistricts: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.tooltipItems = [
      {
          tooltipOptions: {
              tooltipLabel: "Dodaj"
          },
          icon: 'pi pi-pencil',
          command: () => {
            this.changeCommentsView.emit(commentsView.Add)
          }
      },
      {
          tooltipOptions: {
              tooltipLabel: "Pokaż dzielnice"
          },
          icon: 'pi pi-refresh',
          command: () => {
            this.toggleDistrictLayer.emit(!this.toggleDistricts)
            this.toggleDistricts = !this.toggleDistricts
            console.log(this.toggleDistricts);
          }
      },
  ];
  }

}
