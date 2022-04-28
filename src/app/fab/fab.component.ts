import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { commentsView } from '../comments/commentsView';
import { AuthService } from '../_services/auth.service';
import { MarkerService } from '../_services/marker.service';

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

  constructor(private markerService: MarkerService,
    private authService: AuthService,
    private confirmationService: ConfirmationService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.tooltipItems = [
      {
          tooltipOptions: {
              tooltipLabel: "Dodaj"
          },
          icon: 'pi pi-pencil',
          command: () => {
            if(this.authService.isAuthenticated()){
              this.changeCommentsView.emit(commentsView.Add)
            } else {
              this.confirm()
            }
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
          }
      },
      {
        tooltipOptions: {
            tooltipLabel: "Del markers"
        },
        icon: 'pi pi-check',
        command: () => {
          this.markerService.deleteMarkers()
        }
    },
  ];
  }

  confirm() {
    this.confirmationService.confirm({
        message: 'Zaloguj się, aby dodać swój komentarz!',
        accept: () => {
          this.router.navigate(['/account/login']);
          // this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
        }
    });
}

}
