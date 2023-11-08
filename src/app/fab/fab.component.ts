import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { commentsView } from '../comments/commentsView';
import { AuthService } from '../_services/auth.service';
import { FabService } from './fab.service';

@Component({
  selector: 'app-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.scss'],
})
export class FabComponent implements OnInit {
  tooltipItems: MenuItem[];
  toggleDistricts: boolean = true;

  constructor(
    private authService: AuthService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private fabService: FabService
  ) {}

  ngOnInit(): void {
    this.tooltipItems = [
      {
        tooltipOptions: {
          tooltipLabel: 'Dodaj komentarz',
        },
        icon: 'pi pi-pencil',
        command: () => {
          if (this.authService.isLoggedIn) {
            this.fabService.changeCommentsView(commentsView.Add);
          } else {
            this.confirm();
          }
        },
      },
      {
        tooltipOptions: {
          tooltipLabel: 'Pokaż dzielnice',
        },
        icon: 'pi pi-map',
        command: () => {
          this.fabService.toggleDistrictsLayer(this.toggleDistricts);
          this.toggleDistricts = !this.toggleDistricts;
        },
      },
    ];
  }

  confirm() {
    this.confirmationService.confirm({
      message: 'Zaloguj się, aby dodać swój komentarz!',
      accept: () => {
        this.router.navigate(['/account/sign-in']);
      },
    });
  }
}
