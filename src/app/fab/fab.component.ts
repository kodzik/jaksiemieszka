import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { commentsView } from '../comments/commentsView';

@Component({
  selector: 'app-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.scss']
})
export class FabComponent implements OnInit {

  @Output() changeViewEvent = new EventEmitter<commentsView>();

  tooltipItems: MenuItem[];

  constructor() { }

  ngOnInit(): void {
    this.tooltipItems = [
      {
          tooltipOptions: {
              tooltipLabel: "Dodaj"
          },
          icon: 'pi pi-pencil',
          command: () => {
            this.changeViewEvent.emit(commentsView.Add)
            // this.switchWindow()
              // this.messageService.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
          }
      },
    //   {
    //       tooltipOptions: {
    //           tooltipLabel: "Update"
    //       },
    //       icon: 'pi pi-refresh',
    //       command: () => {
    //           // this.messageService.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
    //       }
    //   },
  ];
  }

}
