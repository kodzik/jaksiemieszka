import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CommentService } from '../_services/comment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Input() headerTemplate: TemplateRef<any>; // Custom template provided by parent
  template: TemplateRef<any>;

  tooltipItems: MenuItem[];
  windowIndex: number = 0;

  constructor(private cmtService: CommentService) { }

  ngOnInit(): void {
    this.cmtService.newComment.subscribe(cmt => {
      this.windowIndex = 0
    })

    this.tooltipItems = [
      {
          tooltipOptions: {
              tooltipLabel: "Add"
          },
          icon: 'pi pi-pencil',
          command: () => {
            this.switchWindow()
              // this.messageService.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
          }
      },
      {
          tooltipOptions: {
              tooltipLabel: "Update"
          },
          icon: 'pi pi-refresh',
          command: () => {
              // this.messageService.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
          }
      },
      {
          tooltipOptions: {
              tooltipLabel: "Delete"
          },
          icon: 'pi pi-trash',
          command: () => {
              // this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
          }
      },
      {
          tooltipOptions: {
              tooltipLabel: "Upload"
          },
          icon: 'pi pi-upload',
      },
      {
          tooltipOptions: {
              tooltipLabel: "Angular Website"
          },
          icon: 'pi pi-external-link',
          url: 'http://angular.io'
      }
  ];

  }

  switchWindow(){
    this.windowIndex = (this.windowIndex + 1)%2;
  }

}
