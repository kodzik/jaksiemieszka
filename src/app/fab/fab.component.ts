import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { commentsView } from '../comments/commentsView';
import { AuthService } from '../_services/auth.service';
import { MarkerService } from '../_services/marker.service';
import { FabService } from './fab.service';

@Component({
  selector: 'app-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.scss']
})
export class FabComponent implements OnInit {

  tooltipItems: MenuItem[];
  toggleDistricts: boolean = true;

  constructor(private markerService: MarkerService,
    private authService: AuthService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private fabService: FabService
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
              this.fabService.changeCommentsView(commentsView.Add)
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
            this.fabService.toggleDistrictsLayer(this.toggleDistricts)
            this.toggleDistricts = !this.toggleDistricts
          }
      },
      // {
      //   tooltipOptions: {
      //       tooltipLabel: "Del markers"
      //   },
      //   icon: 'pi pi-check',
      //   command: () => {
      //     this.markerService.deleteAllMarkers()
      //   }
      // },
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
