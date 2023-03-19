import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { commentsView } from 'src/app/comments/commentsView';
import { FabService } from 'src/app/fab/fab.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  username: string | null | undefined;

  constructor(
    private authService: AuthService,
    private fabService: FabService,
    private router: Router,
    public afAuth: AngularFireAuth
  ) {}

  items: MenuItem[];

  ngOnInit() {
    this.afAuth.authState.subscribe((user) => {
      this.username = user?.displayName;
      if (!!user) {
        this.items = [
          {
            label: user.displayName ? user.displayName : '',
            items: [
              {
                label: 'Dodaj komentarz',
                icon: 'pi pi-fw pi-plus',
                command: () => {
                  this.fabService.changeCommentsView(commentsView.Add);
                },
              },
              {
                label: 'Wyloguj',
                icon: 'pi pi-fw pi-power-off',
                command: () => {
                  this.authService.SignOut();
                  window.location.reload();
                },
              },
            ],
          },
        ];
      } else {
        this.items = [
          {
            label: 'Zaloguj',
            icon: 'pi pi-fw pi-user',
            command: () => {
              this.router.navigate(['/account/sign-in']);
            },
          },
        ];
      }
    });
  }
}
